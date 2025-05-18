import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { UserContext } from './../../context/UserContext';
import { useRouter } from 'expo-router';
import HomeHeader from '../../components/shared/HomeHeader';
import TodayProgress from '../../components/shared/TodayProgress';
import GenerateRecipeCard from '../../components/shared/GenerateRecipeCard';
import TodaysMealPlan from '../../components/shared/TodaysMealPlan';

export default function Home() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user?.weight) {
      router.replace("/preference");
    }
  }, [user]);

  return (
    <View className="p-4">
      <HomeHeader />
      <TodayProgress />
      <GenerateRecipeCard/>
      <TodaysMealPlan/>
    </View>
  )
}