import { View, Text, FlatList } from 'react-native'
import React from 'react'

export default function RecipeSteps({ recipeDetails }) {
  const steps = (recipeDetails?.jsonData)?.steps;
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Steps</Text>
      <FlatList
        data={steps}
        renderItem={({ item, index }) => (
          <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginTop: 5, padding: 10, flex: 1, borderWidth: 0.5, borderRadius: 8, borderColor: '#5eead4', alignItems: 'center' }}>
            <Text style={{ fontSize: 15, padding: 10, borderRadius: 8, color: 'white', backgroundColor: '#5eead4' }}>
              {index + 1}
            </Text>

            <Text style={{ fontSize: 18, flex: 1, flexShrink: 1 }}>{item}</Text>
          </View>
        )}
      >

      </FlatList>
    </View>
  )
}