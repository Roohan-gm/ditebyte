import { View, Platform, FlatList, ActivityIndicator } from 'react-native';
import RecipeIntro from '../../components/shared/RecipeIntro';
import RecipeIngredients from '../../components/shared/RecipeIngredients';
import { useRecipeDetail } from '../../hooks/userRecipeDetails';
import RecipeSteps from '../../components/shared/RecipeSteps';
import Button from '../../components/shared/Button';
import ActionSheet from 'react-native-actions-sheet';
import { useRef } from 'react';
import AddToMealActionSheet from '../../components/shared/AddToMealActionSheet';

export default function RecipeDetail() {
    const { recipeDetails = {}, isLoading } = useRecipeDetail();
    const actionSheetRef = useRef(null);

    const handleAddToMealPress = () => {
        actionSheetRef.current?.show();
    };

    const hideActionSheetPress = () => {
        actionSheetRef.current?.hide();
    };

    if (isLoading) {
        // return <RecipeDetailSkeleton />;
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'
        }}>
            <ActivityIndicator size="large" color='#28efa8' />
        </View>
    }

    return (
        <FlatList
            data={[]}
            renderItem={() => null}
            ListHeaderComponent={
                <View style={{
                    padding: 20,
                    paddingTop: Platform.OS === 'ios' ? 40 : 30,
                    backgroundColor: 'white',
                    minHeight: '100%'
                }}>
                    <RecipeIntro recipeDetails={recipeDetails} handleAddToMealPress={handleAddToMealPress} />
                    <RecipeIngredients recipeDetails={recipeDetails} />
                    <RecipeSteps recipeDetails={recipeDetails} />

                    <View style={{ marginTop: 15 }}>
                        <Button title={'Add to meal plan'} onPress={handleAddToMealPress} />
                    </View>

                    <ActionSheet ref={actionSheetRef}>
                        <AddToMealActionSheet
                            recipeDetails={recipeDetails}
                            hideActionSheet={hideActionSheetPress}
                        />
                    </ActionSheet>
                </View>
            }
        />
    );
}