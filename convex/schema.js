import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.optional(v.string()),
    subscriptionId: v.optional(v.string()),
    credits: v.number(),
    height: v.optional(v.number()),
    weight: v.optional(v.number()),
    age: v.optional(v.number()),
    gender: v.optional(v.string()),
    goal: v.optional(v.string()),
    calories: v.optional(v.number()),
    protein: v.optional(v.number()),
  }).index("by_email", ["email"], { unique: true }),
  
  recipes: defineTable({
    jsonData: v.any(),
    uid: v.id('users'),
    // imageUrl: v.optional(v.string()),
    recipeName: v.string(),
  }),

  mealPlan:defineTable({
    recipeId:v.id('recipes'),
    uid:v.id('users'),
    date:v.string(),
    mealType:v.string(),
    status:v.optional(v.boolean()),
    calories:v.optional(v.number())
  })
});
