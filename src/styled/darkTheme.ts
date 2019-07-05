import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    main: "#00ADB5"
  },
  fontColors: {
    text: "#fff",
    textRgba: (alpha: number): string => `rgba(255, 255, 255, ${alpha})`
  },
  backgroundColor: "#424242",
  sidebarBackgroundColor: "#303030",
  panelBackgroundColor: "#303030",
  scrollbarBackgroundColor: "#303030",
  bigCalendarCurrentDay: "#6f6c6c",
  hoverColor: "rgba(0, 173, 181, 0.60)",
  shadow1: "0px 4px 12px rgba(0, 0, 0, 0.1);"
};

export default theme;
