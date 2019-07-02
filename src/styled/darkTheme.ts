import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    main: "#00ADB5"
  },
  fontColors: {
    black: "#fff",
    blackRgba: (alpha: number): string => `rgba(255, 255, 255, ${alpha})`
  },
  backgroundColor: "#303030",
  sidebarBackgroundColor: "#424242",
  panelBackgroundColor: "#424242",
  shadow1: "0px 4px 12px rgba(0, 0, 0, 0.1);"
};

export default theme;
