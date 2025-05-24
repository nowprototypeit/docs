// This file is as I want to put my time into writing documentation and cleaning the structure up later.

import path from 'node:path'
import { promises as fsp } from 'node:fs'
import { createRequire } from 'node:module'
import express from 'express'
import * as marked from 'marked'
import { URL } from 'node:url'

const require = createRequire(import.meta.url)

const nunjucks = require('nunjucks')

const app = express()
const rootDir = process.cwd()

const designSystemRoot = path.join(rootDir, 'node_modules', '@nowprototypeit', 'design-system')
const designSystemNunjucks = path.join(designSystemRoot, 'nunjucks')

const urlBasedMdDir = path.join(rootDir, 'views', 'url-based')
const errorMdDir = path.join(rootDir, 'views', 'errors')
const notFoundMdFile = path.join(errorMdDir, 'not-found.md')
const serverErrorMdFile = path.join(errorMdDir, 'server-error.md')


const canonicalUrl = process.env.CANONICAL_URL
const verboseLog = process.env.NPI_DOCS__VERBOSE_LOG === 'true' ? console.log : () => {}
const parsedCanonicalUrl = canonicalUrl ? new URL(canonicalUrl) : null

const appViews = [
  path.join(rootDir, 'views'),
  designSystemNunjucks,
  path.join(designSystemNunjucks, 'now-prototype-it-design-system')
]

nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  watch: true,
  cache: false
})

app.set('view engine', 'njk')

async function getMarkdownContent (fileName) {
  try {
    verboseLog(`Trying to read markdown file: [${fileName}]`)
    const content = await fsp.readFile(fileName, 'utf8')
    verboseLog(`Successfully read markdown file: [${fileName}], [${content.length} bytes], [${typeof content}]`)
    verboseLog(content)
    const parsed = marked.parse(content)
    verboseLog(`Successfully parsed markdown file: [${fileName}], [${parsed.length} bytes], [${typeof parsed}]`)
    verboseLog(parsed)
    return parsed
  } catch (e) {
    if (e.code === 'ENOENT' || e.code === 'ENOTDIR') {
      verboseLog(`No markdown file: [${fileName}]`)
    } else {
      throw e
    }
  }
}

async function rewriteMarkup (markup) {
  return markup
    .replaceAll('<code>', '<code><pre>')
    .replaceAll('</code>', '</pre></code>')
}

async function getContentFromMarkdown (urlWithoutQueryString) {
  const url = urlWithoutQueryString.endsWith('/') ? urlWithoutQueryString.slice(0, -1) : urlWithoutQueryString
  const fileNamesToTry = [
    path.join(urlBasedMdDir, `${url}.md`),
    path.join(urlBasedMdDir, url, 'index.md')
  ]
  while (fileNamesToTry.length > 0) {
    const fileName = fileNamesToTry.shift()
    const result = await getMarkdownContent(fileName)
    if (result !== undefined) {
      return await rewriteMarkup(result)
    }
  }
  const path1 = path.join(urlBasedMdDir, url)
  try {
    const status = await fsp.stat(path1)
    if (status.isDirectory()) {
      const slicedUrl = urlWithoutQueryString.split('/').slice(1)
      const nav = await getNavModel([slicedUrl.join('/')], 'latest')
      const foundNav = findDirectChildrenInNav(nav, slicedUrl)
      return marked.parse(`
# ${convertUrlNameToTitle(url.split('/').pop())}

This page hasn't been written yet, but you can see the content in the sub-pages.

${foundNav ? foundNav.children.map(child => `- [${child.name}](${child.url})`).join('\n') : 'No sub-pages found.'}
`)
      }
  } catch (e) {
    if (e.code === 'ENOENT' || e.code === 'ENOTDIR') {
      verboseLog(`No markdown directory: [${path1}]`)
    } else {
      throw e
    }
  }
}

