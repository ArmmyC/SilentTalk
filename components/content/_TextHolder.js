import { View, StyleSheet } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { Colors } from "../../constants/settings.js";
import Header from "./HeaderElement.js";
import Content from "./ContentElement.js";

export default function TextHolder({
  id,
  onDelete,
  isSelected,
  onSelect,
  contentText,
  onChangeContent,
  isEditing,
  onSetEditingId,
  onStopTTS,
  highlightPosition,
  isTTSSpeaking,
}) {
  return (
    <View style={[styles.container, isSelected && styles.containerFocused]}>
      <Pressable
        onPress={() => {
          onSelect(id);
        }}
      >
        <Header
          id={id}
          onDelete={onDelete}
          isSelected={isSelected}
          isEditing={isEditing}
          onSetEditingId={onSetEditingId}
          onStopTTS={onStopTTS}
        />
        <Content
          id={id}
          isSelected={isSelected}
          text={contentText}
          setText={onChangeContent}
          highlightPosition={highlightPosition}
          isTTSSpeaking={isTTSSpeaking}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.textHolder.contentBackground,
    borderRadius: 10,
    marginBottom: 25,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  containerFocused: {
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
});
