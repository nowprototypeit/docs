import {promises as fsp} from "node:fs";
import path from "node:path";

const rootDir = process.cwd()
const urlBasedMdDir = path.join(rootDir, 'views', 'url-based')

export type PageHierarchy = {
  url: string;
  file: string;
  name: string;
  children: PageHierarchy[];
  parent?: PageHierarchy;
}

export type PageMap = {
  [url: string]: {
    file: string;
    url: string;
    name: string;
  };
}

export type Breadcrumb = {
  name: string;
  url: string;
};
type BreadcrumbMap = {
  [url: string]: Breadcrumb[];
}

export type FullPageModel = {
  pagesByUrl: PageMap;
  hierarchy: PageHierarchy[];
  breadcrumbsByUrl: BreadcrumbMap;
}

export async function getPageModel(): Promise<FullPageModel> {
  const hierarchy: PageHierarchy[] = [
    {
      url: '/latest',
      file: path.join(urlBasedMdDir, 'index.md'),
      name: 'Home',
      children: []
    },
    ...await getUrlBasedPagesFromFileSystem(urlBasedMdDir, '/latest')
  ]

  const pagesByUrl: PageMap = {};
  const breadcrumbsByUrl: BreadcrumbMap = {};

  function addPageToMap(page: PageHierarchy) {
    if (page.url in pagesByUrl) {
      console.warn(`Duplicate URL found: ${page.url} for file ${page.file}. Keeping the first one.`)
    } else {
      pagesByUrl[page.url] = {
        file: page.file,
        url: page.url,
        name: page.name
      }
    }
    for (const child of page.children) {
      addPageToMap(child);
    }
  }

  for (const page of hierarchy) {
    addPageToMap(page);
  }

  function addBreadcrumbsToMap(page: PageHierarchy): void {
    const breadcrumbs: Breadcrumb[] = [];
    const urlWithoutQs = page.url.split('?')[0];
    if (!urlWithoutQs) {
      throw new Error('This should never happen.');
    }
    const urlParts = urlWithoutQs.split('/').filter(part => part.length > 0);
    while (urlParts.length > 0) {
      const currentUrl = '/' + urlParts.join('/');
      const pageInfoByUrl = pagesByUrl[currentUrl];
      if (!pageInfoByUrl) {
        console.warn(`No page found for URL ${currentUrl}. Skipping breadcrumb creation.`);
        urlParts.pop();
        continue;
      }
      const breadcrumb: Breadcrumb = {
        name: pageInfoByUrl.name,
        url: pageInfoByUrl.url
      };
      breadcrumbs.unshift(breadcrumb);
      if (!(currentUrl in breadcrumbsByUrl)) {
        breadcrumbsByUrl[currentUrl] = breadcrumbs;
      }
      urlParts.pop();
    }
    page.children.forEach(addBreadcrumbsToMap)
  }
  for (const page of hierarchy) {
    addBreadcrumbsToMap(page);
  }

  return {
    hierarchy,
    pagesByUrl,
    breadcrumbsByUrl
  }
}

const validFileRegex = /^\d{3}-([\w-]+(-\w+)*)\.md$/;
const validDirRegex = /^\d{3}-([\w-]+(-\w+)*)$/;

function getCoreUrlNameFromFileName(file: string, isDir: boolean): string | null {
  const match = file.match(isDir ? validDirRegex : validFileRegex);
  if (match && match[1]) {
    return match[1]
  }
  return null;
}

async function getUrlBasedPagesFromFileSystem(dir: string, fullUrlSoFar: string): Promise<PageHierarchy[]> {
  const filesOrDirs = await fsp.readdir(dir, {withFileTypes: true})
  const pages: PageHierarchy[] = []

  for (const fileOrDir of filesOrDirs) {
    const isDir = fileOrDir.isDirectory();
    const children:PageHierarchy[] = []

    const urlName = getCoreUrlNameFromFileName(fileOrDir.name, isDir);
    const url = fullUrlSoFar + '/' + encodeURIComponent(urlName || fileOrDir.name);
    const fullPath = path.join(dir, fileOrDir.name)
    let mdFilePath = fullPath;

    if (isDir) {
      const indexMdPath = path.join(fullPath, 'index.md');
      if (!await fsp.stat(indexMdPath).then(() => true).catch(() => false)) {
        continue
      }
      mdFilePath = indexMdPath;
      const subPages = await getUrlBasedPagesFromFileSystem(fullPath, url);
      children.push(...subPages.sort((a, b) => a.file.localeCompare(b.file)));
    }
    if (!urlName) {
      continue;
    }
    const name = convertUrlNameToTitle(urlName)

    const current = {
      url,
      file: mdFilePath,
      name,
      children
    };

    pages.push(current)
  }

  return pages
}

function convertUrlNameToTitle (urlName: string) {
  return urlName
    .replace(/-/g, ' ')
    .split(' ')
    .map(capitaliseWord)
    .join(' ')
}

function capitaliseWord(word: string) {
  if (word === 'a') {
    return word
  }
  return word.charAt(0).toUpperCase() + word.slice(1)
}
