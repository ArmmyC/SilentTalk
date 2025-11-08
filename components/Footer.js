import { View, StyleSheet, TextInput, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { Pressable } from "react-native-gesture-handler";
import { Colors } from "../constants/settings.js";

export default function Footer({ onAddBlock }) {
  return (
    <KeyboardStickyView style={styles.footerSticky}>
      <SafeAreaView edges={["bottom"]} style={styles.footerSafe}>
        <View style={styles.footer}>
          <Pressable
            onPress={onAddBlock}
            style={({ pressed }) => [
              styles.addButton,
              pressed && { opacity: 0.75 },
            ]}
          >
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardStickyView>
  );
}

const styles = StyleSheet.create({
  footerSticky: {
    backgroundColor: "transparent",
  },
  footerSafe: {
    backgroundColor: "transparent",
  },
  footer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  addButton: {
    backgroundColor: Colors.button.addButton,
    shadowColor: Colors.button.addButton,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  addButtonText: {
    color: Colors.button.addButtonText,
    fontSize: 36,
    lineHeight: 38,
    fontWeight: "300",
  },
});
