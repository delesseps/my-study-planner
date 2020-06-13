import themeSwitcher from 'theme-switcher'

const {switcher, getTheme} = themeSwitcher({
  themeMap: {
    dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
    light: `${process.env.PUBLIC_URL}/light-theme.css`,
  },
})

export {switcher, getTheme}
