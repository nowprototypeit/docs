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
app.use('/assets/script.js', express.static(path.join(rootDir, 'assets', 'script.js')))
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
  const nav = [
    {
      name: 'Home',
      url: '/',
      isRelatedToCurrentPage: true,
      isCurrentPage: false,
    },
    {
      name: 'Docs',
      url: '/docs',
      isRelatedToCurrentPage: true,
      isCurrentPage: false,
    }
  ]
  res.render('standard-page', {
    nowPrototypeItAssetsPath: '/assets',
    nowPrototypeItDesignSystemAssetsPath: '/assets/design-system',
    nowPrototypeItLogoLink: '/',
    contentFromMarkdown: '<h1>Hello, this is temporary</h1><p>We are working on the docs.</p>',
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Docs', url: '/docs' }],
    nav,
    headerSubNavItems: nav.map(item => (item.name !== 'Home' ? {
      name: item.name,
      url: item.url,
    } : undefined)).filter(Boolean),
  })
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

/* URLs that are linked to from the prototype kit:

 - https://docs.nowprototype.it/0.7.0/routers/create-routes
 - https://docs.nowprototype.it/0.12.0/nunjucks/filters
 - https://docs.nowprototype.it/0.12.0/in-browser-javascript
 - https://docs.nowprototype.it/0.12.0/sass
 - https://docs.nowprototype.it/0.12.0/nunjucks/how-to-use-layouts
 - https://docs.nowprototype.it/__VERSION__/nunjucks/how-to-use-layouts
 - https://docs.nowprototype.it/adaptors/govuk-frontend-adaptor/{{version}}
 - https://docs.nowprototype.it/__VERSION__
 - https://docs.nowprototype.it/plugins (Check our website for information about plugins)
 - https://docs.nowprototype.it/build-a-plugin (Learn about building your own plugin)

 */
