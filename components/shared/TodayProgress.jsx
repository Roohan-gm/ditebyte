import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { DateTime } from 'luxon';
import { UserContext } from '../../context/UserContext';

export default function TodayProgress() {
    const now = DateTime.now();
    const { user } = useContext(UserContext);

      useEffect(() => {
        console.log("📜 Full User Data:", user);
    },  [user]);

    return (
        <View style={{ marginTop: 16, padding: 15, backgroundColor: 'white', borderRadius: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Today's Goal</Text>
                <Text style={{ fontSize: 12 }}>{now.toFormat('MMMM dd, yyyy')}</Text>
            </View>

            <Text style={{ fontSize: 25, marginTop: 30, fontWeight: '900', textAlign: 'center', color: '#28efa8' }}>
                1550/{user?.calories} Kcal
            </Text>

            <Text style={{ textAlign: 'center', marginTop: 6, fontSize: 14 }}>You're doing great!</Text>

            <View style={{ width: '100%', height: 10, borderRadius: 8, marginTop: 10, opacity: 0.75, backgroundColor: '#e0e0e0' }}>
                <View style={{ width: '60%', height: 10, borderRadius: 8, opacity: 0.75, backgroundColor: '#28efa8' }} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                <Text style={{ fontSize: 14 , fontWeight: 'bold' ,color: 'gray'}}>Calories Consumed</Text>
                <Text style={{ fontSize: 14 }}>Keep it up!🔥</Text>
            </View>
        </View>
    );
}