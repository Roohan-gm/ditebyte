import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateNewUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if the user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (existingUser.length > 0) {
      return existingUser[0]; // Return existing user
    }

    // Define new user data
    const newUser = {
      name: args.name,
      email: args.email,
      credits: 10,
    };

    try {
      // Insert new user into the database
      const result = await ctx.db.insert("users", newUser);
      return result; // Return the newly created user record
    } catch (error) {
      console.error("Error inserting user:", error);
      throw new Error("Failed to create new user.");
    }
  },
});

export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // console.log("🔍 Querying user with email:", args.email);

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    // console.log("✅ Query result:", user);
    return user ? user : null;
  },
});

export const UpdateUserPref = mutation({
  args: {
    uid: v.id("users"),
    weight: v.number(),
    height: v.number(),
    age: v.number(),
    gender: v.string(),
    goal: v.string(),
    calories: v.number(),
    protein: v.number(),
  },
  handler: async (ctx, args) => {
    try {
      // Check if the user exists
      const user = await ctx.db.get(args.uid);
      if (!user) {
        throw new Error("User not found");
      }

      // Update user preferences
      const result = await ctx.db.patch(args.uid, {
        weight: args.weight,
        height: args.height,
        age: args.age,
        gender: args.gender,
        goal: args.goal,
        calories: args.calories,
        protein: args.protein,
      });

      return {
        success: true,
        message: "User preferences updated",
        data: result,
      };
    } catch (error) {
      console.error("Error updating user preferences:", error);
      throw new Error("Failed to update user preferences");
    }
  },
});

export const UpdateUserProfile = mutation({
  args: {
    uid: v.id("users"),
    picture: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.uid, {
      picture: args.picture,
    });
  },
});

