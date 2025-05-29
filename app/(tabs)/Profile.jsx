import { View, Text, Platform, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { AiRecipeIcon, LogoutIcon, MealIcon, ProgressIcon, WalletIcon } from '../../assets/images/icons/svgIcons';
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'expo-router';
import { auth } from './../../services/FirebaseConfig';
import { signOut } from 'firebase/auth';
import DefaultProfile from '../../assets/images/defaults/DefaultProfile';
import { useMutation, useQuery } from 'convex/react';
import * as ImagePicker from 'expo-image-picker';
import { api } from './../../convex/_generated/api';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const GenerateUploadUrl = useMutation(api.Storage.generateUploadUrl);
  const UpdateUserProfile = useMutation(api.Users.UpdateUserProfile);
  const fileUrl = useQuery(api.Storage.getFileUrl, { storageId: user?.picture || "defaultValue" });

  const router = useRouter();

  const uploadImageToConvex = useCallback(async (imageUri) => {
    try {
      console.log("imageUri before upload:", imageUri);

      if (!imageUri) throw new Error("Invalid image URI");

      setLoading(true); // Start loading
      const uploadUrl = await GenerateUploadUrl();
      console.log("Generated uploadUrl:", uploadUrl);

      if (!uploadUrl) throw new Error("Failed to generate upload URL");

      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": "image/jpeg",
        },
        body: await fetch(imageUri).then(res => res.blob()),
      });

      console.log("Upload response status:", response.status);

      if (!response.ok) {
        console.log("Upload failed. Response:", await response.text());
        throw new Error("Failed to upload image");
      }

      const { storageId } = await response.json();
      console.log("storageId received:", storageId);

      if (!storageId) throw new Error("Failed to retrieve storage ID");

      await UpdateUserProfile({ uid: user?._id, picture: storageId });
      console.log("Updating user profile with picture:", storageId);

      setUser(prevUser => {
        const updatedUser = { ...prevUser, picture: storageId };
        console.log("Updated user state:", updatedUser);
        return updatedUser;
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Upload failed", error.message);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  }, [GenerateUploadUrl, UpdateUserProfile, user, setUser]);

  useEffect(() => {
    console.log("fileUrl:", fileUrl);
    if (fileUrl) {
      setImageUrl(fileUrl);
    }
  }, [fileUrl]);

  const changeProfilePic = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Please allow access to photos.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8
      });

      if (!result.canceled && result.assets.length > 0) {
        await uploadImageToConvex(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Profile pic update failed:', error);
      Alert.alert('Error', 'Failed to update profile picture.');
    }
  }, [uploadImageToConvex]);

  const OnMenuOptionClick = async (menu) => {
    try {
      if (menu?.path === 'logout') {
        setUser(null);
        await signOut(auth);
        router.replace('/');
        return;
      }

      if (typeof menu?.path === 'string' && menu.path.startsWith('/')) {
        router.push(menu.path);
      } else {
        console.error('Invalid navigation path:', menu?.path);
      }
    } catch (error) {
      console.error('Menu action failed:', error);
      if (error.code === 'auth/network-request-failed') {
        alert('Network error. Please check your internet connection.');
      } else {
        alert('Action failed. Please try again.');
      }
    }
  };

  const MenuOptions = [
    { title: 'My Progress', icon: <ProgressIcon size={30} color='#28efa8' />, path: '/(tabs)/Progress' },
    { title: 'Explore Recipes', icon: <MealIcon size={30} color='#28efa8' />, path: '/(tabs)/Meals' },
    { title: 'Ai Recipes', icon: <AiRecipeIcon size={30} color='#28efa8' />, path: '/generate-ai-recipe' },
    { title: 'Billing', icon: <WalletIcon size={30} color='#28efa8' />, path: '/billing' },
    { title: 'Logout', icon: <LogoutIcon size={30} color='#28efa8' />, path: '/auth/SignIn' }
  ];

  return (
    <View style={{ padding: 20, paddingTop: Platform.OS === 'ios' ? 40 : 30 }}>
      <View style={{ display: 'flex', alignItems: 'center', marginTop: 30 }}>
        <TouchableOpacity onPress={changeProfilePic}>
          {imageUrl ? (
            <View style={{ width: 150, height: 150, borderRadius: 75, overflow: 'hidden', position: 'relative' }}>
              <Image
                source={{ uri: imageUrl }}
                style={{ width: '100%', height: '100%' }}
              />
              {loading && (
                <View style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)' // Slightly transparent white background
                }}>
                  <ActivityIndicator size="large" color="#28efa8" />
                </View>
              )}
            </View>
          ) : (
            <DefaultProfile size={150} />
          )}
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5 }}>{user?.name}</Text>
        <Text style={{ fontSize: 16, color: 'gray', marginTop: 5 }}>{user?.email}</Text>
      </View>

      <FlatList
        style={{ marginTop: 20 }}
        data={MenuOptions}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => OnMenuOptionClick(item)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              padding: 15,
              marginTop: 5,
              borderRadius: 15,
              backgroundColor: 'white',
              elevation: 1
            }}>
            {item.icon}
            <Text style={{ fontSize: 20, fontWeight: '300' }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}