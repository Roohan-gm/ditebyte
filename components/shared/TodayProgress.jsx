import { View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { UserContext } from '../../context/UserContext';
import { useConvex } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { RefreshDataContext } from '../../context/RefreshDataContext';

export default function TodayProgress() {
    const now = DateTime.now();
    
    const convex = useConvex();
    const { user } = useContext(UserContext);

    const { refreshData, setRefreshData } = useContext(RefreshDataContext)

    const [totalCaloriesConsumed, setTotalCaloriesConsumed] = useState(0);

    useEffect(() => {
        user && GetTotalCaloriesConsumed()
    }, [user, refreshData])

    const GetTotalCaloriesConsumed = async () => {
        if (!user?._id) return; // Prevent unnecessary calls

        try {
            const result = await convex.query(api.MealPlan.GetTotalCaloriesConsumed, {
                date: DateTime.now().toFormat("dd/MM/yyyy"),
                uid: user?._id
            });

            console.log("GetTotalCaloriesConsumed: ", result);
            setTotalCaloriesConsumed(result || 0); // Ensure result isn't undefined
        } catch (error) {
            console.error("Error fetching total calories:", error);
        }
    }
    // Calculate the percentage of calories consumed
    const progressPercentage = user?.calories > 0
        ? (totalCaloriesConsumed / user?.calories) * 100
        : 0;

    return (
        <View style={{ marginTop: 16, padding: 15, backgroundColor: 'white', borderRadius: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Today's Goal</Text>
                <Text style={{ fontSize: 12 }}>{now.toFormat('MMMM dd, yyyy')}</Text>
            </View>

            <Text style={{ fontSize: 25, marginTop: 30, fontWeight: '900', textAlign: 'center', color: '#28efa8' }}>
                {totalCaloriesConsumed}/{user?.calories} Kcal
            </Text>

            <Text style={{ textAlign: 'center', marginTop: 6, fontSize: 14 }}>You're doing great!</Text>

            <View style={{ width: '100%', height: 10, borderRadius: 8, marginTop: 10, opacity: 0.75, backgroundColor: '#e0e0e0' }}>
                <View style={{ width: `${progressPercentage}%`, height: 10, borderRadius: 8, opacity: 0.75, backgroundColor: '#28efa8' }} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray' }}>Calories Consumed</Text>
                <Text style={{ fontSize: 14 }}>Keep it up!🔥</Text>
            </View>
        </View>
    );
}