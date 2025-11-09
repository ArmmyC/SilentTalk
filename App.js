import { KeyboardProvider } from "react-native-keyboard-controller";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainScreen from "./components/MainScreen.js";

export default function App() {
  return (
    <GestureHandlerRootView>
      <KeyboardProvider>
        <MainScreen />
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
