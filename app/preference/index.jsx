import { View, Text } from 'react-native';
import React from 'react';
import Input from './../../components/shared/Input';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import ButtonPrimary from './../../components/shared/ButtonPrimary';

export default function Preference() {
    return (
        <View className="p-10 bg-white h-full">
            <Text className="text-center font-bold text-3xl mt-14">Tell us about yourself</Text>
            <Text className="text-center text-gray-500 mt-2 text-base">We will use this information to personalize your meals</Text>
            <View className="flex flex-row gap-8 mt-2">
                <View className="flex-1">
                    <Input placeholder={'e.g: 70'} label={'Weight (kg)'} />
                </View>
                <View className="flex-1">
                    <Input placeholder={'e.g: 5.8'} label={'Height (ft)'} />
                </View>
            </View>
            <View className="mt-4">
                <Text className="font-bold text-[18px]">Gender</Text>
                <View className="flex flex-row gap-2 mt-2">
                    <View className="items-center flex-1 border-2 border-gray-300 rounded-lg p-5">
                        <Foundation name="male-symbol" size={40} color="#3b82f6" />
                        <Text className="font-bold text-gray-400">Male</Text>
                    </View>
                    <View className="items-center flex-1 border-2 border-gray-300 rounded-lg p-5">
                        <Foundation name="female-symbol" size={40} color="#ec4899" />
                        <Text className="font-bold text-gray-400">Female</Text>
                    </View>
                    <View className="items-center flex-1 border-2 border-gray-300 rounded-lg p-5">
                        <MaterialIcons name="transgender" size={40} color="#e879f9" />
                        <Text className="font-bold text-gray-400">Other</Text>
                    </View>
                </View>
                <View className="mt-4">
                    <Text className="font-bold text-[18px]">
                        What's your goal?
                    </Text>
                    <View className="items-center flex flex-row gap-4 mt-2 border-2 border-gray-300 rounded-lg p-5">
                        <FontAwesome5 name="dumbbell" size={24} color="#ef4444" />
                        <View className="flex-1">
                            <Text className="text-lg font-bold">Muscle Gain</Text>
                            <Text className="text-gray-400">Build muscle & strength</Text>
                        </View>
                    </View>
                    <View className="items-center flex flex-row gap-4 mt-2 border-2 border-gray-300 rounded-lg p-5">
                        <FontAwesome6 name="weight-scale" size={24} color="#f97316" />
                        <View className="flex-1">
                            <Text className="text-lg font-bold">Weight Loss</Text>
                            <Text className="text-gray-400">Reduce body fat & get leaner</Text>
                        </View>
                    </View>
                    <View className="items-center flex flex-row gap-4 mt-2 border-2 border-gray-300 rounded-lg p-5">
                        <FontAwesome5 name="weight-hanging" size={24} color="#fbbf24" />
                        <View className="flex-1">
                            <Text className="text-lg font-bold">Weight Gain</Text>
                            <Text className="text-gray-400">Increase healthy body mass</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className="mt-10">
                <ButtonPrimary title={'Continue'} />
            </View>
        </View>
    )
}