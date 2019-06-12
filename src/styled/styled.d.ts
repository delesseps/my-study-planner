import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      main: string;
    };
    fontColors: {
      black: string;
      blackRgba: Function;
    };
    backgroundColor: string;
    sidebarBackgroundColor: string;
  }
}
