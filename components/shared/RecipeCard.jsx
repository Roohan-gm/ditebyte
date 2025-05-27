import { View, Text } from 'react-native'
import React from 'react'
import { CalorieIcon, TimeIcon } from '../../assets/images/icons/svgIcons';
import { Link } from 'expo-router';

export default function RecipeCard({ recipe }) {
    const recipeJson = recipe?.jsonData;
    return (
        <Link href={'/recipe-detail?recipeId=' + recipe?._id}
            style={{
                // flex: 1,
                margin: 3,
                padding: 10,
                backgroundColor: 'white',
                borderRadius: 15,
                // borderWidth: 2,
                // borderColor: 'gray'
            }}
        >
            <View>
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}>{recipe?.recipeName}</Text>
                <Text
                    numberOfLines={3}
                    style={{
                        fontSize: 14,
                        color: 'gray'
                    }}>
                    {recipeJson?.description}
                </Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 6
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <CalorieIcon color='#f97316' size={18} />
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#f97316' }}>
                            {recipeJson?.calories} Kcl
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <TimeIcon color='#0ea5e9' size={18} />
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#0ea5e9' }}>
                            {recipeJson?.cookingTime} Min
                        </Text>
                    </View>
                </View>
            </View>
        </Link>
    )
}