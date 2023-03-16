import { themeType } from 'src/styles/theme'

declare module 'styled-components/native' {
  export interface DefaultTheme extends themeType {}
}
