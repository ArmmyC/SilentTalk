import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import TextHolder from "./content/TextHolder.js";
import Footer from "./footer/_Footer.js";
import { Colors } from "../constants/settings.js";

const createNewTextHolder = () => ({
  id: Date.now().toString(),
  headerText: "PlaceHolder",
  contentText: "",
});
const createFirstTextHolder = () => ({
  id: Date.now().toString(),
  headerText: "Example",
  contentText: "Hello, my name is Rachel!",
});

export default function MainScreen() {
  const [blocks, setBlocks] = useState([createFirstTextHolder()]);

  const handleAddTextHolder = () => {
    setBlocks((prevInputs) => [createNewTextHolder(), ...prevInputs]);
  };

  const handleDeleteTextHolder = (idToDelete) => {
    setBlocks((prevInputs) =>
      prevInputs.filter((block) => block.id !== idToDelete)
    );
  };

  const handleHeaderChange = (id, text) => {
    setBlocks((prevInputs) =>
      prevInputs.map((block) =>
        block.id === id ? { ...block, headerText: text } : input
      )
    );
  };
  const handleContentChange = (id, text) => {
    console.log(`Block ${id} Content changed to: ${text}`);
  };

  return (
    <SafeAreaView style={styles.root} edges={["top", "left", "right"]}>
      <KeyboardAwareScrollView style={styles.content} bottomOffset={200}>
        <View style={styles.scrollContentWrapper}>
          {blocks.map((block) => (
            <TextHolder
              key={block.id}
              id={block.id}
              headerText={block.headerText}
              contentText={block.contentText}
              onHeaderChange={handleHeaderChange}
              onContentChange={handleContentChange}
              onDelete={handleDeleteTextHolder}
            />
          ))}
        </View>
      </KeyboardAwareScrollView>
      <Footer onAddBlock={handleAddTextHolder} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContentWrapper: {
    padding: 20,
    paddingBottom: 50,
    flexDirection: "column-reverse",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 10,
    alignSelf: "flex-end",
    marginTop: 20,
  },
  subText: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 30,
    alignSelf: "flex-end",
  },
});