let logPageView = (req, type) => {
  console.log('[%s] [%s] [%s]', new Date().toISOString(), req.originalUrl, type)
}

if (process.env.LOG_PAGE_VIEWS !== 'true') {
  logPageView = () => {}
}


app.get('/healthcheck', (req, res) => {
  res.send('Healthy')
})

app.get([
  '/.well-known/appspecific/com.chrome.devtools.json'
], (req, res) => {
  res.json({
    name: 'Now Prototype It Docs',
  })
})

if (canonicalUrl) {
  app.use((req, res, next) => {
    if (!canonicalUrl) {
      next()
      return
    }
    const protocol = req.headers['x-forwarded-proto']
    if (req.get('host') !== parsedCanonicalUrl.host || (protocol && protocol !== parsedCanonicalUrl.protocol.replace(':', ''))) {
      res.redirect(301, parsedCanonicalUrl.protocol + '//' + parsedCanonicalUrl.host + req.originalUrl)
    } else {
      next()
    }
  })
}

app.use('/assets/style.css', express.static(path.join(rootDir, 'generated', 'style.css')))
app.use('/assets/design-system', express.static(path.join(designSystemRoot, 'assets')))

app.use((req, res, next) => {
  const [url, ...qs] = req.originalUrl.split('?')
  if (url.endsWith('/index')) {
    res.redirect(301, [url.substring(0, url.length - '/index'.length), ...qs].join('?'))
  } else {
    next()
  }
})

app.use(async (req, res, next) => {
  logPageView(req, 'request')
  try {
    const urlWithoutQueryString = req.originalUrl.split('?')[0]
    verboseLog(`Processing request for [${req.originalUrl}]`)
    const [urlEncodedVersion, ...urlWithoutQueryStringAndVersionPartsBeforeFilter] = urlWithoutQueryString.split('/').slice(1)
    const urlWithoutQueryStringAndVersionParts = urlWithoutQueryStringAndVersionPartsBeforeFilter.filter(part => part !== '')
    const version = decodeURIComponent(urlEncodedVersion)
    if (!version || !version.startsWith('version-') && !version.startsWith('latest')) {
      verboseLog('No version in URL, redirecting to latest version for ' + req.originalUrl)
      res.redirect('/latest' + req.originalUrl)
      return
    }
    const urlWithoutQueryStringAndVersion = '/' + urlWithoutQueryStringAndVersionParts.join('/')
    let contentFromMarkdown = await getContentFromMarkdown(urlWithoutQueryStringAndVersion)
    if (contentFromMarkdown === undefined) {
      res.status(404)
      contentFromMarkdown = await getMarkdownContent(notFoundMdFile)
      if (!contentFromMarkdown) {
        console.log('404 template couldn\'t be found', notFoundMdFile, contentFromMarkdown)
        contentFromMarkdown = '<h1>Not found</h1>'
        logPageView(req, '404')
      }
    }
    const nav = await getNavModel(urlWithoutQueryStringAndVersionParts, version)
    const breadcrumbs = await getBreadcrumbsModel(urlWithoutQueryStringAndVersionParts)
    res.render('standard-page', {
      nowPrototypeItAssetsPath: '/assets',
      nowPrototypeItDesignSystemAssetsPath: '/assets/design-system',
      nowPrototypeItLogoLink: '/',
      contentFromMarkdown,
      breadcrumbs,
      nav,
      headerSubNavItems: nav.map(item => (item.name !== 'Home' ? {
        name: item.name,
        url: item.url,
      } : undefined)).filter(Boolean),
    })
  } catch (e) {
    console.error('Error while processing request for ' + req.originalUrl, e)
    next(e)
  }
})

