import { useState, useRef, useEffect } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Sizes, Fonts } from "../../constants/settings.js";

const MAX_LENGTH = 30;

export default function Header({ id, onDelete, isSelected }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("PlaceHolder");
  const headerRef = useRef(null);

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (isSelected === false) {
      setIsEditing(false);
    }
  }, [isSelected]);

  setTimeout(() => {
    if (isEditing && headerRef.current) {
      headerRef.current.focus();
    }
  }, 50);

  const HeaderInput = isEditing ? (
    <TextInput
      ref={headerRef}
      style={[styles.headerInput, styles.editableHeaderInput]}
      placeholder={"Enter Name..."}
      value={text}
      numberOfLines={1}
      maxLength={MAX_LENGTH}
      onChangeText={setText}
      placeholderTextColor={Colors.textHolder.headerText}
    />
  ) : (
    <Text
      style={[styles.headerInput, styles.staticHeaderText]}
      numberOfLines={1}
      maxLength={MAX_LENGTH}
    >
      {text || "PlaceHolder"}
    </Text>
  );

  const HeaderButton = isSelected && (
    <View style={styles.headerButton}>
      <Pressable
        onPress={handleEditPress}
        style={({ pressed }) => [
          styles.actionButton,
          isEditing ? styles.checkButton : styles.pencilButton,
          pressed && { opacity: 0.75 },
        ]}
      >
        <MaterialCommunityIcons
          name={isEditing ? "check" : "pencil-outline"}
          size={Sizes.iconSize.blockIcon}
          color={
            isEditing
              ? Colors.HeaderButton.checkButton
              : Colors.HeaderButton.pencilButton
          }
        />
      </Pressable>
      <Pressable
        onPress={() => onDelete(id)}
        style={({ pressed }) => [
          styles.actionButton,
          styles.binButton,
          pressed && { opacity: 0.75 },
        ]}
        disabled={isEditing}
      >
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={Sizes.iconSize.blockIcon}
          color={isEditing ? "#D1D5DB" : Colors.HeaderButton.binButton}
        />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.header}>
      {HeaderInput}
      {HeaderButton}
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.textHolder.headerBackgroud,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerInput: {
    fontFamily: Fonts.sans,
    fontSize: Sizes.textSize.header,
    flex: 1,
    fontWeight: "600",
    paddingVertical: 10,
  },
  headerButton: {
    flexDirection: "row",
  },
  staticHeaderText: {
    color: Colors.textHolder.headerText,
  },
  editableHeaderInput: {
    color: Colors.textHolder.headerText,
  },
  actionButton: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    width: Sizes.iconSize.blockIcon + 10,
    height: Sizes.iconSize.blockIcon + 10,
  },
  binButton: { backgroundColor: Colors.HeaderButton.binBackground },
  pencilButton: { backgroundColor: Colors.HeaderButton.pencilBackground },
  checkButton: { backgroundColor: Colors.HeaderButton.checkBackground },
});
