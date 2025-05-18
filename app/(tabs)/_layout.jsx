import React from 'react'
import { Tabs } from 'expo-router'
import { HomeIcon, MealIcon, PersonIcon, ProgressIcon } from './../../assets/images/icons/svgIcons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#28efa8",
            tabBarInactiveTintColor: "gray",
            tabBarShowLabel: false,
            tabBarStyle: {
                position: "absolute",
                bottom: 15,
                left: 0,
                right: 0,
                elevation: 0,
                backgroundColor: "#fff",
                height: 70,
                borderRadius: 50,
                marginHorizontal: 20,
            },
            tabBarIconStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }
        }}>
            <Tabs.Screen name="Home" options={{ tabBarIcon: ({ color, size }) => <HomeIcon size={size} color={color} /> }} />
            <Tabs.Screen name="Meals" options={{ tabBarIcon: ({ color, size }) => <MealIcon size={size} color={color} /> }} />
            <Tabs.Screen name="Progress" options={{ tabBarIcon: ({ color, size }) => <ProgressIcon size={size} color={color} /> }} />
            <Tabs.Screen name="Profile" options={{ tabBarIcon: ({ color, size }) => <PersonIcon size={size} color={color} /> }} />
        </Tabs>
    )
}