import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useContext, useEffect, useState, useCallback } from 'react';
import Button from './Button';
import { AddMealIcon } from '../../assets/images/icons/svgIcons';
import { useConvex } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { DateTime } from 'luxon';
import { UserContext } from '../../context/UserContext';
import MealPlanCard from './MealPlanCard';
import { RefreshDataContext } from '../../context/RefreshDataContext';
import { useRouter } from 'expo-router';

export default function TodaysMealPlan({ selectDate = null }) {
    const [mealPlan, setMealPlan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);
    const convex = useConvex();
    const router = useRouter();
    const { refreshData } = useContext(RefreshDataContext);

    const GetTodaysMealPlan = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            console.log("selectDate", selectDate)
            const result = await convex.query(api.MealPlan.GetTodaysMealPlan, {
                date: selectDate ?? DateTime.now().toFormat("dd/MM/yyyy"),
                uid: user?._id
            });

            setMealPlan(result);
        } catch (err) {
            console.error("Failed to fetch meal plan:", err);
            setError('Failed to load meal plan. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [user?._id, selectDate, convex]);

    useEffect(() => {
        if (user) {
            GetTodaysMealPlan();
        }
    }, [user, refreshData, selectDate]);

    const handleCreatePlan = () => {
        router.push('/(tabs)/Meals')
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#28efa8" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Retry" onPress={GetTodaysMealPlan} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {!selectDate && (
                <Text style={styles.title}>Today's Meal Plan</Text>
            )}

            {mealPlan.length === 0 ? (
                <View style={styles.emptyState}>
                    <AddMealIcon size={32} color="#28efa8" />
                    <Text style={styles.emptyText}>No meal plans today</Text>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Create Meal Plan"
                            onPress={handleCreatePlan}
                            icon={<AddMealIcon size={20} color="white" />}
                        />
                    </View>
                </View>
            ) : (
                <FlatList
                    data={mealPlan}
                    renderItem={({ item }) => <MealPlanCard mealPlanInfo={item} />}
                    // keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No meals planned for this day</Text>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        color: '#1a1a1a',
    },
    emptyState: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        marginTop: 8,
    },
    buttonContainer: {
        marginTop: 15,
        width: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: 100,
        borderRadius: 15,
        marginTop: 15
    },
    errorContainer: {
        backgroundColor: '#ffe6e6',
        borderRadius: 8,
        padding: 15,
        marginTop: 10,
        alignItems: 'center',
    },
    errorText: {
        color: '#cc0000',
        fontSize: 16,
        marginBottom: 10,
    },
    listContent: {
        paddingBottom: 20,
    },
});