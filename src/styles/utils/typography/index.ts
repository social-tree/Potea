import {
  HeadingFontSize,
  IHeadingProps,
  IParagraphProps,
  ParagraphFontSize,
} from './typography.types'

import { css } from 'styled-components'

const primaryHeadingStyles = css`
  font-weight: 700;
  line-height: 120%;
`

export const generateHeading = ({ size, color }: IHeadingProps) => {
  return css`
    font-size: ${HeadingFontSize[size]};
    ${primaryHeadingStyles};
    color: ${color};
  `
}

const primaryParagraphStyles = css`
  line-height: 140%;
  letter-spacing: 0.2px;
`

export const generateParagraph = ({
  fontWeight,
  size,
  color,
}: IParagraphProps) => {
  return css`
    font-weight: ${fontWeight};
    font-size: ${ParagraphFontSize[size]};
    color: ${color};
    ${primaryParagraphStyles}
  `
}
