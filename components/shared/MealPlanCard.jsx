import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useContext } from 'react';
import { BreakfastSunIcon, CalorieIcon, CarbsIcon, CheckIcon, CheckMarkIcon, DinnerIcon, FatIcon, LunchIcon, ProteinIcon } from '../../assets/images/icons/svgIcons';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { RefreshDataContext } from './../../context/RefreshDataContext';
import { Link } from 'expo-router';

export default function MealPlanCard({ mealPlanInfo }) {
    const updateStatus = useMutation(api.MealPlan.updateStatus);
    const { refreshData, setRefreshData } = useContext(RefreshDataContext);

    // Define colors and icons based on mealType
    const mealType = mealPlanInfo?.mealPlan?.mealType;

    const mealBGColor = mealType === 'Lunch' ? '#ffedd5'
        : mealType === 'Breakfast' ? '#fef9c3'
            : mealType === 'Dinner' ? '#a5f3fc'
                : '#000';
    const mealIconSelect = mealType === 'Lunch' ? <LunchIcon color='#fb923c' size={36} />
        : mealType === 'Breakfast' ? <BreakfastSunIcon color='#fbbf24' size={36} />
            : mealType === 'Dinner' ? <DinnerIcon color='#0e7490' size={36} />
                : null;

    const mealStatus = mealPlanInfo?.mealPlan?.status;
    const recipeName = mealPlanInfo?.recipe?.recipeName;
    const calories = mealPlanInfo?.recipe?.jsonData?.calories ?? 0;

    const onCheck = async (status) => {
        try {
            await updateStatus({
                id: mealPlanInfo?.mealPlan?._id,
                status: status,
                calories: calories
            });
            Alert.alert('Great!', "Status updated.");
            setRefreshData(Date.now());
        } catch (error) {
            console.error("Failed to update status:", error);
            Alert.alert('Error', "Could not update meal plan status.");
        }
    };

    return (
        <Link
            href={'/recipe-detail?recipeId=' + mealPlanInfo?.mealPlan?.recipeId}
            style={{
                marginTop: 10
            }}
        >
            <View style={{
                padding: 12,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'white',
                borderRadius: 15,
            }}>
                {/* Meal Type Box */}
                <View style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                    backgroundColor: mealBGColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 8,
                }}>
                    {mealIconSelect}
                </View>

                {/* Nutrient Info */}
                <View style={{ flex: 1, gap: 8 }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: '#1f2937'
                        }}>
                        {recipeName}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <CalorieIcon color='#f97316' size={18} />
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#f97316' }}>
                            {calories} Kcl
                        </Text>
                    </View>
                </View>
                {/* Status Button */}
                <TouchableOpacity
                    onPress={() => onCheck(!mealStatus)}
                    style={{ padding: 8 }}
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                >
                    {mealStatus ?
                        <CheckMarkIcon size={24} color="#10b981" /> :
                        <CheckIcon size={24} color="#64748b" />
                    }
                </TouchableOpacity>
            </View>
        </Link>
    );
}