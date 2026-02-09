# Build and Deployment Guide

## Overview

This project has been updated to use industry-standard MDX plugins and dynamic OG image generation instead of custom components and static images.

## Changes Made

### 1. MDX Configuration (Using Remark/Rehype Plugins)

**Replaced custom MDX components with standard plugins:**

- **remark-gfm**: GitHub Flavored Markdown (tables, task lists, strikethrough)
- **rehype-slug**: Auto-generate heading anchor IDs
- **rehype-autolink-headings**: Auto-link headings for easy navigation
- **rehype-pretty-code**: Syntax highlighting with Shiki (github-dark theme)

**Configuration:** `source.config.ts`

### 2. OG Image Generation

**Implemented Vercel OG Image API:**

- **Endpoint**: `/api/og`
- **Features**:
  - Dynamic image generation on-the-fly
  - Dark gradient background (slate-900 to slate-700)
  - Displays blog title, category, and date
  - ClypAI branding
  - Perfect for social sharing (1200x630px)

**Usage:**
```
/api/og?title=Blog+Title&category=Product&date=2026-02-09
```

### 3. Blog Post Metadata

**Updated metadata generation:**

- Auto-generates OG images for each blog post
- Includes OpenGraph metadata
- Includes Twitter Card metadata
- Properly formatted for SEO

### 4. Blog Grid

**Updated to use dynamic OG images:**

- No longer relies on static placeholder images
- All blog cards show generated OG images
- Hover effect added (scale on hover)

### 5. Simplified Components

**Removed custom MDX components:**

- Deleted `/src/components/mdx/` directory
- Simplified `src/mdx-components.tsx` to minimal overrides
- Only keeps: images (with captions), blockquotes, links, hr

### 6. Removed Large Files

- Removed ~200MB of placeholder PNG files
- Added to `.gitignore` to prevent future additions

## Building the Project

### Development

```bash
npm run dev
```

This starts the development server at http://localhost:3000

### Production Build

```bash
npm run build
```

**Note:** If building locally fails due to Google Fonts network access, this is expected in restricted environments. On Vercel, this will work fine as Vercel has full internet access.

## Deployment on Vercel

### Prerequisites

1. Push changes to GitHub
2. Connect repository to Vercel (if not already)

### Deployment Steps

1. **Push to main branch** or create a **pull request**
2. Vercel will automatically build and deploy
3. Build should succeed on Vercel (Google Fonts accessible)

### Environment Variables

No additional environment variables needed for OG image generation.

### Verifying OG Images

After deployment:

1. Visit a blog post URL: `https://your-domain.com/blog/post-slug`
2. Test OG image URL: `https://your-domain.com/api/og?title=Test&category=Product&date=2026-02-09`
3. Use social media preview tools:
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

### Expected Build Output

```
✓ Generating static pages
✓ Collecting page data
✓ Finalizing page optimization

Route (app)                                Size     First Load JS
┌ ○ /                                     ...
├ ○ /blog                                 ...
├ ● /blog/[slug]                          ...
│   ├ /blog/post-1
│   ├ /blog/post-2
│   └ ...
├ λ /api/og                               ...
```

The `λ` symbol indicates the OG API route is using Edge Runtime (required for @vercel/og).

## Testing Locally

### Test OG Image Generation

Since the build may fail locally due to Google Fonts, you can test OG images in development mode:

1. Start dev server: `npm run dev`
2. Visit: `http://localhost:3000/api/og?title=Test+Blog+Post&category=Product&date=2026-02-09`
3. You should see a generated OG image

### Test Blog Posts

1. Visit: `http://localhost:3000/blog`
2. All blog cards should show OG images
3. Click on a post to view full content
4. Check that code blocks have syntax highlighting
5. Check that markdown renders correctly

## Troubleshooting

### Build Fails with Google Fonts Error

**If on Vercel:** This should not happen. Vercel has full internet access.

**If locally:** This is expected in restricted environments. Use dev mode instead.

**Solution:** Deploy to Vercel where fonts will load correctly.

### OG Images Not Showing

1. Check that the API route exists: `/src/app/api/og/route.tsx`
2. Verify Edge Runtime is configured: `export const runtime = 'edge';`
3. Check browser console for errors
4. Verify URL encoding is correct

### Code Highlighting Not Working

1. Verify `rehype-pretty-code` is installed
2. Check `source.config.ts` has correct configuration
3. Ensure CSS is added to `globals.css`
4. Clear `.next` cache and rebuild

## Performance

### OG Images

- Generated on-demand
- Cached by Vercel Edge Network
- ~10-50ms generation time
- No storage needed

### MDX Processing

- All blog posts are statically generated at build time
- Fast page loads
- No client-side MDX processing

## Security

- OG image generation is on Edge Runtime (isolated)
- No user input is executed as code
- All parameters are URL-encoded and safe
- External links have `noopener noreferrer`

## Next Steps

1. Deploy to Vercel
2. Verify OG images work correctly
3. Test social media sharing
4. Monitor build times and performance
5. Consider adding more blog posts!
