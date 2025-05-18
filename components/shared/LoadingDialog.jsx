import { View, Text, Modal, ActivityIndicator } from 'react-native'
import React from 'react'

export default function LoadingDialog({ loading = false }) {
    return (
        <Modal transparent visible={loading} animationType="fade">
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: '#28efa8', padding: 25, borderRadius: 10, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="white" />
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, color: 'white' }}>Loading...</Text>
                </View>
            </View>
        </Modal>
    )
}