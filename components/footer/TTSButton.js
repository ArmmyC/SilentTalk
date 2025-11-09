import { View, StyleSheet } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { Colors, Sizes } from "../../constants/settings.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

export default function TTSButton() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPress = () => {
    setIsPlaying(!isPlaying);
    console.log({ isPlaying });
  };

  return (
    <View style={styles.footer}>
      <Pressable
        onPress={() => {}}
        style={({ pressed }) => [
          styles.actionButton,
          styles.sideButton,

          pressed && { opacity: 0.75 },
        ]}
      >
        <MaterialCommunityIcons
          name={"step-backward"}
          size={Sizes.iconSize.sideIcon}
          color={Colors.FooterButton.backwardButton}
        />
      </Pressable>
      <Pressable
        onPress={handlePlayPress}
        style={({ pressed }) => [
          styles.actionButton,
          styles.mainButton,
          pressed && { opacity: 0.75 },
        ]}
      >
        <MaterialCommunityIcons
          name={isPlaying ? "pause" : "volume-high"}
          size={Sizes.iconSize.mainIcon}
          color={Colors.FooterButton.ttsButton}
        />
      </Pressable>
      <Pressable
        onPress={() => {}}
        style={({ pressed }) => [
          styles.actionButton,
          styles.sideButton,
          pressed && { opacity: 0.75 },
        ]}
      >
        <MaterialCommunityIcons
          name={"step-forward"}
          size={Sizes.iconSize.sideIcon}
          color={Colors.FooterButton.forwardButton}
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
    backgroundColor: Colors.FooterButton.background,
    shadowColor: Colors.FooterButton.background,
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
