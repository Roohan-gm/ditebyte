export default {
  CALORIES_PROMPT: `Based on height, weight, age, gender, and goal give me calories and proteins needed daily for a person. please only provide calories and proteins no detail explanation no question no reasoning just simple values. In json format and follow the schema below:
    {
        "calories": <>,
        "protein": <>
    }`,
  GENERATE_RECIPE_OPTIONS_PROMPT: `Based on user instruction create 3 different recipe variants with Recipe Name with Emoji, 2 lines of description and main ingredient list. Absolutely no text only json format answer. Please provide the output in JSON format and follow the schema below:
    {
        "recipe1": {
            "name": "<Recipe Name>",
            "description": "<Description>",
            "ingredients": ["<Ingredient 1>", "<Ingredient 2>", ...]
        },
        "recipe2": {
            "name": "<Recipe Name>",
            "description": "<Description>",
            "ingredients": ["<Ingredient 1>", "<Ingredient 2>", ...]
        },
        "recipe3": {
            "name": "<Recipe Name>",
            "description": "<Description>",
            "ingredients": ["<Ingredient 1>", "<Ingredient 2>", ...]
        }
    }`,
  GENERATE_SELECTED_RECIPE: `
     - As per recipeName and description give me recipeName and description as field, Give me all list of ingredients as ingredient ,
     - emoji icons for each ingredient as icon, quantity as quantity, along with detail step by step recipe as steps
     - Total calories as calories (only number), Minutes to cook as cookTime and serving number as servingSize
     - realistic image Text prompt as per recipe as imagePrompt 
     - Give me category List for recipe from [Breakfast, Lunch, Dinner, Salad, Dessert, Fastfood, Drink, cake] as category
     - Give me response in JSON format only
     - Schema format should be:
{
  "description": "string",
  "recipeName": "string",
  "category": ["string"],
  "cookingTime": "number", 
  "imagePrompt": "string",
  "ingredients": [
    {
      "quantity": "number",
      "icon": "string",
      "ingredient": "string"
    }
  ],
  "calories": <Single Person Serve>,
  "protein": <Single Person Serve>,
  "fat": <Single Person Serve>,
  "carbs": <Single Person Serve>,
  "servingSize": "number",
  "steps": ["string"]
}`
  //   GENERATE_SELECTED_RECIPE: `Generate a detailed recipe following this JSON structure:
  // {
  //   "recipeName": "string",
  //   "description": "A short summary of the dish.",
  //   "calories": number,
  //   "category": ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"],
  //   "cookingTime": number, // Time in minutes
  //   "imagePrompt": "A realistic text description for an image generation model.",
  //   "ingredients": [
  //     {
  //       "quantity": number,
  //       "icon": "emoji",
  //       "ingredient": "string"
  //     }
  //   ],
  //   "servingSize": number,
  //   "steps": ["Step 1", "Step 2", "Step 3"],
  //   "protein": number,
  //   "fat": number,
  //   "carbs": number,
  //   "instructions": "Detailed cooking steps."
  // }
  // Output the recipe details strictly in JSON format with no additional text.`
}