import { View, Text, Platform, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { AiRecipeIcon, LogoutIcon, MealIcon, ProgressIcon, WalletIcon } from '../../assets/images/icons/svgIcons';
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'expo-router';
import { auth } from './../../services/FirebaseConfig';
import { signOut } from 'firebase/auth';
import DefaultProfile from '../../assets/images/defaults/DefaultProfile';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const changeProfilePic = () => {

  }

  const OnMenuOptionClick = async (menu) => {
    try {
      if (menu?.path === 'logout') {
        // Clear sensitive data first
        setUser(null);

        // Perform logout
        await signOut(auth);

        // Navigate to root and clear navigation history
        router.replace('/');
        return;
      }

      // Validate path before navigation
      if (typeof menu?.path === 'string' && menu.path.startsWith('/')) {
        router.push(menu.path);
      } else {
        console.error('Invalid navigation path:', menu?.path);
        // Optional: Show error to user
        // alert('Invalid navigation path');
      }
    } catch (error) {
      console.error('Menu action failed:', error);
      // Handle specific errors
      if (error.code === 'auth/network-request-failed') {
        alert('Network error. Please check your internet connection.');
      } else {
        alert('Action failed. Please try again.');
      }
    }
  };

  const MenuOptions = [
    {
      title: 'My Progress',
      icon: <ProgressIcon size={30} color='#28efa8' />,
      path: '/(tabs)/Progress'
    },
    {
      title: 'Explore Recipes',
      icon: <MealIcon size={30} color='#28efa8' />,
      path: '/(tabs)/Meals'
    },
    {
      title: 'Ai Recipes',
      icon: <AiRecipeIcon size={30} color='#28efa8' />,
      path: '/generate-ai-recipe'
    },
    {
      title: 'Billing',
      icon: <WalletIcon size={30} color='#28efa8' />,
      path: '/billing'
    },
    {
      title: 'Logout',
      icon: <LogoutIcon size={30} color='#28efa8' />,
      path: '/auth/SignIn'
    }
  ];

  useEffect(() => {
    // Ensure navigation actions are only performed after the component has mounted
    if (user) {
      // Perform any necessary actions after the component has mounted
    }
  }, [user]);

  return (
    <View style={{
      padding: 20,
      paddingTop: Platform.OS === 'ios' ? 40 : 30
    }}>
      <View style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 30
      }}>
        <TouchableOpacity
          onPress={() => changeProfilePic()}
        >
          <DefaultProfile size={150} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 5
          }}
        >
          {user?.name}
        </Text>
        <Text style={{
          fontSize: 16,
          color: 'gray',
          marginTop: 5
        }}>
          {user?.email}
        </Text>
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
            <Text style={{
              fontSize: 20,
              fontWeight: '300'
            }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}