/* This is a script to create a new post markdown file with front-matter */

import fs from "fs"
import path from "path"

function getDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error(`错误：请提供文章文件名
用法：pnpm new-post <文件名> [文章标题]`)
  process.exit(1) // Terminate the script and return error code 1
}

let fileName = args[0]
const title = args.slice(1).join(" ") || args[0]

// Add .md extension if not present
const fileExtensionRegex = /\.(md|mdx)$/i
if (!fileExtensionRegex.test(fileName)) {
  fileName += ".md"
}

const targetDir = "./src/content/posts/"
const fullPath = path.join(targetDir, fileName)

if (fs.existsSync(fullPath)) {
  console.error(`错误：${fullPath} 已存在`)
  process.exit(1)
}

// recursive mode creates multi-level directories
const dirPath = path.dirname(fullPath)
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
}

const content = `---
title: ${JSON.stringify(title)}
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: true
lang: 'zh_CN'
---
`

fs.writeFileSync(path.join(targetDir, fileName), content)

console.log(`已创建草稿：${fullPath}`)
