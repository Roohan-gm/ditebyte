import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false, tabBarActiveTintColor: "#28efa8",
            tabBarItemStyle: { flex: 1, justifyContent: "center", alignItems: "center" },
            tabBarInactiveTintColor: "gray", tabBarShowLabel: false,
            tabBarStyle: {
                position: "absolute", bottom: 15, left: 0, right: 0,
                elevation: 0, backgroundColor: "#fff", height: 60, borderRadius: 50,
                marginHorizontal: 10
            }
        }}>
            <Tabs.Screen name="Home" options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }} />
            <Tabs.Screen name="Meals" options={{ tabBarIcon: ({ color, size }) => <FontAwesome6 name="bowl-food" size={size} color={color} /> }} />
            <Tabs.Screen name="Progress" options={{ tabBarIcon: ({ color, size }) => <FontAwesome6 name="chart-simple" size={size} color={color} /> }} />
            <Tabs.Screen name="Profile" options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" size={size} color={color} /> }} />
        </Tabs>
    )
}