import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { basehub } from "basehub";

const BLOG_QUERY = {
  blog: {
    __args: { first: 5, orderBy: "_sys_createdAt__DESC" as const },
    items: {
      slug: true,
      _title: true,
      _sys: { createdAt: true },
      description: true,
    },
  },
};

function formatDate(date?: string | null) {
  if (!date) return "";

  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime())
    ? ""
    : new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(parsed);
}

async function getPosts() {
  const { blog } = await basehub().query(BLOG_QUERY);

  return blog?.items ?? [];
}

export async function BlogsSection() {
  const posts = await getPosts();

  return (
    <div className="mb-12 lg:mb-24 mx-auto flex w-full max-w-4xl flex-col justify-start border-t">
      <div className="space-y-2 px-4 py-8 md:py-12">
        <h1 className="font-semibold text-2xl tracking-wide md:text-4xl">
          Latest Blogs
        </h1>
        <p className="text-muted-foreground text-sm">
          Discover the latest trends and insights in the world of design and
          technology.
        </p>
      </div>

      <div className="relative">
        <FullWidthDivider contained />
        <div className="divide-y">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              title={post._title}
              date={formatDate(post._sys?.createdAt)}
              description={post.description ?? ""}
              href={`/new/blog/${post.slug}`}
            />
          ))}
        </div>
        <FullWidthDivider contained />
      </div>
    </div>
  );
}

function BlogCard({
  title,
  date,
  description,
  href,
}: {
  title: string;
  date: string;
  description: string;
  href: string;
}) {
  return (
    <a
      className="group flex min-h-24 w-full flex-col justify-center gap-y-1 p-4 hover:cursor-pointer hover:bg-accent/30 active:bg-accent dark:active:bg-accent/50"
      href={href}
    >
      <div className="relative flex items-end justify-center gap-2">
        <h3 className="whitespace-nowrap font-medium text-foreground text-lg smd:text-xl truncate">
          {title}
        </h3>
        <span className="mb-[6px] w-full border-b-2 border-dashed" />
        <span className="whitespace-nowrap font-mono text-muted-foreground text-xs uppercase group-hover:text-foreground md:text-sm">
          {date}
        </span>
      </div>
      <div className="max-w-sm line-clamp-2 break-words text-muted-foreground text-sm group-hover:text-foreground md:max-w-full md:text-base">
        {description}
      </div>
    </a>
  );
}
