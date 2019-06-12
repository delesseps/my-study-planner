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
  sidebarBackgroundColor: "#F7F7F7"
};

export default theme;
