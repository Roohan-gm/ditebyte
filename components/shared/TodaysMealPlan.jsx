import { View, Text } from 'react-native';
import { useState } from 'react';
import Button from './Button';
import { AddMealIcon } from '../../assets/images/icons/svgIcons';

export default function TodaysMealPlan() {
    const [mealPlan, setMealPlan] = useState();

    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Today's meal plan</Text>
            {!mealPlan && (
                <View style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 15,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    borderRadius: 8,
                    marginTop: 10,
                }}>
                    <AddMealIcon size={32} color="#28efa8" />
                    <Text style={{ fontSize: 16, color: 'gray', marginTop: 5 }}>No meal plans today</Text>
                    <View style={{ marginTop: 10 , width: '100%' }}>
                        <Button title={'Create Meal Plan'} onPress={() => { }} />
                    </View>
                </View>
            )}
        </View>
    );
}