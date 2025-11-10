import { View, TextInput, StyleSheet, Text } from "react-native"; // <-- Make sure to import Text
import { Colors, Sizes, Fonts } from "../../constants/settings.js";

export default function Content({
  id,
  isSelected,
  text,
  setText,
  highlightPosition,
  isTTSSpeaking,
}) {
  const getHighlightedText = () => {
    if (!highlightPosition || !text) {
      return (
        <Text style={[styles.contentInput, styles.normalText]}>
          {text || "Enter Text..."}
        </Text>
      );
    }

    const spokenText = text.substring(0, highlightPosition);
    const upcomingText = text.substring(highlightPosition);

    return (
      <Text style={[styles.contentInput, styles.normalText]}>
        <Text style={[styles.contentInput, styles.highlightedText]}>
          {spokenText}
        </Text>
        {upcomingText}
      </Text>
    );
  };

  return (
    <View style={styles.content}>
      {isSelected &&
        (!isTTSSpeaking ? (
          <TextInput
            style={styles.contentInput}
            placeholder={"Enter Text..."}
            onChangeText={(newText) => setText(id, newText)}
            value={text}
            multiline={true}
            textAlignVertical="top"
            placeholderTextColor="#6B7280"
            autoFocus={true}
          />
        ) : (
          getHighlightedText()
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: Colors.textHolder.contentBackground,
    paddingHorizontal: 10,
  },
  contentInput: {
    color: Colors.textHolder.contentText,
    fontFamily: Fonts.sans,
    fontSize: Sizes.textSize.content,
    minHeight: 150,
    textAlignVertical: "top",
    paddingVertical: 10,
  },
  normalText: {
    color: "#333",
    lineHeight: 26,
  },
  highlightedText: {
    backgroundColor: "yellow",
    color: "#000",
    fontWeight: "bold",
  },
});
