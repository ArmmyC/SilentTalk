import { useState, useRef, useEffect } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Sizes, Fonts } from "../../constants/settings.js";

export default function Header({
  id,
  headerText,
  contentText,
  onHeaderChange,
  onContentChange,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const HeaderInput = isEditing ? (
    <TextInput
      ref={headerInputRef}
      style={[styles.headerInput, styles.editableHeaderInput]}
      placeholder={"Enter Name..."}
      value={headerText}
      onChangeText={(text) => onHeaderChange(id, text)}
      onFocus={handleContentFocus}
      onBlur={handleHeaderInputBlur}
      placeholderTextColor={Colors.textHolder.headerText}
    />
  ) : (
    <Pressable style={{ flex: 1 }} onPress={handleEditPress}>
      <Text
        style={[styles.headerInput, styles.staticHeaderText]}
        numberOfLines={1}
      >
        {headerValue || "Enter Name..."}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.header}>
      {HeaderInput}

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
          size={Sizes.iconSize.blockIcon}
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
          size={Sizes.iconSize.blockIcon}
          color={isEditing ? "#D1D5DB" : "#FF3B30"}
        />
      </Pressable>
    </View>
  );
}
