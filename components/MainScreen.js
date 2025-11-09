import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import TextHolder from "./content/TextHolder.js";
import Footer from "./footer/_Footer.js";
import { Colors } from "../constants/settings.js";

const createNewTextHolder = () => ({
  id: Date.now().toString(),
});

export default function MainScreen() {
  const [blocks, setBlocks] = useState([createNewTextHolder()]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);

  const handleSelectBlock = (id) => {
    if (selectedBlockId !== id) {
      setSelectedBlockId(id);
    } else {
      setSelectedBlockId(null);
    }
  };

  const handleAddTextHolder = () => {
    const newBlock = createNewTextHolder();
    setBlocks((prevInputs) => [newBlock, ...prevInputs]);
    setSelectedBlockId(newBlock.id);
  };

  const handleDeleteTextHolder = (idToDelete) => {
    setBlocks((prevInputs) =>
      prevInputs.filter((block) => block.id !== idToDelete)
    );
    setSelectedBlockId(null);
  };

  return (
    <SafeAreaView style={styles.root} edges={["top", "left", "right"]}>
      <KeyboardAwareScrollView style={styles.content} bottomOffset={200}>
        <View style={styles.scrollContentWrapper}>
          {blocks.map((block) => (
            <TextHolder
              key={block.id}
              id={block.id}
              onDelete={handleDeleteTextHolder}
              isSelected={block.id === selectedBlockId}
              onSelect={handleSelectBlock}
            />
          ))}
        </View>
      </KeyboardAwareScrollView>
      <Footer
        onAddBlock={handleAddTextHolder}
        isSelecting={selectedBlockId !== null}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.rootbackground,
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
