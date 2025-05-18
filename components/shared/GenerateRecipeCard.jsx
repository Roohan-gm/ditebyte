import { Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StarIcon } from '../../assets/images/icons/svgIcons';

export default function GenerateRecipeCard() {
    const router = useRouter();
    return (
        <LinearGradient
            style={{ borderRadius: 8, marginTop: 10, padding: 15 }}
            colors={['#28efa8', '#1c7b8a']}
        >
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>
                Need meal ideas?✨
            </Text>
            <Text style={{ fontSize: 14, color: 'white', marginTop: 8, opacity: 0.8 }}>
                Let our AI generate a recipe for you!
            </Text>
            <TouchableOpacity
            onPress={() => router.push('/generate-ai-recipe')}
                style={{
                    backgroundColor: 'white',
                    borderRadius: 8,
                    padding: 15,
                    marginTop: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    width: '60%'
                }}
            >
                <Text style={{ color: '#28efa8', fontWeight: 'bold', fontSize: 16 }}>
                    Generate Recipe
                </Text>
                <StarIcon size={16} color="#28efa8" />
            </TouchableOpacity>
        </LinearGradient>
    );
}