import React from "react";
import { StyleSheet, TextInput } from "react-native";

export default function Input({ placeholder, password = false, onChangeText }) {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.inputText}
      secureTextEntry={password}
      onChangeText={(value) => onChangeText(value)}
    />
  );
}

const styles = StyleSheet.create({
  inputText: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 20,
    width: "100%",
    marginTop: 15,
  },
});
