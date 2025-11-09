import { View, TextInput, StyleSheet } from "react-native";
import { Colors, Sizes, Fonts } from "../../constants/settings.js";
import { useState } from "react";

export default function Content({ isSelected }) {
  const [text, setText] = useState("");

  const contentInput = isSelected && (
    <TextInput
      style={styles.contentInput}
      placeholder={"Enter Text..."}
      onChangeText={setText}
      value={text}
      multiline={true}
      textAlignVertical="top"
      placeholderTextColor="#6B7280"
    />
  );

  return <View style={styles.content}>{contentInput}</View>;
}
const styles = StyleSheet.create({
  content: {
    backgroundColor: Colors.textHolder.contentBackground,
    paddingHorizontal: 10,
  },
  contentInput: {
    color: Colors.textHolder.contentText,
    fontFamily: Fonts.sans,
    fontSize: 20,
    minHeight: 150,
    textAlignVertical: "top",
    paddingVertical: 10,
  },
});
