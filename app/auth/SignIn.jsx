import { View, Text, Image, Alert, Keyboard } from "react-native";
import React, { useContext, useState } from "react";
import Input from "../../components/shared/Input";
import ButtonPrimary from "../../components/shared/ButtonPrimary";
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

  const onSignIn = () => {
    Keyboard.dismiss();
    if (!email || !password) {
      Alert.alert("Missing Fields", "Fill all Fields");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userData = await convex.query(api.Users.GetUser, {
          email: email,
        });

        console.log(userData);
        setUser(userData);
        router.push("/(tabs)/Home");
        // Signed in

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        Alert.alert(
          "Incorrect Email & Password",
          "Please enter valid email and password"
        );
      });
  };

  return (
    <View className="flex items-center p-10">
      <Image
        source={require("./../../assets/images/logos/color_text_on_transparent_bg.png")}
        className="w-64 h-32 mt-32"
      />
      <Text className="text-2xl font-bold ">Welcome back!</Text>
      <View className="mt-3 w-[100%]">
        <Input placeholder={"Email"} onChangeText={setEmail} />
        <Input
          placeholder={"Password"}
          password={true}
          onChangeText={setPassword}
        />
        <ButtonPrimary title={"Sign In"} onPress={() => onSignIn()} />
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
