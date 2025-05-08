import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from '@expo/vector-icons';

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.text}>{title}</Text>
      <AntDesign name="arrowright" size={30} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    height: 62,
    width:"100%",
    justifyContent: "space-around",
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