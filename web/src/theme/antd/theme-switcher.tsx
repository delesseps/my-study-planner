import React from 'react'

enum Status {
  idle = 'IDLE',
  loading = 'LOADING',
  loaded = 'LOADED',
}

interface IThemeSwitcherContext {
  currentTheme: string
  themes: Record<any, string>
  switcher: ({theme}: {theme: string}) => void
  status: Status
}

const ThemeSwitcherContext = React.createContext<
  IThemeSwitcherContext | undefined
>(undefined)

function findCommentNode(comment: string) {
  const head = document.head
  for (let i = 0; i < head.childNodes.length; i++) {
    const node = head.childNodes[i]
    if (node.nodeType === 8 && node?.nodeValue?.trim() === comment) {
      return node
    }
  }
  return null
}

function arrayToObject(array: string[]): Record<any, string> {
  const obj: Record<any, string> = {}
  array.forEach(el => (obj[el] = el))
  return obj
}

interface Props {
  themeMap: Record<any, string>
  insertionPoint: string
  children: React.ReactNode
  id?: string
  defaultTheme?: string
  attr?: string
}

export function ThemeSwitcherProvider({
  themeMap,
  insertionPoint,
  defaultTheme,
  id = 'theme-style',
  attr = 'data-theme',
  ...rest
}: Props) {
  const [status, setStatus] = React.useState<Status>(Status.idle)
  const [currentTheme, setCurrentTheme] = React.useState('')

  const insertStyle = React.useCallback(
    (linkElement: HTMLElement) => {
      const insertionPointElement = findCommentNode(insertionPoint)
      if (!insertionPointElement) {
        console.warn(
          'Insertion point does not exist. Be sure to add comment on head and that it matches with insertionPoint property',
        )
        return document.head.appendChild(linkElement)
      }

      const {parentNode} = insertionPointElement
      if (parentNode)
        parentNode.insertBefore(linkElement, insertionPointElement.nextSibling)
      else throw new Error('Insertion point is not in the DOM.')
    },
    [insertionPoint],
  )

  React.useEffect(() => {
    const themes = Object.keys(themeMap)
    themes.map(theme => {
      const themeAssetId = `theme-prefetch-${theme}`
      if (!document.getElementById(themeAssetId)) {
        const stylePrefetch = document.createElement('link')
        stylePrefetch.rel = 'prefetch'
        stylePrefetch.type = 'text/css'
        stylePrefetch.id = themeAssetId
        stylePrefetch.href = themeMap[theme]

        insertStyle(stylePrefetch)
      }
      return ''
    })
  }, [themeMap, insertStyle])

  const switcher = React.useCallback(
    ({theme}: {theme: string}) => {
      if (theme === currentTheme) return

      const previousStyle = document.getElementById(id)
      if (previousStyle) {
        previousStyle.remove()
      }

      if (themeMap[theme]) {
        setStatus(Status.loading)

        const linkElement = document.createElement('link')
        linkElement.type = 'text/css'
        linkElement.rel = 'stylesheet'
        linkElement.id = id
        linkElement.href = themeMap[theme]

        linkElement.onload = () => {
          setStatus(Status.loaded)
        }

        insertStyle(linkElement)
        setCurrentTheme(theme)
      } else {
        console.warn('Could not find specified theme')
      }

      document.body.setAttribute(attr, theme)
    },
    [themeMap, insertStyle, attr, id, currentTheme],
  )

  const value = React.useMemo(
    () => ({
      switcher,
      status,
      currentTheme,
      themes: arrayToObject(Object.keys(themeMap)),
    }),
    [switcher, status, currentTheme, themeMap],
  )

  return <ThemeSwitcherContext.Provider value={value} {...rest} />
}

export function useThemeSwitcher() {
  const context = React.useContext(ThemeSwitcherContext)
  if (!context) {
    throw new Error(
      'To use `useThemeSwitcher`, component must be within a ThemeSwitcherProvider',
    )
  }
  return context
}
