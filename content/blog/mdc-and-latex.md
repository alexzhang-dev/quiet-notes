---
title: 公式与 MDC
description: 行内 / 独立 LaTeX，以及 Markdown 里嵌 Vue 组件。
date: 2026-08-16
author: alexz
location: 上海
minutes: 3
series: 安静界面
---

这篇只用来看效果。公式走 `remark-math` + KaTeX；组件走 MDC 的 `::note`。

## 公式

欧拉公式把指数和三角连在一起：$e^{i\pi} + 1 = 0$。行内用一对美元符号。

独立公式单独成段：

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$

柯西–施瓦茨：

$$
\left( \sum_{k=1}^{n} a_k b_k \right)^{2} \le \left( \sum_{k=1}^{n} a_k^{2} \right)\left( \sum_{k=1}^{n} b_k^{2} \right)
$$

## MDC

块组件用 `::`。默认插槽里可以继续写 Markdown。

::note
这是 `::note`。插槽里的 **加粗** 和 `code` 都会按正文渲染。
::

props 写在花括号里：

::note{tone="warn"}
`{tone="warn"}` 只换一条发丝线的颜色，不另起一套盒子。
::

段落里也能挂属性：把 [这段]{.accent} 标成 accent。

写法本身长这样：

```mdc
::note{tone="warn"}
插槽里的 **Markdown**。
::

把 [这段]{.accent} 标成 accent。
$e^{i\pi} + 1 = 0$
```
