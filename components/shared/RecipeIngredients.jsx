import { View, Text, FlatList } from 'react-native';
import React from 'react';

export default function RecipeIngredients({ recipeDetails }) {
  const ingredients = (recipeDetails?.jsonData)?.ingredients;

  return (
    <View style={{ marginTop: 15 }}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ingredients</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{ingredients?.length} Items</Text>
      </View>

      <FlatList
        data={ingredients}
        renderItem={({ item, index }) => (
          <View style={{ marginTop: 10, display: 'flex', flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ccfbf1", borderRadius: 8, padding: 8 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5, flex: 1 }}>
              <Text style={{ fontSize: 23 }}>
                {item?.icon}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "medium",
                  flex: 1,
                  flexShrink: 1,
                  paddingRight: 10
                }}
                numberOfLines={3}
              >
                {item?.ingredient}
              </Text>
            </View>
            <Text style={{ color: 'gray', fontSize: 16, minWidth: 50 }}>
              {Number.isInteger(item?.quantity) ? item?.quantity : item?.quantity?.toFixed(2)}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}