---
author:
- Your Name
authors:
- Your Name
categories:
- data-science
- visualization
date: 2023-07-15
excerpt: This is a sample Quarto blog post with code and visualizations.
image: image.jpg
tags:
- quarto
- r
- statistics
title: Sample Quarto Blog Post
toc-title: Table of contents
---

# Introduction to Quarto

Quarto is a multi-language, next-generation version of R Markdown from
RStudio, built on Pandoc.

## Code Example

Here's a simple code example in R:

:::: cell
``` {.r .cell-code}
library(ggplot2)

# Create some sample data
set.seed(123)
data <- data.frame(
  x = rnorm(100),
  y = rnorm(100)
)

# Create a scatter plot with regression line
ggplot(data, aes(x, y)) +
  geom_point(alpha = 0.7) +
  geom_smooth(method = "lm") +
  theme_minimal() +
  labs(title = "Sample Scatter Plot",
       x = "X Variable",
       y = "Y Variable")
```

::: cell-output-display
![A simple scatter plot with regression
line](sample-quarto-post_files/figure-markdown/simple-plot-1.png)
:::
::::

## Math Support

Quarto also supports LaTeX equations:

$$
f(x) = \int_{-\infty}^{\infty} \hat{f}(\xi) e^{2\pi i \xi x} d\xi
$$

## Interactive Features

Quarto enables interactive visualizations and applications with various
JavaScript libraries.

## Conclusion

Quarto provides a unified authoring framework for data science,
combining computation, visualization, and text.
