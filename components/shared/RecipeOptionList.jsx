import { View, Text, TouchableOpacity } from 'react-native';
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
      const prompt = "RecipeName:" + option?.name + ", Description:" + option?.description + Prompt.GENERATE_SELECTED_RECIPE;
      // console.log("Prompt: ", prompt);
      const result = await GenerateAIRecipeModel(prompt);
      console.log("Raw API Response:", result); // Check the raw response

      // Clean the response to extract valid JSON
      let cleanedResult = result
        .replace(/```json/g, '')  // Remove JSON code block markers
        .replace(/```/g, '')     // Remove extra code block markers
        .trim();

      const jsonMatch = cleanedResult.match(/\{.*\}/s);
      const pureJson = jsonMatch ? jsonMatch[0] : '';
      const parsedData = JSON.parse(pureJson);
      console.log('Parsed Data: ', parsedData);

      // Generate Recipe image
      // const aiImageResp = await GenerateImage(parsedData?.imagePrompt);
      // console.log('AI Image Response:', aiImageResp);

      console.log("User Data: ", user);
      // save to DB
      const saveRecipeResult = await CreateRecipe({
        jsonData: parsedData,
        // imageUrl: aiImageResp,
        recipeName: option?.name,
        uid: user?._id,
      })
      console.log('Recipe saved to DB:', saveRecipeResult);

      //Redirect to recipe details page

      setLoading(false);
      router.push({
        pathname: '/recipe-detail',
        params: { recipeId: saveRecipeResult },
      });
    } catch (error) {
      console.error("Error generating recipe options:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

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