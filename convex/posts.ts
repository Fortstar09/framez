import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createPost = mutation({
  args: {
    text: v.string(),
    image: v.optional(v.string()),
    authorId: v.string(),
    authorAva: v.string(),
    authorName: v.string(),
  },
  handler: async (ctx, args) => {
    const { text, image, authorId, authorAva,  authorName } = args;

    return await ctx.db.insert("posts", {
      text,
      image,
      authorId,
      authorAva,
      authorName,
    });
  },
});


export const getPosts = query(async ({ db }) => {
  const posts = await db
    .query("posts")
    .order("desc") // newest first
    .collect();
  return posts;
});


export const getUserPosts = query({
  args: {
    authorId: v.string(),
  },
  handler: async (ctx, args) => {
    const { authorId } = args;

    const posts = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("authorId"), authorId))
      .order("desc")
      .collect();

    return posts;
  },
});

export const getPostById = query({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});