app.use(async (err, req, res, next) => {
  res.status(500)
  logPageView(req, '500')
  console.error(err)
  try {
    const contentFromMarkdown = await getMarkdownContent(serverErrorMdFile)
    res.render('standard-page', {
      nowPrototypeItAssetsPath: '/assets',
      nowPrototypeItDesignSystemAssetsPath: '/assets/design-system',
      nowPrototypeItLogoLink: '/',
      contentFromMarkdown,
      headerSubNavItems: []
    })
  } catch (e) {
    console.error('Couldn\'t show nice 500 page.')
    res.send('<h1>Server error</h1>')
  }
})

const listenArgs = []

if (process.env.PORT) {
  listenArgs.push(process.env.PORT)
} else if (process.env.NPI_DOCS_PORT) {
  listenArgs.push(process.env.NPI_DOCS_PORT)
}

const listener = app.listen.apply(app, listenArgs.concat([() => {
  console.log('Docs app is listening on port ' + listener.address().port)

  if (canonicalUrl) {
    console.log('The Docs app should now be running on ' + canonicalUrl)
  } else {
    console.log('To view the Docs app locally visit: http://localhost:' + listener.address().port)
  }
}]))

function getRelatedToCurrentPage (fullCurrentUrl, url) {
  return fullCurrentUrl.startsWith(url)
}

async function getNavModel(urlParts, version) {
  const dirContents = await recursiveDirContents(urlBasedMdDir)
  const root = [
    {
      name: 'Home',
      url: '/' + encodeURIComponent(version) + '/',
      isRelatedToCurrentPage: urlParts.length === 0,
      isCurrentPage: urlParts.length === 0,
    }
  ]

  function insert(parts, parent, fullPathSoFar) {
    const [current, ...rest] = parts
    const isFile = rest.length === 0
    if (current === 'index.md') {
      return
    }
    let node = parent.find(n => n.name === convertUrlNameToTitle(current))
    const fullCurrentUrl = ['', encodeURIComponent(version), ...(urlParts)].join('/')
    if (!node) {
      const name = convertUrlNameToTitle(current.replace(/\.md$/, ''))
      const url = '/' + encodeURIComponent(version) + '/' + [...fullPathSoFar, current.replace(/\.md$/, '')].join('/')
      node = {
        name,
        url,
        isRelatedToCurrentPage: getRelatedToCurrentPage(fullCurrentUrl, url),
        isCurrentPage: fullCurrentUrl === url,
      }
      if (!isFile) node.children = []
      parent.push(node)
    }
    if (!isFile) {
      insert(rest, node.children, [...fullPathSoFar, current])
    }
  }

  dirContents.forEach(filePath => {
    const parts = filePath.split('/')
    insert(parts, root, [])
  })

  function clean(node) {
    if (node.children) {
      node.children = node.children.map(clean).filter(Boolean)
      if (node.children.length === 0) delete node.children
    }
    return node
  }

  return root.map(clean)
}
async function getBreadcrumbsModel (urlParts) {
  return [{name: 'Home', url: '/'}].concat(urlParts.map((part, index) => {
    const url = '/' + urlParts.slice(0, index + 1).join('/')
    return {
      name: convertUrlNameToTitle(part),
      url
    }
  }))
}

function convertUrlNameToTitle (urlName) {
  return urlName
    .replace(/-/g, ' ')
    .split(' ')
    .map(capitaliseWord)
    .join(' ')
}

function capitaliseWord(word) {
  if (word === 'a') {
    return word
  }
  return word.charAt(0).toUpperCase() + word.slice(1)
}

async function recursiveDirContents (dir) {
  const entries = await fsp.readdir(dir, { withFileTypes: true })
  const results = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...(await recursiveDirContents(fullPath)).map(x => path.join(entry.name, x)))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(path.relative(dir, fullPath))
    }
  }
  return results
}

function findDirectChildrenInNav(nav, slicedUrl) {
  const currentPart = slicedUrl.shift()
  const found = nav.find(item => item.name === convertUrlNameToTitle(currentPart))
  if (found && slicedUrl.length > 0) {
    return findDirectChildrenInNav(found.children || [], slicedUrl)
  }
  return found
}
