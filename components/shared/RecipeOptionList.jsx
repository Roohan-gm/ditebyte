import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { UserContext } from './../../context/UserContext';
import LoadingDialog from './LoadingDialog';
import Prompt from '../../shared/Prompt';
import { GenerateAIRecipeModel } from '../../services/AiModel';
import { useMutation } from 'convex/react';
import { api } from './../../convex/_generated/api';
import { GenerateImage } from '../../services/AiModel';
import { useRouter } from 'expo-router';
export default function RecipeOptionList({ options }) {
  const [loading, setLoading] = useState(false);
  const CreateRecipe = useMutation(api.Recipes.CreateRecipe);
  const { user } = useContext(UserContext);
  const router = useRouter();

  const onRecipeOptionPress = async ({ option }) => {
    try {
      setLoading(true);
      const prompt = `RecipeName:${option?.name}, Description:${option?.description} ${Prompt.GENERATE_SELECTED_RECIPE}`;

      const result = await GenerateAIRecipeModel(prompt);

      // Add null check for result
      if (!result || result.trim() === "") {
        Alert.alert("Error", "Received an empty or invalid response from AI");
        setLoading(false);
        return;
      }

      // Safer JSON extraction with fallback
      let cleanedResult;
      try {
        cleanedResult = result.replace(/[^{]*({.*})[^}]*$/s, '$1').trim() || result;
      } catch (e) {
        console.warn("JSON extraction failed, using raw response");
      }
      const parsedJson = JSON.parse(cleanedResult);


      // Validate cleaned result
      if (!parsedJson) {
        console.error("Invalid response format from AI model");
        Alert.alert("Error", "Invalid response format from AI model");
        setLoading(false);
        return;
      }

      // Rest of your saving logic...
      const saveRecipeResult = await CreateRecipe({
        jsonData: parsedJson,
        recipeName: option?.name,
        uid: user?._id,
      });

      if (!saveRecipeResult) {
        Alert.alert("Database Error", "Recipe ID missing, save operation failed");
        setLoading(false);
        return;
      }

      console.log('Recipe saved to DB:', saveRecipeResult);

      router.push({
        pathname: '/recipe-detail',
        params: { recipeId: saveRecipeResult },
      });

    } catch (error) {
      console.error("Error generating recipe:", error);
      // Add error feedback to user
      Alert.alert("Error", error.message || "Failed to generate recipe");
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Recipe Options</Text>
      <View style={{ marginTop: 20 }}>
        {options && Array.isArray(options) && options.map((option, index) => (
          <TouchableOpacity
            onPress={() => onRecipeOptionPress({ option, index })}
            key={index}
            style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: 'lightgray', borderRadius: 8 }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{option?.name}</Text>
            <Text style={{ fontSize: 14, color: 'gray' }} numberOfLines={3}>{option?.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <LoadingDialog loading={loading} />
    </View>
  );
}