import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  slug: string;
  content: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

const FOLDER = path.join(process.cwd(), "src/posts");

export function getPost(slug: string): Post {
  const source = fs.readFileSync(path.join(FOLDER, `${slug}.mdx`), "utf8");
  const { data, content } = matter(source);

  return { ...data, slug, content } as Post;
}

export function getAllPosts(): Post[] {
  return fs.readdirSync(FOLDER).map((file) => getPost(file.replace(".mdx", "")));
}