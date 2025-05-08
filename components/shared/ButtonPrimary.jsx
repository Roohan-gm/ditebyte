import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function ButtonPrimary({ title, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    height: 52,
    width:"100%",
    justifyContent: "center",
    backgroundColor: "#28efa8",
    padding: 8,
    borderRadius: 8,
    marginTop:15
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight:"bold",
  }
});