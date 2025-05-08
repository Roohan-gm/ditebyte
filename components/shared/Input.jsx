import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Input({ placeholder, password = false, onChangeText, label = '' }) {
  return (
    <View style={{ marginTop: 15, width: "100%" }}>
      {label ? <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{label}</Text> : null}
      <TextInput
        placeholder={placeholder}
        style={styles.inputText}
        secureTextEntry={password}
        onChangeText={(value) => onChangeText(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputText: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 20,
    width: "100%",
    marginTop: 2,
  },
});
