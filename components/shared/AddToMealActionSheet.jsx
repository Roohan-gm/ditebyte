import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { BreakfastSunIcon, DinnerIcon, LunchIcon } from '../../assets/images/icons/svgIcons';
import Button from './Button';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { UserContext } from '../../context/UserContext';
import DateSelectionCard from './DateSelectionCard';

export default function AddToMealActionSheet({ recipeDetails, hideActionSheet }) {
    const [selectDate, setSelectDate] = useState(null);
    const [selectMeal, setSelectMeal] = useState(null);

    const CreateMealPlan = useMutation(api.MealPlan.CreateMealPlan);
    const { user } = useContext(UserContext);
    console.log('Recipe Detail in Action Sheet: ', recipeDetails);

    const mealOptions = [
        { title: 'Breakfast', icon: BreakfastSunIcon },
        { title: 'Lunch', icon: LunchIcon },
        { title: 'Dinner', icon: DinnerIcon }
    ];

    const AddToMealPlan = async () => {
        if (!selectDate || !selectMeal) {
            Alert.alert("Error", "Please select all details")
            return
        }

        const result = await CreateMealPlan({
            date: selectDate,
            mealType: selectMeal,
            recipeId: recipeDetails?._id,
            uid: user?._id
        })
        console.log("CreateMealPlan: ", result);
        Alert.alert("Success!", "Added to meal plan")
        hideActionSheet();
    }
    return (
        <View style={{ padding: 20, paddingBottom: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Add To Meal</Text>
            <DateSelectionCard setSelectDate={setSelectDate} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 15 }}>Select Meal</Text>
            <FlatList
                data={mealOptions}
                numColumns={3}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        onPress={() => setSelectMeal(prev => prev !== item.title ? item.title : null)}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            padding: 7,
                            borderWidth: 1,
                            borderRadius: 10,
                            margin: 5,
                            backgroundColor: selectMeal === item.title ? '#a7f3d0' : 'white',
                            borderColor: selectMeal === item.title ? '#28efa8' : 'gray'
                        }}>
                        <item.icon
                            size={40}
                            color={selectMeal === item.title ? 'white' : 'gray'}
                        />
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: selectMeal === item.title ? 'white' : 'gray' }}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />

            <View style={{ marginTop: 25 }}>
                <Button title={'+ Add to Meal Plan'} onPress={AddToMealPlan} />
                <TouchableOpacity
                    onPress={hideActionSheet}
                    style={{ padding: 15 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: 'gray' }}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}