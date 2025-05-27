import { View, Image, Text, TouchableOpacity } from 'react-native'
import { AddIcon, CalorieIcon, CarbsIcon, FatIcon, ProteinIcon, ServingIcon, TimeIcon } from '../../assets/images/icons/svgIcons'

export default function RecipeIntro({ recipeDetails, handleAddToMealPress }) {
  return (
    <View>
      {/* <Image
        source={{ uri: recipeDetails?.imageUrl }}
        style={{ width: "100%", height: 200, borderRadius: 15 }}
      /> */}
      <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text numberOfLines={1} style={{ fontSize: 24, fontWeight: 'bold', marginRight: 10, flex: 1, maxWidth: '80%' }}>{recipeDetails?.jsonData?.recipeName}</Text>
        <TouchableOpacity
          onPress={() => handleAddToMealPress()}
        >
          <AddIcon size={40} color={'#28efa8'} />
        </TouchableOpacity>
      </View>
      <Text numberOfLines={3} style={{ fontSize: 16, marginTop: 6, color: "gray", lineHeight: 25 }}>
        {recipeDetails?.jsonData?.description}
      </Text>
      <View style={{ marginTop: 15, display: 'flex', flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
        <View style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fed7aa', padding: 6, borderRadius: 10, flex: 1 }}>
          <CalorieIcon color='#f97316' size={27} />
          <Text style={{ fontSize: 16, color: 'white', fontWeight: "bold" }}>Calories</Text>
          <Text style={{ fontSize: 20, color: '#f97316', fontWeight: 'bold' }}>{recipeDetails?.jsonData?.calories}</Text>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fca5a5', padding: 6, borderRadius: 10, flex: 1 }}>
          <ProteinIcon color='#ef4444' size={27} />
          <Text style={{ fontSize: 16, color: 'white', fontWeight: "bold" }}>Protein</Text>
          <Text style={{ fontSize: 20, color: '#ef4444', fontWeight: 'bold' }}>{recipeDetails?.jsonData?.protein}</Text>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', backgroundColor: '#d9f99d', padding: 6, borderRadius: 10, flex: 1 }}>
          <CarbsIcon color='#84cc16' size={27} />
          <Text style={{ fontSize: 16, color: 'white', fontWeight: "bold" }}>Carbs</Text>
          <Text style={{ fontSize: 20, color: '#84cc16', fontWeight: 'bold' }}>{recipeDetails?.jsonData?.carbs}</Text>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fde68a', padding: 6, borderRadius: 10, flex: 1 }}>
          <FatIcon color='#f97316' size={27} />
          <Text style={{ fontSize: 16, color: 'white', fontWeight: "bold" }}>Fat</Text>
          <Text style={{ fontSize: 20, color: '#f97316', fontWeight: 'bold' }}>{recipeDetails?.jsonData?.fat}</Text>
        </View>
      </View>
      <View style={{ marginTop: 15, display: 'flex', flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
        <View style={{ display: 'flex', alignItems: 'center', backgroundColor: '#7dd3fc', padding: 6, borderRadius: 10, flex: 1 }}>
          <TimeIcon color='#0ea5e9' size={27} />
          <Text style={{ fontSize: 16, color: 'white', fontWeight: "bold" }}>Time</Text>
          <Text style={{ fontSize: 20, color: '#0ea5e9', fontWeight: 'bold' }}>{recipeDetails?.jsonData?.cookingTime} min</Text>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', backgroundColor: '#5eead4', padding: 6, borderRadius: 10, flex: 1 }}>
          <ServingIcon color='#14b8a6' size={27} />
          <Text style={{ fontSize: 16, color: 'white', fontWeight: "bold" }}>Serving</Text>
          <Text style={{ fontSize: 20, color: '#14b8a6', fontWeight: 'bold' }}>{recipeDetails?.jsonData?.servingSize} people</Text>
        </View>
      </View>
    </View>
  );
}
