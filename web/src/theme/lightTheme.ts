import {DefaultTheme} from 'styled-components'

const theme: DefaultTheme = {
  colors: {
    main: '#00ADB5',
    mainRgba: (alpha: number): string => `rgba(0, 173, 181, ${alpha})`,
  },
  fontColors: {
    text: '#272727',
    textRgba: (alpha: number): string => `rgba(39, 39, 39, ${alpha})`,
  },
  backgroundColor: '#FAFAFA',
  navigationBackgroundColor: '#fff',
  panelBackgroundColor: '#fff',
  scrollbarBackgroundColor: '#fff',
  tableCellBackgroundColor: '#fff',
  bigCalendarCurrentDay: '#eaf6ff',
  hoverColor: '#dcf5f2',
  shadow1: '0px 4px 12px rgba(0, 0, 0, 0.05);',
  borderRadius: '4px',
}

export default theme
