import { Image, Text, View } from "react-native";
import { auth } from "../services/FirebaseConfig";
import React, { useContext, useEffect } from "react";
import Button from "../components/shared/Button";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../context/UserContext";
import { useConvex } from "convex/react";
import { api } from "../convex/_generated/api";
import { RightArrow } from "../assets/images/icons/svgIcons";

export default function Index() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const convex = useConvex();

  useEffect(() => {
    // Create an async function inside useEffect
    const fetchUserData = async (userInfo) => {
      try {
        if (!userInfo?.email) return;

        const userData = await convex.query(api.Users.GetUser, {
          email: userInfo.email,
        });

        console.log("User data:", userData);
        setUser(userData);
        router.replace(userInfo ? "/(tabs)/Home" : "/auth/SignIn");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (userInfo) => {
      await fetchUserData(userInfo);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-[#28efa8]">
      <View className="absolute h-screen w-screen bg-black/60 flex items-center p-[20]">
        <Image
          source={require("./../assets/images/logos/full_color.png")}
          className="w-40 h-40 mt-52"
        />

        <Text className="text-center mx-10 mt-10 text-white text-lg opacity-80">
          Welcome to DietBite! - your partner in achieving a healthier, happier
          you! Let's fuel your journey today!
        </Text>
        <View className="absolute bottom-16 w-full px-5">
          <Button
            title="Get Started"
            onPress={() => router.push("/auth/SignIn")}
            icon={<RightArrow />}
          />
        </View>
      </View>
    </View>
  );
}