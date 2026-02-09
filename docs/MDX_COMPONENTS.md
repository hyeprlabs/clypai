# Blog MDX Guide

This guide explains how to write blog posts using MDX with enhanced formatting powered by remark and rehype plugins.

## Standard Markdown Features

All standard Markdown elements are supported with enhanced styling via remark-gfm and rehype plugins:

### Images
Images automatically get wrapped in a figure with a caption from the alt text:

```md
![This caption will appear below the image](/path/to/image.png)
```

### Blockquotes
Blockquotes are styled with a quote icon and better formatting:

```md
> "This is a beautifully styled quote"
```

### Code
Inline code and code blocks have syntax highlighting via rehype-pretty-code:

```md
Inline `code` looks great.

\`\`\`javascript
// Code blocks have automatic syntax highlighting
const greeting = "Hello, world!";
console.log(greeting);
\`\`\`
```

Code highlighting features:
- Automatic syntax detection
- Line numbers (optional)
- Line highlighting (optional)
- Dark theme (github-dark)

### Lists
Both ordered and unordered lists are styled via remark-gfm:

```md
- List item 1
- List item 2
  - Nested item

1. Numbered item 1
2. Numbered item 2

- [ ] Task list item (unchecked)
- [x] Task list item (checked)
```

### Tables
Tables are fully supported via remark-gfm:

```md
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Autolinks
Headings automatically get anchor links via rehype-slug and rehype-autolink-headings.

### Links
External links automatically open in new tabs with proper security attributes:

```md
[External Link](https://example.com)
[Internal Link](/blog/other-post)
```

### Emphasis
Use bold and italic for emphasis:

```md
**Bold text** for strong emphasis
*Italic text* for mild emphasis
~~Strikethrough~~ for removed text
```

## OG Images

Blog posts automatically get beautiful OG (Open Graph) images generated for social sharing. These images feature:
- Dark gradient background
- Blog post title
- Category badge
- Publication date
- ClypAI branding

The OG images are generated on-the-fly using Vercel's @vercel/og package and don't require manual image creation.

## Typography Best Practices

### Headings
Use proper heading hierarchy:
- `#` for main sections (H1)
- `##` for subsections (H2)
- `###` for sub-subsections (H3)
- `####` for minor sections (H4)

All headings automatically get:
- Scroll margin for better navigation
- Auto-generated anchor links
- Serif font styling
- Proper spacing

## Example Blog Post Structure

```mdx
---
name: "Your Blog Post Title"
description: "A compelling description for SEO"
slug: "your-post-slug"
author:
  name: "Author Name"
  avatar:
    src: "/path/to/avatar.png"
    alt: "Author Name"
date: 2026-02-09
tags: ["Tag1", "Tag2", "Tag3"]
category: "company" # or "product" or "community"
image:
  src: "/posts/placeholder.png" # Not used - OG images generated automatically
  alt: "Image description"
---

## Introduction

Start with a compelling introduction that hooks the reader.

## Main Section

Your main content with **bold** and *italic* text.

### Subsection

More detailed information.

> "A relevant quote that supports your point"

### Code Example

\`\`\`javascript
const example = "code";
console.log(example);
\`\`\`

### Task List

- [x] Completed task
- [ ] Pending task

### Table

| Feature | Description |
|---------|-------------|
| Fast | Lightning quick |
| Easy | Simple to use |

## Conclusion

Wrap up your post with key takeaways.

**Ready to get started?** [Try ClypAI](https://clyp.ai)
```

## Configuration

The MDX configuration is in `source.config.ts` and includes:

- **remark-gfm**: GitHub Flavored Markdown support (tables, task lists, strikethrough)
- **rehype-slug**: Auto-generate heading IDs
- **rehype-autolink-headings**: Auto-link headings
- **rehype-pretty-code**: Syntax highlighting with Shiki

Minimal custom components are defined in:
- `/src/mdx-components.tsx` (images, blockquotes, links, hr)
