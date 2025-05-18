import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import DefaultProfile from '../../assets/images/defaults/DefaultProfile';
import { UserContext } from '../../context/UserContext';

export default function HomeHeader() {
  const { user } = useContext(UserContext);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <DefaultProfile />
      <View>
        <Text style={{ fontSize: 16 }}>Hello, 👋</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{user?.name}</Text>
      </View>
    </View>
  );
}