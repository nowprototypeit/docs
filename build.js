import path from 'node:path'
import { promises as fsp } from 'node:fs'

import * as sass from 'sass'

const sassPath = path.join(process.cwd(), 'assets', 'style.scss')
const cssPath = path.join(process.cwd(), 'generated', 'style.css')
const result = sass.compile(sassPath, { outputStyle: 'compressed' })
await fsp.mkdir(path.dirname(cssPath), { recursive: true })
await fsp.writeFile(cssPath, result.css)
