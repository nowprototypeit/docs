import path from 'node:path'
import { promises as fsp } from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

import express from 'express'
const nunjucks = require('nunjucks')
import * as marked from 'marked'
import { URL } from 'node:url'

const app = express()
const rootDir = process.cwd()

const designSystemRoot = path.join(rootDir, 'node_modules', '@nowprototypeit', 'design-system')
const designSystemNunjucks = path.join(designSystemRoot, 'nunjucks')

const urlBasedMdDir = path.join(rootDir, 'views', 'url-based')
const errorMdDir = path.join(rootDir, 'views', 'errors')
const notFoundMdFile = path.join(errorMdDir, 'not-found.md')
const serverErrorMdFile = path.join(errorMdDir, 'server-error.md')


const canonicalUrl = process.env.CANONICAL_URL
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
    return marked.parse(await fsp.readFile(fileName, 'utf8'))
  } catch (e) {
    if (e.code !== 'ENOENT') {
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
    if (result) {
      return await rewriteMarkup(result)
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

if (canonicalUrl) {
  app.use((req, res, next) => {
    if (!canonicalUrl) {
      next()
      return
    }
    console.log({
      req: {
        host: req.get('host'),
        protocol: req.headers['x-forwarded-proto']
      },
      canon: {
        host: parsedCanonicalUrl.host,
        protocol: parsedCanonicalUrl.protocol.replace(':', '')
      }
    })
    const protocol = req.headers['x-forwarded-proto']
    if (req.get('host') !== parsedCanonicalUrl.host || (protocol && protocol !== parsedCanonicalUrl.protocol.replace(':', ''))) {
      console.log('redirecting from ' + req.get('host') + ' to ' + parsedCanonicalUrl.host + ' for ' + req.originalUrl)
      res.redirect(301, parsedCanonicalUrl.protocol + '//' + parsedCanonicalUrl.host + req.originalUrl)
    } else {
      next()
    }
  })
}

app.use('/assets/style.css', express.static(path.join(rootDir, 'generated', 'style.css')))
app.use('/assets/design-system', express.static(path.join(designSystemRoot, 'assets')))

app.use(async (req, res, next) => {
  logPageView(req, 'request')
  try {
    const urlWithoutQueryString = req.originalUrl.split('?')[0]
    const [version, ...urlWithoutQueryStringAndVersionParts] = urlWithoutQueryString.split('/').slice(1)
    if (!version || !version.startsWith('version-') && !version.startsWith('latest')) {
      res.redirect('/latest' + req.originalUrl)
      return
    }
    const urlWithoutQueryStringAndVersion = '/' + urlWithoutQueryStringAndVersionParts.join('/')
    let contentFromMarkdown = await getContentFromMarkdown(urlWithoutQueryStringAndVersion)
    if (!contentFromMarkdown) {
      res.status(404)
      contentFromMarkdown = await getMarkdownContent(notFoundMdFile)
      if (!contentFromMarkdown) {
        console.log('404 template couldn\'t be found', notFoundMdFile, contentFromMarkdown)
        contentFromMarkdown = '<h1>Not found</h1>'
        logPageView(req, '404')
      }
    }
    res.render('standard-page', {
      nowPrototypeItAssetsPath: '/assets',
      nowPrototypeItDesignSystemAssetsPath: '/assets/design-system',
      nowPrototypeItLogoLink: '/',
      contentFromMarkdown,
      headerSubNavItems: [].map(x => ({
        ...x,
        isCurrentPage: x.url === urlWithoutQueryStringAndVersion
      }))
    })
  } catch (e) {
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
