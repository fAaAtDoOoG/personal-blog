# fAaAtDoOoG 的博客

基于 [Astro](https://astro.build/) 搭建的个人博客。

- 在线地址：<https://faaatdooog.github.io/personal-blog/>
- 文章目录：`src/content/posts/`
- 站点配置：`src/config.ts`

## 新建文章

在仓库根目录运行：

```powershell
pnpm new-post first-post "我的第一篇文章"
```

命令会创建 `src/content/posts/first-post.md`。新文章默认是草稿；写完后把文件头部的 `draft` 改为 `false` 才会公开发布。

也可以直接在 `src/content/posts/` 下新建 Markdown 文件：

```md
---
title: 我的第一篇文章
published: 2026-08-01
description: 文章的一句话摘要
image: ""
tags: [随笔, 技术]
category: 记录
draft: true
lang: zh_CN
---

这里开始写正文。
```

常用字段：

- `title`：文章标题
- `published`：发布日期，格式为 `YYYY-MM-DD`
- `updated`：可选，最后更新日期
- `description`：首页和搜索结果中的摘要
- `image`：可选，封面图路径，例如 `./cover.png`
- `tags`：标签数组
- `category`：文章分类
- `draft`：`true` 为草稿，`false` 为公开文章
- `lang`：文章语言，中文使用 `zh_CN`

如果文章带图片，可以使用目录形式：

```text
src/content/posts/my-post/
├── index.md
└── cover.png
```

然后在 `index.md` 中写 `image: ./cover.png`，正文图片也可写成 `![说明](./cover.png)`。

## 本地预览

```powershell
pnpm install
pnpm dev
```

浏览器访问终端显示的本地地址。发布前可运行：

```powershell
pnpm check
pnpm build
```

## 发布

提交并推送到 `main` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。部署状态可在仓库的 **Actions** 页面查看。

```powershell
git add src/content/posts
git commit -m "Add new post"
git push
```

## 许可证

项目代码沿用仓库中的 MIT License。
