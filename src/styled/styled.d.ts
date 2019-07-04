import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      main: string;
    };
    fontColors: {
      text: string;
      textRgba: Function;
    };
    backgroundColor: string;
    sidebarBackgroundColor: string;
    panelBackgroundColor: string;
    scrollbarBackgroundColor: string;
    bigCalendarCurrentDay: string;
    shadow1: string;
  }
}
