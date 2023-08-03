import { HeadingFive, ParagraphM } from 'src/styles/utils/typography'

import styled from 'styled-components/native'

export const Desc = styled.Text`
  ${ParagraphM}

  color: ${({ theme }) => theme.greyscale[400]}
`

export const Title = styled.Text`
  ${HeadingFive}
  color: ${({ theme }) => theme.other.white}
`
