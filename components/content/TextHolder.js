import { useState, useRef, useEffect } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/settings.js";

export default function TextHolder({
  id,
  headerText,
  contentText,
  onHeaderChange,
  onContentChange,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const blockRef = useRef(null);

  useEffect(() => {
    if (isEditing && blockRef.current) {
      blockRef.current.focus();
      setIsFocused(true);
    }
  }, [isEditing]);

  const handleHeaderInputBlur = () => {
    setIsEditing(false);
    setIsFocused(false);
  };

  const handleEditPress = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleContentFocus = () => setIsFocused(true);
  const handleContentBlur = () => setIsFocused(false);

  // The Header Element rendered conditionally
  const HeaderElement = isEditing ? (
    // EDIT MODE: Render TextInput
    <TextInput
      ref={blockRef}
      style={[styles.headerInput, styles.editableHeaderInput]}
      placeholder={"Enter Name..."}
      value={headerText}
      onChangeText={(text) => onHeaderChange(id, text)}
      onFocus={handleContentFocus} // Highlight on focus
      onBlur={handleHeaderInputBlur} // <-- Switch back to View mode and remove highlight on blur
      placeholderTextColor={Colors.textHolder.headerText}
    />
  ) : (
    // VIEW MODE: Render static Text
    // This Text is wrapped in a Pressable to simulate clicking to edit if needed
    <Pressable style={{ flex: 1 }} onPress={handleEditPress}>
      <Text
        style={[styles.headerInput, styles.staticHeaderText]}
        numberOfLines={1}
      >
        {headerText || "Enter Name..."}
      </Text>
    </Pressable>
  );

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.containerFocused, // <-- Apply focused style
      ]}
    >
      <View style={styles.header}>
        {HeaderElement}

        {/* Pencil/Edit Button */}
        <Pressable
          onPress={handleEditPress}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && { opacity: 0.75 },
          ]}
        >
          <MaterialCommunityIcons
            name={isEditing ? "check" : "pencil-outline"}
            size={20}
            color={isEditing ? "#4CD964" : "#007AFF"}
          />
        </Pressable>

        {/* Delete Button */}
        <Pressable
          onPress={() => onDelete(id)}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && { opacity: 0.75 },
          ]}
          disabled={isEditing}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={20}
            color={isEditing ? "#D1D5DB" : "#FF3B30"}
          />
        </Pressable>
      </View>
      <View style={styles.content}>
        <TextInput
          style={styles.contentInput}
          placeholder={"Enter Text..."}
          onChangeText={(text) => onContentChange(id, text)}
          value={contentText}
          onFocus={handleContentFocus} // <-- Highlight on focus
          onBlur={handleContentBlur} // <-- Remove highlight on blur
          multiline={true}
          textAlignVertical="top"
          placeholderTextColor="#6B7280"
        />
      </View>
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
  // Style applied when the block is focused/selected
  containerFocused: {
    borderColor: "#000000", // Bright blue border
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    backgroundColor: Colors.textHolder.headerBackgroud,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
  },
  headerInput: {
    fontSize: 14,
    fontWeight: "600",
    paddingVertical: 10,
    marginRight: 10,
  },
  staticHeaderText: {
    color: Colors.textHolder.headerText,
  },
  editableHeaderInput: {
    color: Colors.textHolder.headerText,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingVertical: 9,
  },
  content: {
    backgroundColor: Colors.textHolder.contentBackground,
    paddingHorizontal: 10,
  },
  contentInput: {
    color: Colors.textHolder.contentText,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
    paddingVertical: 10,
  },
  actionButton: {
    padding: 5,
    marginLeft: 5,
  },
});
