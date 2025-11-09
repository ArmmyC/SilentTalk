import { View, StyleSheet } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { Colors, Sizes } from "../../constants/settings.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AddButton({ onAddBlock }) {
  return (
    <View style={styles.footer}>
      <Pressable
        onPress={onAddBlock}
        style={({ pressed }) => [
          styles.actionButton,
          styles.mainButton,
          pressed && { opacity: 0.75 },
        ]}
      >
        <MaterialCommunityIcons
          name={"plus"}
          size={Sizes.iconSize.mainIcon}
          color={Colors.button.addButton}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  actionButton: {
    backgroundColor: Colors.button.background,
    shadowColor: Colors.button.background,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 5,
  },
  mainButton: {
    width: Sizes.iconSize.mainIcon + 20,
    height: Sizes.iconSize.mainIcon + 20,
  },
  sideButton: {
    width: Sizes.iconSize.sideIcon + 20,
    height: Sizes.iconSize.sideIcon + 20,
  },
});
