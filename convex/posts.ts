import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createPost = mutation({
  args: {
    text: v.string(),
    image: v.optional(v.string()),
    userId: v.string(),
    author: v.string(),
  },
  handler: async (ctx, args) => {
    const { text, image, userId, author } = args;

    return await ctx.db.insert("posts", {
      text,
      image,
      userId,
      author,
      createdAt: Date.now(),
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



// export const getPostsByAuthor = query(async ({ db }, { authorId }) => {
//   if (!authorId) return [];
//   return await db
//     .query("posts")
//     .withIndex("by_author", (q) => q.eq("authorId", authorId))
//     .order("desc")
//     .collect();
// });