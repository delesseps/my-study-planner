import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    main: "#00ADB5"
  },
  fontColors: {
    black: "#272727",
    blackRgba: (alpha: number): string => `rgba(39, 39, 39, ${alpha})`
  },
  backgroundColor: "#FAFAFA",
  sidebarBackgroundColor: "#F7F7F7",
  shadow1: "0px 4px 12px rgba(0, 0, 0, 0.1);"
};

export default theme;
