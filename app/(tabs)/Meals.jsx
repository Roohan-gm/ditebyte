import { View, Text, Platform, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import GenerateRecipeCard from '../../components/shared/GenerateRecipeCard'
import { useQuery } from 'convex/react';
import { api } from './../../convex/_generated/api';
import RecipeCard from '../../components/shared/RecipeCard';

export default function Meals() {
  // Fetch all recipes using Convex query
  const recipeList = useQuery(api.Recipes.GetAllRecipes)
  console.log("Recipe List: ", recipeList)

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (recipeList !== undefined) {
      setLoading(false);
    }
  }, [recipeList]);

  if (loading) {
    return (
      <View style={{
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 40 : 30,
        flex: 1,
      }}>
        <Text style={{
          fontSize: 25,
          fontWeight: 'bold'
        }}>Discover Recipes 🥙</Text>

        <GenerateRecipeCard />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#28efa8" />
        </View>
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>Failed to load recipes. Please try again.</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <View style={{
          padding: 20,
          paddingTop: Platform.OS === 'ios' ? 40 : 30
        }}>
          <Text style={{
            fontSize: 25,
            fontWeight: 'bold'
          }}>Discover Recipes 🥙</Text>

          <GenerateRecipeCard />

          <View style={{
            marginTop: 15,
            marginBottom: 70,
          }}>
            <FlatList
              data={recipeList}
              renderItem={({ item }) => (
                <RecipeCard recipe={item} />
              )}
              keyExtractor={(item) => item._id.toString()}
              contentContainerStyle={{
                marginTop: 10,
              }}
            />
          </View>
        </View>
      } />
  )
}