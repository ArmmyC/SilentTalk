import {
  View,
  StyleSheet,
  Platform,
  TextInput,
  Text,
  // We rename the core RN Pressable here, but we don't actually use it.
  Pressable as RNPressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  KeyboardStickyView,
  KeyboardAwareScrollView,
  KeyboardProvider,
} from "react-native-keyboard-controller";
// --- The correct import for Pressable from Gesture Handler ---
import {
  Pressable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import TextHolder from "./components/TextHolder.js";
import Footer from "./components/Footer.js";
import { Colors } from "./constants/settings.js";

const MOCK_BACKGROUND_COLOR = "#F0F4F8";
const PRIMARY_COLOR = "#007AFF";

const createNewInputBlock = () => ({
  id: Date.now().toString(),
  headerValue: "Example",
  contentValue: "",
});

// --- Screen Components ---

function ScreenContent() {
  // Initialize with one default block
  const [inputs, setInputs] = useState([createNewInputBlock()]);

  // Function to handle adding a new block
  const handleAddInputBlock = () => {
    // Adds the new block object to the beginning of the array (at the top of the list)
    setInputs((prevInputs) => [createNewInputBlock(), ...prevInputs]);
  };

  const handleDeleteInputBlock = (idToDelete) => {
    setInputs((prevInputs) =>
      prevInputs.filter((input) => input.id !== idToDelete)
    );
  };

  // Placeholder functions for handling nested input changes (for demonstration)
  const handleHeaderChange = (id, text) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, headerValue: text } : input
      )
    );
  };
  const handleContentChange = (id, text) => {
    // Logic to update the content value for the block with 'id'
    console.log(`Block ${id} Content changed to: ${text}`);
  };

  return (
    <SafeAreaView style={styles.root} edges={["top", "left", "right"]}>
      {/* 1. Main Scrollable Content Area */}
      <KeyboardAwareScrollView style={styles.content} bottomOffset={200}>
        <View style={styles.scrollContentWrapper}>
          {/* The Add Button (uses RNGH Pressable) - Rendered first to be at the bottom */}

          {inputs
            .map((input) => (
              <TextHolder
                key={input.id}
                id={input.id}
                headerValue={input.headerValue}
                onHeaderChange={handleHeaderChange}
                onContentChange={handleContentChange}
                onDelete={handleDeleteInputBlock}
              />
            ))
            .reverse()}
          {/* Render the dynamically created StructuredInputBlocks */}
          {/* Note: .reverse() is used here to make the blocks appear ABOVE the button 
              but still add the newest block to the beginning of the state array. */}
        </View>
      </KeyboardAwareScrollView>
      <Footer onAddBlock={handleAddInputBlock} />
    </SafeAreaView>
  );
}

// ----------------------------------------------------
// The App entry point which must contain the Provider
export default function App() {
  return (
    <GestureHandlerRootView>
      <KeyboardProvider>
        {/* The main content screen */}
        <ScreenContent />
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

// ----------------------------------------------------
// Styles
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
    paddingBottom: 50, // Ensures space at the bottom of the scroll view
    // Since we reversed the map order, we must ensure the button is at the bottom visually.
    flexDirection: "column-reverse", // Start rendering from the bottom
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 10,
    alignSelf: "flex-end", // Aligned to show content is reversed
    marginTop: 20,
  },
  subText: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 30,
    alignSelf: "flex-end", // Aligned to show content is reversed
  },
});
