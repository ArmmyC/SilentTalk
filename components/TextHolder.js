import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../constants/settings.js";

export default function TextHolder({
  id,
  // We need to pass the current value for the header to display it when not editing
  headerValue,
  onHeaderChange,
  onContentChange,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const headerInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && headerInputRef.current) {
      headerInputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditPress = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const HeaderElement = isEditing ? (
    <TextInput
      ref={headerInputRef}
      style={[styles.headerInput, styles.editableHeaderInput]}
      placeholder={"Enter Name..."}
      value={headerValue}
      onChangeText={(text) => onHeaderChange(id, text)}
      onBlur={handleInputBlur}
      placeholderTextColor={Colors.textHolder.headerText}
    />
  ) : (
    <Text
      style={[styles.headerInput, styles.staticHeaderText]}
      numberOfLines={1}
    >
      {headerValue}
    </Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {HeaderElement}

        <View style={styles.buttonContainer}>
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
              color={isEditing ? "#4CD964" : "#000000ff"}
            />
          </Pressable>

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
      </View>
      <View style={styles.content}>
        <TextInput
          style={styles.contentInput}
          placeholder={"Enter Text..."}
          onChangeText={(text) => onContentChange(id, text)}
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
    borderColor: "transparent",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  header: {
    backgroundColor: Colors.textHolder.headerBackgroud,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    paddingVertical: 10,
  },
  staticHeaderText: {
    color: Colors.textHolder.headerText,
  },
  editableHeaderInput: {
    color: Colors.textHolder.headerText,
  },
  content: {
    backgroundColor: Colors.textHolder.contentBackground,
    paddingHorizontal: 10,
  },
  contentInput: {
    color: Colors.textHolder.contentText,
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: "top",
    paddingVertical: 10,
  },
  actionButton: {
    padding: 5,
    marginLeft: 5,
  },
});
