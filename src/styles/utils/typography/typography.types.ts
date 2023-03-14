import { CSSObject } from 'styled-components'

export enum HeadingFontSize {
  H1 = 48,
  H2 = 40,
  H3 = 32,
  H4 = 24,
  H5 = 20,
  H6 = 18,
}

export interface IHeadingProps {
  size: HeadingFontSize
  color: string
}

export enum ParagraphFontSize {
  xlarge = 18,
  large = 16,
  medium = 14,
  small = 12,
  xsmall = 10,
}

export interface IParagraphProps {
  fontWeight: number
  color: string
  size: ParagraphFontSize
}
