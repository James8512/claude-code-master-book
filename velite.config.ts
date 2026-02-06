import rehypePrettyCode from "rehype-pretty-code";
import { defineCollection, defineConfig, s } from "velite";

const chapters = defineCollection({
  name: "Chapter",
  pattern: "chapters/**/index.mdx",
  schema: s.object({
    slug: s.slug("chapters"),
    title: s.string(),
    description: s.string(),
    part: s.number(),
    partTitle: s.string(),
    chapter: s.number(),
    order: s.number(),
    readingTime: s.string(),
    difficulty: s.enum(["beginner", "intermediate", "advanced"]),
    tags: s.array(s.string()),
    draft: s.boolean().default(false),
    metadata: s.metadata(),
    content: s.mdx(),
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { chapters },
  mdx: {
    rehypePlugins: [
      [
        rehypePrettyCode as any,
        {
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
          keepBackground: false,
        },
      ],
    ],
  },
});
