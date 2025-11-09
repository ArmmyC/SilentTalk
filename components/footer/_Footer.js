import { StyleSheet, Pressable as PressableRN } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import TTSButton from "./TTSButton.js";
import AddButton from "./AddButton.js";

export default function Footer({
  onAddBlock,
  isSelecting,
  ttsText,
  isAnyBlockEditing,
  setStopTTS,
}) {
  const ButtonElement = isSelecting ? (
    <TTSButton
      ttsText={ttsText}
      isAnyBlockEditing={isAnyBlockEditing}
      setStopTTS={setStopTTS}
    />
  ) : (
    <AddButton onAddBlock={onAddBlock} />
  );

  return (
    <KeyboardStickyView style={styles.footerSticky}>
      <SafeAreaView edges={["bottom"]} style={styles.footerSafe}>
        {ButtonElement}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
