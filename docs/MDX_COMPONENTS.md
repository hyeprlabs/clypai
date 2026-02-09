# Blog MDX Components Guide

This guide explains how to use the enhanced MDX components available in blog posts.

## Standard Enhanced Components

All standard Markdown elements have been enhanced with better styling:

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
Inline code and code blocks have enhanced styling:

```md
Inline `code` looks great.

\`\`\`javascript
// Code blocks have syntax highlighting
const greeting = "Hello, world!";
\`\`\`
```

### Lists
Both ordered and unordered lists have custom markers and spacing:

```md
- List item 1
- List item 2

1. Numbered item 1
2. Numbered item 2
```

### Tables
Tables have bordered styling:

```md
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

## Custom Components

### Callout Boxes

Use callouts to highlight important information:

```mdx
<Callout type="info" title="Note">
This is an informational callout.
</Callout>

<Callout type="warning" title="Warning">
Be careful about this!
</Callout>

<Callout type="error" title="Important">
This is critical information.
</Callout>

<Callout type="success" title="Success">
Great job!
</Callout>

<Callout type="tip" title="Pro Tip">
Here's a helpful tip!
</Callout>
```

Shorthand versions:

```mdx
<Note>
Quick informational note.
</Note>

<Warning>
Warning message here.
</Warning>

<Important>
Important information.
</Important>

<Tip>
Helpful tip!
</Tip>
```

### Video Embeds

Embed YouTube or Vimeo videos:

```mdx
<VideoEmbed 
  src="https://www.youtube.com/watch?v=VIDEO_ID"
  title="Video Title"
  aspectRatio="16/9"
/>
```

Supported platforms:
- YouTube (youtube.com or youtu.be)
- Vimeo (vimeo.com)

Aspect ratios:
- `"16/9"` (default, widescreen)
- `"4/3"` (standard)
- `"1/1"` (square)

### Tweet Embeds

Embed tweets:

```mdx
<TweetEmbed tweetId="1234567890" />
```

## Typography Best Practices

### Headings
Use proper heading hierarchy:
- `#` for main sections (H1)
- `##` for subsections (H2)
- `###` for sub-subsections (H3)
- `####` for minor sections (H4)

### Links
External links automatically open in new tabs:

```md
[External Link](https://example.com)
[Internal Link](/blog/other-post)
```

### Emphasis
Use bold and italic for emphasis:

```md
**Bold text** for strong emphasis
*Italic text* for mild emphasis
```

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
  src: "/posts/your-image.png"
  alt: "Image description"
---

## Introduction

Start with a compelling introduction that hooks the reader.

<Note>
Important context or background information.
</Note>

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

### Visual Content

![Image description](/posts/image.png)

<VideoEmbed 
  src="https://youtube.com/watch?v=..."
  title="Tutorial Video"
/>

<Tip>
Pro tip: This is how you do it right!
</Tip>

## Conclusion

Wrap up your post with key takeaways.

**Ready to get started?** [Try ClypAI](https://clyp.ai)
```

## Component Props Reference

### Callout
- `type`: "info" | "warning" | "error" | "success" | "tip" (default: "info")
- `title`: string (optional)
- `children`: ReactNode

### VideoEmbed
- `src`: string (required, YouTube or Vimeo URL)
- `title`: string (optional, default: "Video")
- `aspectRatio`: "16/9" | "4/3" | "1/1" (optional, default: "16/9")
- `className`: string (optional)

### TweetEmbed
- `tweetId`: string (required)
- `className`: string (optional)

## Styling Notes

All components use Tailwind CSS classes and support dark mode automatically. The color scheme adapts based on the user's preference.

Custom components are located in:
- `/src/components/mdx/callout.tsx`
- `/src/components/mdx/video-embed.tsx`
- `/src/mdx-components.tsx` (main MDX component overrides)
