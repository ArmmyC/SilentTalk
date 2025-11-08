import { Platform } from "react-native";

export const Colors = {
  background: "#f0f2f3ff",
  button: {
    addButton: "#78a5feff",
    addButtonText: "#ffffffff",
  },
  textHolder: {
    headerBackgroud: "#008adaff",
    headerText: "#272727ff",
    contentBackground: "#e1e1e1ff",
    contentText: "#181818ff",
  },

  test: "black",
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
});
