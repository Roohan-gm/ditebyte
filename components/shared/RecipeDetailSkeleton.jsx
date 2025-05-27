import { View, FlatList, Platform } from "react-native";
import { Shimmer } from "react-shimmer-effects";

export default function RecipeDetailSkeleton() {
  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <View
          style={{
            padding: 20,
            paddingTop: Platform.OS === "ios" ? 40 : 30,
            backgroundColor: "white",
            minHeight: "100%",
          }}
        >
          {/* Title Row */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
            <Shimmer width="80%" height={30} borderRadius={5} />
            <Shimmer width={40} height={40} borderRadius={20} />
          </View>

          {/* Description */}
          <Shimmer width="100%" height={60} borderRadius={5} style={{ marginTop: 6 }} />

          {/* Nutrition Info */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
            {[...Array(4)].map((_, index) => (
              <View key={index} style={{ flex: 1, alignItems: "center", padding: 6 }}>
                <Shimmer width={27} height={27} borderRadius={13} />
                <Shimmer width="80%" height={20} borderRadius={5} style={{ marginTop: 5 }} />
                <Shimmer width="60%" height={25} borderRadius={5} style={{ marginTop: 5 }} />
              </View>
            ))}
          </View>

          {/* Cooking Time + Serving */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
            {[...Array(2)].map((_, index) => (
              <View key={index} style={{ flex: 1, alignItems: "center", padding: 6 }}>
                <Shimmer width={27} height={27} borderRadius={13} />
                <Shimmer width="80%" height={20} borderRadius={5} style={{ marginTop: 5 }} />
                <Shimmer width="60%" height={25} borderRadius={5} style={{ marginTop: 5 }} />
              </View>
            ))}
          </View>

          {/* Ingredients Header */}
          <Shimmer width="100%" height={30} borderRadius={5} style={{ marginTop: 15 }} />

          {/* Ingredients List */}
          {[...Array(3)].map((_, index) => (
            <Shimmer 
              key={index}
              width="100%"
              height={50}
              borderRadius={5}
              style={{ marginTop: 10 }}
            />
          ))}

          {/* Steps Header */}
          <Shimmer width="100%" height={30} borderRadius={5} style={{ marginTop: 15 }} />

          {/* Steps List */}
          {[...Array(3)].map((_, index) => (
            <Shimmer
              key={index}
              width="100%"
              height={60}
              borderRadius={5}
              style={{ marginTop: 10 }}
            />
          ))}

          {/* Button */}
          <Shimmer width="100%" height={50} borderRadius={10} style={{ marginTop: 20 }} />
        </View>
      }
    />
  );
}