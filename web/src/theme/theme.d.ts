import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      main: string
      mainRgba: Function
    }
    fontColors: {
      text: string
      textRgba: Function
    }
    backgroundColor: string
    navigationBackgroundColor: string
    panelBackgroundColor: string
    scrollbarBackgroundColor: string
    tableCellBackgroundColor: string
    bigCalendarCurrentDay: string
    hoverColor: string
    shadow1: string
    borderRadius: string
  }
}
