import Link from "next/link";
import config from "@payload-config";
import { getPayload } from "payload";
import { FullWidthDivider } from "@/components/ui/full-width-divider";

type BlogPostSummary = {
  slug: string;
  title: string;
  description: string;
  createdAt?: string | null;
  publishedAt?: string | null;
};

const formatDate = (date?: string | null): string => {
  if (!date) return "";
  const t = Date.parse(date);
  if (Number.isNaN(t)) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(t);
};

async function getPosts(): Promise<BlogPostSummary[]> {
  try {
    const payload: any = await getPayload({ config });
    const result = await payload.find({
      collection: "posts",
      depth: 0,
      select: {
        slug: true,
        title: true,
        description: true,
        createdAt: true,
        publishedAt: true,
      },
      overrideAccess: false,
      pagination: false,
      sort: "-publishedAt",
      where: { _status: { equals: "published" } },
    });

    const docs = Array.isArray(result?.docs) ? result.docs : [];
    return docs.map((d: any) => ({
      slug: d.slug || d._id || "",
      title: d.title || "Untitled",
      description: d.description || "",
      createdAt: d.createdAt || null,
      publishedAt: d.publishedAt || null,
    }));
  } catch (err) {
    // Fail gracefully and return empty list if payload is unavailable
    // oxlint-disable-next-line no-console
    console.warn("Failed to load posts", err);
    return [];
  }
}

export async function BlogsSection() {
  const posts = await getPosts();

  return (
    <section className="mb-12 lg:mb-24 mx-auto w-full max-w-4xl border-t">
      <div className="space-y-2 px-4 py-8 md:py-12">
        <h2 className="font-semibold text-2xl tracking-wide md:text-4xl">
          All Posts
        </h2>
        <p className="text-muted-foreground text-sm">
          Discover the latest trends and insights in the world of design and
          technology.
        </p>
      </div>

      <div className="relative">
        <FullWidthDivider contained />
        {posts && posts.length > 0 ? (
          <div className="divide-y">
            {posts.map((post) => (
              <BlogCard
                key={post.slug || post.title}
                title={post.title}
                date={formatDate(post.publishedAt ?? post.createdAt)}
                description={post.description}
                href={`/blog/${post.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="px-4 py-10 text-muted-foreground text-sm">
            No posts have been published yet.
          </div>
        )}
        <FullWidthDivider contained />
      </div>
    </section>
  );
}

type BlogCardProps = {
  title: string;
  date?: string;
  description?: string;
  href: string;
};

function BlogCard({ title, date = "", description = "", href }: BlogCardProps) {
  return (
    <Link
      href={href}
      className="group flex w-full flex-col justify-center gap-y-1 p-4 hover:cursor-pointer hover:bg-accent/30 active:bg-accent dark:active:bg-accent/50"
    >
      <article className="relative flex items-end gap-2">
        <h3 className="whitespace-nowrap font-medium text-foreground text-lg smd:text-xl truncate">
          {title}
        </h3>
        <span className="mb-[6px] w-full border-b-2 border-dashed" />
        <time className="whitespace-nowrap font-mono text-muted-foreground text-xs uppercase group-hover:text-foreground md:text-sm">
          {date}
        </time>
      </article>

      <p className="max-w-sm line-clamp-2 break-words text-muted-foreground text-sm group-hover:text-foreground md:max-w-full md:text-base">
        {description}
      </p>
    </Link>
  );
}
