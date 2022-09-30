import { extendTheme, theme as baseTheme } from '@chakra-ui/react'
import * as components from './components'
import * as foundations from './foundations'


const overrides = {
  ...foundations,
  components: { ...components },
  colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
  space: {
    '4.5': '1.125rem',
  },
}
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
  cssVarPrefix: "coffeeclass-io",
}
export const customTheme: Record<string, any> = extendTheme(overrides,config)
