import { View, Text, Platform, Keyboard } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native';
import Button from '../../components/shared/Button';
import { GenerateRecipeOptionsAi } from '../../services/AiModel';
import Prompt from '../../shared/Prompt';
import RecipeOptionList from '../../components/shared/RecipeOptionList';
import { AiSearchIcon } from '../../assets/images/icons/svgIcons';

export default function GenerateAiRecipe() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipeOptions, setRecipeOptions] = useState([]);

  const GenerateRecipeOptions = async () => {
    try {
      //   console.log("Function GenerateRecipeOptions started");

      Keyboard.dismiss();

      if (!input.trim()) {
        console.warn("Input is empty or contains only spaces");
        alert("Please enter your ingredients");
        return;
      }

      setLoading(true);
      //   console.log("Loading state set to true");

      const prompt = input + Prompt.GENERATE_RECIPE_OPTIONS_PROMPT;
      //   console.log("Generated prompt:", prompt);

      const result = await GenerateRecipeOptionsAi(prompt);
      //   console.log("AI model result:", result);

      if (!result) throw new Error("No result from AI model");

      // Clean the result to extract valid JSON
      let cleanResult = result.replace(/[^{]*({.*})[^}]*$/s, '$1').trim(); // Extract JSON part
      console.log("Cleaned result:", cleanResult);

      const ParsedData = JSON.parse(cleanResult);
      console.log("Parsed JSON data:", ParsedData);

      const optionsArray = Object.values(ParsedData);
      if (!Array.isArray(optionsArray)) {
        throw new Error("Parsed data is not an array");
      }

      //   console.log("Recipe options array:", optionsArray);
      setRecipeOptions(optionsArray);
    } catch (error) {
      console.error("Error generating recipe options:", error);
      alert("Error generating recipe options: " + error.message);
      setRecipeOptions([]);
    } finally {
      setLoading(false);
      console.log("Loading state set to false");
    }
  };

  return (
    <View style={{ paddingTop: Platform.OS === 'ios' ? 40 : 50, padding: 20 }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>AI Recipe Generator</Text>
      <Text style={{ fontSize: 16, color: 'gray', marginTop: 10 }}>
        Generate a recipe based on your preferences and ingredients.
      </Text>
      <TextInput
        placeholder='Enter your ingredients'
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 8,
          placeholderTextColor: 'gray',
          padding: 10,
          fontSize: 14,
          marginTop: 10,
          textAlignVertical: 'top',
          height: 100,
          backgroundColor: 'white',
        }}
        onChangeText={(value) => setInput(value)}
      />
      <View className="mt-3">
        <Button
          title={'Generate'}
          onPress={GenerateRecipeOptions}
          loading={loading}
          icon={<AiSearchIcon size={24} color="#fff" />}
        />
      </View>
      {!loading && Array.isArray(recipeOptions) && recipeOptions.length > 0 && (
        <RecipeOptionList options={recipeOptions} />
      )}
    </View>
  );
}