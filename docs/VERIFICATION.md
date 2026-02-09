# Blog Posts Verification

This document helps verify that blog posts are configured correctly.

## Quick Check

Run this command to list all blog posts:

```bash
node -e "
const fs = require('fs');
const path = require('path');
const blogDir = './content/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
console.log('📚 Blog posts found:', files.length);
files.forEach((f, i) => {
  const content = fs.readFileSync(path.join(blogDir, f), 'utf8');
  const titleMatch = content.match(/name: [\"'](.+?)[\"']/);
  const categoryMatch = content.match(/category: [\"'](.+?)[\"']/);
  console.log(\`\${i + 1}. \${f} - \${titleMatch ? titleMatch[1] : 'No title'} (\${categoryMatch ? categoryMatch[1] : 'no category'})\`);
});
"
```

## Expected Output

You should see 11 blog posts:

1. launch.mdx - The Pulse of Content: Introducing ClypAI (company)
2. ai-video-editing-revolution.mdx - The AI Video Editing Revolution... (product)
3. short-form-content-strategy.mdx - Building a Winning Short-Form... (community)
4. podcasters-guide-to-clips.mdx - The Podcaster's Guide to Clips (community)
5. mastering-subtitles.mdx - Mastering Subtitles... (product)
6. streamer-multiplatform-playbook.mdx - From Twitch to TikTok... (community)
7. psychology-viral-video.mdx - The Psychology of Viral Video (community)
8. content-repurposing-framework.mdx - Content Repurposing 101 (community)
9. social-media-algorithms.mdx - Algorithm Decoded... (community)
10. creator-burnout-sustainable-system.mdx - The Creator Burnout Epidemic (community)
11. video-seo-mastery.mdx - Video SEO Mastery (product)

## Verifying Frontmatter

Each blog post should have:

- ✅ `name`: Blog post title
- ✅ `description`: SEO description
- ✅ `slug`: URL-friendly slug
- ✅ `author`: Object with name and avatar
- ✅ `date`: Publication date
- ✅ `tags`: Array of tags
- ✅ `category`: One of "company", "product", or "community"
- ✅ `image`: Object with src and alt (used for fallback only)

## Verifying OG Image URLs

Test OG image generation for each post:

```bash
# Example for one post
curl http://localhost:3000/api/og?title=The%20Pulse%20of%20Content&category=company&date=2026-02-03 -I
```

Expected response headers should include:
```
Content-Type: image/png
```

## Common Issues

### Issue: Blog posts not showing up

**Check:**
1. Files are in `/content/blog/` directory
2. Files have `.mdx` extension
3. Frontmatter is valid YAML
4. All required fields are present

### Issue: OG images not generating

**Check:**
1. API route exists at `/src/app/api/og/route.tsx`
2. `@vercel/og` package is installed
3. Edge runtime is configured
4. URL parameters are properly encoded

### Issue: Categories not working

**Check:**
1. Category is one of: "company", "product", "community"
2. Schema in `source.config.ts` matches
3. Filter logic in `BlogPosts.tsx` is correct

## Testing Checklist

Before deploying:

- [ ] All blog posts have valid frontmatter
- [ ] OG image API works in dev mode
- [ ] Blog grid displays all posts
- [ ] Category filtering works
- [ ] Individual blog posts render correctly
- [ ] Code blocks have syntax highlighting
- [ ] Images display with captions
- [ ] Links open correctly
- [ ] Metadata includes OG images
