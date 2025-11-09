import { Platform } from "react-native";

export const Colors = {
  rootbackground: "#f0f2f3ff",
  FooterButton: {
    background: "#72b8ffff",
    addButton: "#ffffffff",
    ttsButton: "#ffffffff",
    forwardButton: "#ffffffff",
    backwardButton: "#ffffffff",
  },
  HeaderButton: {
    binBackground: "#ff0000ff",
    binButton: "#ffffffff",
    pencilBackground: "#78b7ffff",
    pencilButton: "#ffffffff",
    checkBackground: "#97f69dff",
    checkButton: "#ffffffff",
  },
  textHolder: {
    headerBackgroud: "#f6cb67ff",
    headerText: "#272727ff",
    contentBackground: "#eeeeeeff",
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

export const Sizes = {
  iconSize: {
    mainIcon: 36,
    sideIcon: 20,
    blockIcon: 16,
  },
  textSize: {
    content: 20,
    header: 16,
  },
};
