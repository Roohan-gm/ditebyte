import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateRecipe = mutation({
  args: {
    jsonData: v.any(),
    uid: v.id("users"),
    // imageUrl: v.optional(v.string()),
    recipeName: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("recipes", {
      jsonData: args.jsonData,
      uid: args.uid,
      // imageUrl: args.imageUrl,
      recipeName: args.recipeName,
    });
    return result;
  },
});

export const GetRecipeDetails = query({
  args: {
    id: v.string(), // Accept a string instead of v.id
  },
  handler: async (ctx, args) => {
    // Validate and normalize the ID
    const normalizedId = ctx.db.normalizeId("recipes", args.id);
    if (normalizedId === null) {
      return null; // Return null for invalid IDs
    }
    const result = await ctx.db.get(normalizedId);
    return result;
  },
});
