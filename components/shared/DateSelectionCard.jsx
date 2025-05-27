import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon';

export default function DateSelectionCard({ setSelectDate }) {
    const [dateList, setDateList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const generateDates = () => {
        const result = Array.from({ length: 4 }, (_, i) =>
            DateTime.now().plus({ days: i }).toFormat('dd/MM/yyyy')
        );
        setDateList(result);
    };

    useEffect(() => {
        generateDates();
    }, []);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectDate(date);
    };

    return (
        <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 15 }}>Select Date</Text>
            <FlatList
                data={dateList}
                numColumns={4}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                    const date = DateTime.fromFormat(item, 'dd/MM/yyyy');
                    return (
                        <TouchableOpacity
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            onPress={() => handleDateSelect(item)}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                padding: 7,
                                borderWidth: 1,
                                borderRadius: 10,
                                margin: 5,
                                backgroundColor: selectedDate === item ? '#a7f3d0' : 'white',
                                borderColor: selectedDate === item ? '#28efa8' : 'gray'
                            }}>
                            <Text style={{ 
                                fontSize: 18, 
                                fontWeight: '500', 
                                color: selectedDate === item ? '#166534' : 'gray' 
                            }}>
                                {date.toFormat('EEE')}
                            </Text>
                            <Text style={{ 
                                fontSize: 20, 
                                fontWeight: 'bold', 
                                color: selectedDate === item ? '#166534' : 'black' 
                            }}>
                                {date.toFormat('dd')}
                            </Text>
                            <Text style={{ 
                                fontSize: 16, 
                                color: selectedDate === item ? '#166534' : 'gray' 
                            }}>
                                {date.toFormat('MMM')}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    )
}