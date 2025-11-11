import { mutation } from "./_generated/server";
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
