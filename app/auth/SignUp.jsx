import { View, Text, Image, Alert, Keyboard } from "react-native";
import React, { useContext, useState } from "react";
import Input from "../../components/shared/Input";
import ButtonPrimary from "../../components/shared/ButtonPrimary";
import { Link, useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/FirebaseConfig";
import { useMutation } from "convex/react";
import { UserContext } from "../../context/UserContext";
import { api } from "../../convex/_generated/api";

export default function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const createNewUser = useMutation(api.Users.CreateNewUser);
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const onSignUp = () => {
    Keyboard.dismiss();
    if (!name || !email || !password) {
      Alert.alert("Missing Fields", "Fill all Fields");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        if (user) {
          const result = await createNewUser({
            name: name,
            email: email,
          });
          console.log(result);
          setUser(result);
        }
        router.push("/auth/SignIn");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // Handle error appropriately
      });
  };
  return (
    <View className="flex items-center p-10">
      <Image
        source={require("./../../assets/images/logos/color_text_on_transparent_bg.png")}
        className="w-64 h-32 mt-32"
      />
      <Text className="text-2xl font-bold ">Create New Account</Text>
      <View className="mt-3 w-[100%]">
        <Input placeholder={"Full Name"} onChangeText={setName} />
        <Input placeholder={"Email"} onChangeText={setEmail} />
        <Input
          placeholder={"Password"}
          password={true}
          onChangeText={setPassword}
        />
        <ButtonPrimary title={"Sign Up"} onPress={() => onSignUp()} />
        <View className="flex flex-row justify-between mt-6">
          <Text className="text-center text-sm ">Already have an account?</Text>
          <Link href="auth/SignIn">
            <Text className="text-center text-sm font-extrabold">
              Sign In Here
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
