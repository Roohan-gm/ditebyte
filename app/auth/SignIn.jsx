import { View, Text, Image, Alert, Keyboard } from "react-native";
import React, { useContext, useState } from "react";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import { Link, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useConvex } from "convex/react";
import { UserContext } from "../../context/UserContext";
import { api } from '../../convex/_generated/api';
import { auth } from "../../services/FirebaseConfig";

export default function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const convex = useConvex();
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSignIn = async () => {
    Keyboard.dismiss();

    if (!email || !password) {
      Alert.alert("⚠️ Missing Fields", "Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      // Sign in user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      const userData = await convex.query(api.Users.GetUser, {
        email: email,
      });

      // console.log("✅ User data:", userData);

      // Check if user data is valid
      if (!userData) {
        console.error("❌ User not found or query failed.");
        Alert.alert("User not found", "No data found for this email.");
        setLoading(false);
        return;
      }

      // Set user data
      setUser(userData);
      setLoading(false);

      // Redirect user to home screen
      router.push("/(tabs)/Home");

    } catch (error) {
      // console.error("❌ Authentication Error:", error.code, error.message);
      Alert.alert("Incorrect Email & Password", "Please enter valid credentials.");
      setLoading(false);
    }
  };

  return (
    <View className="flex items-center p-10">
      <Image
        source={require("./../../assets/images/logos/color_text_on_transparent_bg.png")}
        className="w-64 h-32 mt-32"
      />
      <Text className="text-2xl font-bold ">Welcome back!</Text>
      <View className="mt-3 w-[100%]">
        <Input
          placeholder={"Email"}
          onChangeText={(text) => setEmail(text.toLowerCase().trim())}
          keyboardType={'email-address'}
        />
        <Input
          placeholder={"Password"}
          password={true}
          onChangeText={(text) => setPassword(text.trim())}
        />
        <View className="mt-3">
          <Button title={"Sign In"} onPress={() => onSignIn()} loading={loading} />
        </View>
        <View className="flex flex-row justify-between mt-6">
          <Text className="text-center text-sm ">Don't have an account?</Text>
          <Link href="auth/SignUp">
            <Text className="text-center text-sm font-extrabold">
              Create New Account
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
