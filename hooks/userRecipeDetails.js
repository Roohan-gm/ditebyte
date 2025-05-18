import { useLocalSearchParams } from 'expo-router';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

export function useRecipeDetail() {
  const { recipeId } = useLocalSearchParams();
  const recipeDetails = useQuery(api.Recipes.GetRecipeDetails, recipeId ? { id: recipeId } : "skip");

  const isLoading = !recipeDetails;

  return {
    recipeId,
    recipeDetails,
    isLoading,
  };
}