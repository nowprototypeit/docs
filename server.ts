import path from 'node:path'
import { createRequire } from 'node:module'
import express from 'express'
import type { Request, Response, NextFunction } from 'express';
import * as marked from 'marked'
import { URL } from 'node:url'
import {promises as fsp} from "node:fs";
import {type Breadcrumb, getPageModel, type PageHierarchy} from "./lib/page-model.ts";

const require = createRequire(import.meta.url)

const nunjucks = require('nunjucks')

const app = express()
const rootDir = process.cwd()

const designSystemRoot = path.join(rootDir, 'node_modules', '@nowprototypeit', 'design-system')
const designSystemNunjucks = path.join(designSystemRoot, 'nunjucks')

const errorMdDir = path.join(rootDir, 'views', 'errors')
const notFoundMdFile = path.join(errorMdDir, 'not-found.md')
const serverErrorMdFile = path.join(errorMdDir, 'server-error.md')

const canonicalUrl = process.env.CANONICAL_URL
const verboseLog = process.env.NPI_DOCS__VERBOSE_LOG === 'true' ? console.log : () => {}
const parsedCanonicalUrl = canonicalUrl ? new URL(canonicalUrl) : null

const pageModel = await getPageModel()

verboseLog('!!! VERBOSE LOGGING IS ENABLED !!!')

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

type PageViewTypes = '500'

let logPageView = (req: Request, type: PageViewTypes) => {
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

if (canonicalUrl && parsedCanonicalUrl) {
  app.use((req: Request, res: Response, next: NextFunction) => {
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
  if (url && url.endsWith('/index')) {
    res.redirect(301, [url.substring(0, url.length - '/index'.length), ...qs].join('?'))
  } else {
    next()
  }
})

function getRelationToCurrentPage (url: string, req: Request): {isRelatedToCurrentPage: boolean, isCurrentPage: boolean} {
  if (url === '/latest') {
    const exactMatch = req.originalUrl.split('?')[0] === '/latest';
    return {
      isRelatedToCurrentPage: exactMatch,
      isCurrentPage: exactMatch
    }
  }
  if (req.originalUrl === url) {
    return {
      isRelatedToCurrentPage: true,
      isCurrentPage: true
    }
  } else if (req.originalUrl.startsWith(url)) {
    return {
      isRelatedToCurrentPage: true,
      isCurrentPage: false
    }
  }
  return {
    isRelatedToCurrentPage: false,
    isCurrentPage: false
  }
}

type NavigationItem = {
  url: string;
  name: string;
  isRelatedToCurrentPage: boolean;
  isCurrentPage: boolean;
  children: NavigationItem[];
}

function recursivelyPrepareNavigation (actualUrl: string, pagesModel: PageHierarchy[]): NavigationItem[] {
  return pagesModel.map(page => {
    const url = page.url.replace('__VERSION__', 'latest')
    const {isRelatedToCurrentPage, isCurrentPage} = getRelationToCurrentPage(url, {originalUrl: actualUrl} as Request)
    return {
      name: page.name,
      url,
      isRelatedToCurrentPage,
      isCurrentPage,
      children: recursivelyPrepareNavigation(actualUrl, page.children)
    }
  })
}

function findClosestBreadcrumb (url: string): Breadcrumb[] {
  const urlParts = url.split('/').filter(part => part.length > 0)
  while (urlParts.length > 0) {
    const currentUrl = '/' + urlParts.join('/')
    const breadcrumbs = pageModel.breadcrumbsByUrl[currentUrl]
    if (breadcrumbs) {
      return breadcrumbs
    } else {
      urlParts.pop()
    }
  }
  return []
}

app.use(async (req, res) => {
  const reqUrl = req.originalUrl.split('?')[0];
  if (!reqUrl) {
    throw new Error('This is literally impossible!')
  }
  if (reqUrl === '/') {
    res.redirect(302, '/latest');
    return;
  }
  if (!reqUrl.startsWith('/latest/') && pageModel.pagesByUrl[`/latest${reqUrl}`]) {
    const latestUrl = `/latest${reqUrl}`;
    res.redirect(302, latestUrl);
    return;
  }
  const nav = recursivelyPrepareNavigation(reqUrl, pageModel.hierarchy)
  let mdFile = pageModel.pagesByUrl[reqUrl]?.file
  let statusCode = 200
  const breadcrumbs: Breadcrumb[] = findClosestBreadcrumb(reqUrl)

  if (!mdFile || breadcrumbs === undefined) {
    mdFile = notFoundMdFile
    statusCode = 404
  }
  let mdContents
  try {
    mdContents = await fsp.readFile(mdFile, 'utf-8')
  } catch (err) {
    console.error('Error reading markdown file:', mdFile, err)
    mdContents = await fsp.readFile(serverErrorMdFile, 'utf-8').catch(() => {
      console.error('Error reading server error markdown file:', serverErrorMdFile, err)
      return '# Server Error'
    })
  }
  res.status(statusCode).render('standard-page', {
    nowPrototypeItAssetsPath: '/assets',
    nowPrototypeItDesignSystemAssetsPath: '/assets/design-system',
    nowPrototypeItLogoLink: '/',
    contentFromMarkdown: marked.parse(mdContents),
    breadcrumbs,
    nav,
    headerSubNavItems: nav.map(item => (item.name !== 'Home' ? {
      name: item.name,
      url: item.url,
    } : undefined)).filter(Boolean),
  })
})

app.use(async (err: Error, req: Request, res: Response) => {
  res.status(500)
  logPageView(req, '500')
  console.error(err)
  try {
    res.render('standard-page', {
      nowPrototypeItAssetsPath: '/assets',
      nowPrototypeItDesignSystemAssetsPath: '/assets/design-system',
      nowPrototypeItLogoLink: '/',
      contentFromMarkdown: '<h1>Server error</h1><p>We are sorry, but something went wrong on our end.</p>',
      headerSubNavItems: []
    })
  } catch (e) {
    console.error('Couldn\'t show nice 500 page.', e)
    res.send('<h1>Server error</h1>')
  }
})

let listenPort:number = 0

if (process.env.PORT) {
  listenPort = Number(process.env.PORT)
} else if (process.env.NPI_DOCS_PORT) {
  listenPort = Number(process.env.NPI_DOCS_PORT)
}

const listener = app.listen(listenPort, () => {
  const address = listener.address()
  let port:string|number = 'unknown'
  if (typeof address === 'string') {
    port = address
  } else if (address && typeof address.port === 'number') {
    port = address.port
  }
  console.log('Docs app is listening on port ' + port)

  if (canonicalUrl) {
    console.log('The Docs app should now be running on ' + canonicalUrl)
  } else {
    console.log('To view the Docs app locally visit: http://localhost:' + port)
  }
})

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
