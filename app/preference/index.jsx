import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useContext, useState } from 'react';
import Input from './../../components/shared/Input';
import Button from './../../components/shared/Button';
import { useMutation } from 'convex/react';
import { api } from './../../convex/_generated/api';
import { UserContext } from './../../context/UserContext';
import { useRouter } from 'expo-router';
import Prompt from '../../shared/Prompt';
import { CalculateCaloriesAi } from '../../services/AiModel';
import {FemaleIcon, MaleIcon, MuscleGainIcon, OthersIcon, WeightGainIcon, WeightLossIcon} from '../../assets/images/icons/svgIcons';

export default function Preference() {
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [goal, setGoal] = useState();
    const { user, setUser } = useContext(UserContext);
    const router = useRouter();
    const UpdateUserPref = useMutation(api.Users.UpdateUserPref);
    const [loadingAi, setLoadingAi] = useState(false);

    const onContinue = async () => {
        if (!weight || !height || !age || !gender || !goal) {

            Alert.alert('Fill  all details.', 'Please fill all the details to continue.');
            return;
        }

        // console.log('Continuing with user:', user);

        const data = {
            uid: user?._id,
            weight: parseFloat(weight),
            height: parseFloat(height),
            age: parseInt(age),
            gender,
            goal,
        }

        setLoadingAi(true);
        //Calculate calories using AI
        const PROMPT = JSON.stringify(data) + Prompt.CALORIES_PROMPT;
        // console.log('Prompt:', PROMPT);
        const calories = await CalculateCaloriesAi(PROMPT);
        // console.log('Calories:', calories);
        const JsonContent = JSON.parse(calories.replace('```json', '').replace('```', ''));
        console.log('Parsed JSON Content:', JsonContent);

        console.log('Continuing with:', data);

        const result = await UpdateUserPref({
            ...data,
            ...JsonContent
        });

        setUser(prev => ({
            ...prev,
            ...data,
            ...JsonContent
        }));
        console.log('User updated:', result);
        console.log('User data:', user);
        setLoadingAi(false);
        router.replace('/(tabs)/Home');
    }

    return (
        <View className="p-10 bg-white h-full">
            <Text className="text-center font-bold text-3xl mt-14">Tell us about yourself</Text>
            <Text className="text-center text-gray-500 mt-2 text-base">We will use this information to personalize your meals</Text>
            <View className="flex flex-row gap-2 mt-2">
                <View className="flex-1">
                    <Input
                        placeholder={'e.g: 70'}
                        label={'Weight (kg)'}
                        value={weight}
                        onChangeText={setWeight}
                        keyboardType={'numeric'}
                    />
                </View>
                <View className="flex-1">
                    <Input
                        placeholder={'e.g: 5.8'}
                        label={'Height (ft)'}
                        value={height}
                        onChangeText={setHeight}
                        keyboardType={'numeric'}
                    />
                </View>
                <View className="flex-1">
                    <Input
                        placeholder={'e.g: 25'}
                        label={'Age (years)'}
                        value={age}
                        onChangeText={setAge}
                        keyboardType={'numeric'}
                    />
                </View>
            </View>
            <View className="mt-4">
                <Text className="font-bold text-[18px]">Gender</Text>
                <View className="flex flex-row gap-2 mt-2">
                    <TouchableOpacity onPress={() => setGender('Male')} className={`items-center flex-1 border-2 ${gender === 'Male' ? 'border-blue-500' : 'border-gray-300'} rounded-lg p-4`}>
                        <MaleIcon size={36} color="#3b82f6" />
                        <Text className={`font-bold ${gender === 'Male' ? 'text-blue-500' : 'text-gray-400'}`}>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setGender('Female')} className={`items-center flex-1 border-2 ${gender === 'Female' ? 'border-pink-500' : 'border-gray-300'} rounded-lg p-4`}>
                        <FemaleIcon size={36} color="#ec4899" />
                        <Text className={`font-bold ${gender === 'Female' ? 'text-pink-500' : 'text-gray-400'}`}>Female</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setGender('Other')} className={`items-center flex-1 border-2 ${gender === 'Other' ? 'border-purple-500' : 'border-gray-300'} rounded-lg p-4`}>
                        <OthersIcon size={36} color="#a855f7" />
                        <Text className={`font-bold ${gender === 'Other' ? 'text-purple-500' : 'text-gray-400'}`}>Other</Text>
                    </TouchableOpacity>
                </View>
                <View className="mt-4">
                    <Text className="font-bold text-[18px]">
                        What's your goal?
                    </Text>
                    <TouchableOpacity
                        onPress={() => setGoal('Muscle Gain')}
                        className={`items-center flex flex-row gap-4 mt-2 border-2 ${goal === 'Muscle Gain' ? 'border-red-500' : 'border-gray-300'} rounded-lg p-5`}>
                        <MuscleGainIcon size={24} color="#ef4444" />
                        <View className="flex-1">
                            <Text className={`text-lg font-bold ${goal === 'Muscle Gain' ? 'text-red-500' : ''}`}>Muscle Gain</Text>
                            <Text className="text-gray-400">Build muscle & strength</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setGoal('Weight Loss')}
                        className={`items-center flex flex-row gap-4 mt-2 border-2 ${goal === 'Weight Loss' ? 'border-orange-500' : 'border-gray-300'} rounded-lg p-5`}>
                        <WeightLossIcon size={24} color="#f97316" />
                        <View className="flex-1">
                            <Text className={`text-lg font-bold ${goal === 'Weight Loss' ? 'text-orange-500' : ''}`}>Weight Loss</Text>
                            <Text className="text-gray-400">Reduce body fat & get leaner</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setGoal('Weight Gain')}
                        className={`items-center flex flex-row gap-4 mt-2 border-2 ${goal === 'Weight Gain' ? 'border-yellow-500' : 'border-gray-300'} rounded-lg p-5`}>
                        <WeightGainIcon size={24} color="#fbbf24" />
                        <View className="flex-1">
                            <Text className={`text-lg font-bold ${goal === 'Weight Gain' ? 'text-yellow-500' : ''}`}>Weight Gain</Text>
                            <Text className="text-gray-400">Increase healthy body mass</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="mt-10">
                <Button title={'Continue'} onPress={onContinue} loading={loadingAi} />
            </View>
        </View>
    )
}