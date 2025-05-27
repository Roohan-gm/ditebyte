import { View, Text, Platform, FlatList } from 'react-native'
import React, { useState } from 'react'
import DateSelectionCard from '../../components/shared/DateSelectionCard'
import TodaysMealPlan from '../../components/shared/TodaysMealPlan';
import TodayProgress from '../../components/shared/TodayProgress';
import GenerateRecipeCard from '../../components/shared/GenerateRecipeCard';

export default function Progress() {
  const [selectDate, setSelectDate] = useState(null);
  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <View style={{
          padding: 20,
          paddingTop: Platform?.OS === 'ios' ? 40 : 30,
          marginBottom: 70
        }}>
          <DateSelectionCard setSelectDate={setSelectDate} />
          {selectDate && <TodaysMealPlan selectDate={selectDate} />}
          <TodayProgress />
        </View>
      }
    />
  )
}