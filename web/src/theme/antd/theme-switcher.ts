interface Config {
  themeMap: Record<any, string>
  insertionPoint: string
  id?: string
  defaultTheme?: string
  attr?: string
}

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

function themeSwitcher({
  themeMap,
  insertionPoint,
  defaultTheme,
  id = 'theme-style',
  attr = 'data-theme',
}: Config) {
  if (!themeMap) {
    throw new Error('You must include a themeMap with your themes')
  }

  if (!insertionPoint) {
    throw new Error('You must provide an insertionPoint')
  }

  if (defaultTheme) {
    switcher({theme: defaultTheme})
  }

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

  function insertStyle(linkElement: HTMLElement) {
    const insertionPointElement = findCommentNode(insertionPoint)
    if (!insertionPointElement) {
      throw new Error(
        'Insertion point does not exist. Be sure to add comment on head and that it matches with insertionPoint property',
      )
    }

    const {parentNode} = insertionPointElement
    if (parentNode)
      parentNode.insertBefore(linkElement, insertionPointElement.nextSibling)
    else throw new Error('Insertion point is not in the DOM.')
  }

  function switcher({theme}: {theme: string}) {
    const previousStyle = document.getElementById(id)
    if (previousStyle) {
      previousStyle.remove()
    }

    if (themeMap[theme]) {
      const linkElement = document.createElement('link')
      linkElement.type = 'text/css'
      linkElement.rel = 'stylesheet'
      linkElement.id = id
      linkElement.href = themeMap[theme]

      insertStyle(linkElement)
    } else {
      console.warn('Could not find specified theme')
    }

    document.body.setAttribute(attr, theme)
  }

  return {switcher}
}

const {switcher} = themeSwitcher({
  themeMap: {
    dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
    light: `${process.env.PUBLIC_URL}/light-theme.css`,
  },
  insertionPoint: 'theme-insertion-point',
})

export {switcher}
