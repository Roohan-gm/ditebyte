import { Text, TouchableOpacity, StyleSheet, View, ActivityIndicator } from "react-native";
import React from "react";

export default function Button({ title, onPress, loading = false, icon = null }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <View style={styles.content}>
          <Text style={styles.text}>{title}</Text>
          {icon && <View style={styles.icon}>{icon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    height: 52,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#28efa8",
    padding: 6,
    borderRadius: 8,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    marginLeft: 8, // Adjust spacing between icon and text
  },
});