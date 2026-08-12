---
title: 关于这份模板
description: 如何用 quiet notes 写下一篇短文。
date: 2026-08-13
author: alexz
location: 上海
minutes: 2
series: 安静界面
cover: false
---

这是 Nuxt Content + SSG 版的 quiet notes。结构刻意很少：一篇文章、一条发丝线、必要时一张封面。

在 `content/blog/` 新建 `.md`，填上 frontmatter，便可出现在索引里。

主题色与透明度阶梯用一套克制的 light / dark tokens——读起来安静，把注意力留给文字。

代码高亮会跟随 `data-theme` 在 github-light / github-dark 之间切换：

```ts
export default defineNuxtConfig({
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: "github-light",
            dark: "github-dark",
          },
        },
      },
    },
  },
})
```
