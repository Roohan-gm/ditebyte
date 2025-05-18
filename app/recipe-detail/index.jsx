import { View } from 'react-native'
import RecipeIntro from '../../components/shared/RecipeIntro'
import RecipeIngredients from '../../components/shared/RecipeIngredients'
import RecipeNutrition from '../../components/shared/RecipeNutrition'
import RecipeInstructions from '../../components/shared/RecipeInstructions'

export default function RecipeDetail() {

    return (
        <View>
            {/* Recipe Intro*/}
            <RecipeIntro />
            {/* Recipe Ingredients */}
            {/* <RecipeIngredients recipeDetails={recipeDetails} /> */}

            {/* Recipe Nutrition */}
            {/* <RecipeNutrition recipeDetails={recipeDetails} /> */}

            {/* Recipe Instructions */}
            {/* <RecipeInstructions recipeDetails={recipeDetails} /> */}
        </View>
    )
}