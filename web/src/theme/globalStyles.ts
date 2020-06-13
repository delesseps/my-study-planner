import {createGlobalStyle} from 'styled-components'

import {IUserConfig} from 'constants/interfaces'
import breakpoints from './breakpoints'

const GlobalStyle = createGlobalStyle<{config?: IUserConfig}>`
  * {
    margin: 0; 
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%; /*1rem = 10px*/
    box-sizing: border-box;

    @media only screen and (max-width: ${breakpoints.bpLargest}) {
      font-size: 50%;
    }
  }  

  body {
    font-size: 1.4rem;      
    background-color: ${props => props.theme.backgroundColor};    
    color: ${props => props.theme.fontColors.textRgba(0.65)};      

    @media only screen and (max-width: ${breakpoints.bpMobileL}) {
      #appzi-launch-button-dba9fa3a-fe42-4320-8ea4-78392d421de8  {
        bottom: 60px;     
        right: 10px;    
      } 

      .ant-calendar-input  {
        display: none
      }
    }

    @media only screen and (max-width: ${breakpoints.bpMedium}) {
      #appzi-launch-button-dba9fa3a-fe42-4320-8ea4-78392d421de8  {
        bottom: 70px;     
        right: 10px;    
      } 
    }

    /*REACT-BIG-CALENDAR OVERRIDES*/
    & .rbc-today {
      background-color: ${props => props.theme.bigCalendarCurrentDay};
    }

    & .rbc-toolbar .rbc-btn-group .rbc-active {      
      color: ${props => props.theme.colors.main}; 

      &:hover, &:focus {
        color: ${props => props.theme.colors.main}; 
      }
    }

    & .rbc-toolbar button {
      color: ${props => props.theme.fontColors.textRgba(0.85)};
    }
  }

  *::-webkit-scrollbar {
    background-color: ${props => props.theme.scrollbarBackgroundColor};
    width:14px
  }
  
  *::-webkit-scrollbar-track {
    background-color: ${props => props.theme.scrollbarBackgroundColor};
  }

 
  *::-webkit-scrollbar-thumb {
    background-color:#babac0;
    border-radius:16px;
    border:4px solid ${props => props.theme.scrollbarBackgroundColor}
  }

  *::-webkit-scrollbar-button {display:none}  
`

export default GlobalStyle
