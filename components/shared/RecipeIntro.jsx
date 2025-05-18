import { View, Image, Text, Platform } from 'react-native'
import { AddIcon, CalorieIcon, CarbsIcon, FatIcon, ProteinIcon } from '../../assets/images/icons/svgIcons'
import { useRecipeDetail } from '../../hooks/userRecipeDetails';

export default function RecipeIntro() {
  console.log("Intro Starts here...");
  const { recipeDetails, isLoading } = useRecipeDetail();
  if (isLoading) {
    console.log("Intro Loading")
  }
  return (
    <View style={{ padding: 20, paddingTop: Platform.OS == 'ios' ? 40 : 30 }}>
      {/* <Image
        source={{ uri: recipeDetails?.imageUrl }}
        style={{ width: "100%", height: 200, borderRadius: 15 }}
      /> */}
      <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
        <Text numberOfLines={1} style={{ fontSize: 24, fontWeight: 'bold', marginRight: 10, flex: 1, maxWidth: '80%' }}>{recipeDetails?.recipeName}</Text>
        <AddIcon size={40} color={'#28efa8'} />
      </View>
      <Text style={{ fontSize: 16, marginTop: 6, color: "gray", lineHeight: 25 }}>
        {recipeDetails?.description}
      </Text>
      <View style={{ marginTop: 15, display: 'flex', flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
        <View style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fed7aa', padding: 6, borderRadius: 10, flex: 1 }}>
          <CalorieIcon color='#f97316' size={27} />
          <Text style={{ fontSize: 16, color: 'white' }}>Calories</Text>
          <Text style={{ fontSize: 20, color: '#f97316', fontWeight: 'bold' }}>{recipeDetails?.calories}</Text>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fde68a', padding: 6, borderRadius: 10, flex: 1 }}>
          <ProteinIcon color='#f59e0b' size={27} />
          <Text style={{ fontSize: 16, color: 'white' }}>Protein</Text>
          <Text style={{ fontSize: 20, color: '#f97316', fontWeight: 'bold' }}>{recipeDetails?.protein}</Text>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', backgroundColor: '#d9f99d', padding: 6, borderRadius: 10, flex: 1 }}>
          <CarbsIcon color='#84cc16' size={27} />
          <Text style={{ fontSize: 16, color: 'white' }}>Carbs</Text>
          <Text style={{ fontSize: 20, color: '#84cc16', fontWeight: 'bold' }}>{recipeDetails?.carbs}</Text>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fef9c3', padding: 6, borderRadius: 10, flex: 1 }}>
          <FatIcon color='#fde047' size={27} />
          <Text style={{ fontSize: 16, color: 'white' }}>Fat</Text>
          <Text style={{ fontSize: 20, color: '#fde047', fontWeight: 'bold' }}>{recipeDetails?.fat}</Text>
        </View>
      </View>
    </View>
  );
}
