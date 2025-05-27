import { useLocalSearchParams } from 'expo-router';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

export function useRecipeDetail() {
  const { recipeId } = useLocalSearchParams();
  const recipeDetails = useQuery(api.Recipes.GetRecipeDetails, recipeId ? { id: recipeId } : "skip");

  console.log("recipe ID: ", recipeId);
  console.log("recipe Details: ", recipeDetails);
  const isLoading = !recipeDetails;

  return {
    recipeId,
    recipeDetails,
    isLoading,
  };
}