import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import TextHolder from "./content/_TextHolder.js";
import Footer from "./footer/_Footer.js";
import { Colors } from "../constants/settings.js";
import * as Speech from "expo-speech";

const createNewTextHolder = () => ({
  id: Date.now().toString(),
  contentText: "",
});

export default function MainScreen() {
  const [blocks, setBlocks] = useState([createNewTextHolder()]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [editingBlockId, setEditingBlockId] = useState(null);
  const [stopTTSHandler, setStopTTSHandler] = useState(() => {});

  const isAnyBlockEditing = editingBlockId !== null;
  const selectedBlock = blocks.find((block) => block.id === selectedBlockId);
  const ttsText = selectedBlock ? selectedBlock.contentText : "";

  const handleSetEditingId = (id) => {
    setEditingBlockId(id);
  };

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

  const handleChangeContent = (idToChange, newText) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === idToChange ? { ...block, contentText: newText } : block
      )
    );
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
              contentText={block.contentText}
              onChangeContent={handleChangeContent}
              isEditing={block.id === editingBlockId}
              onSetEditingId={handleSetEditingId}
              stopTTS={stopTTSHandler}
            />
          ))}
        </View>
      </KeyboardAwareScrollView>
      <Footer
        onAddBlock={handleAddTextHolder}
        isSelecting={selectedBlockId !== null}
        ttsText={ttsText}
        isAnyBlockEditing={isAnyBlockEditing}
        setStopTTS={setStopTTSHandler}
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
