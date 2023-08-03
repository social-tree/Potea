import {
  HeadingFour,
  ParagraphM,
  ParagraphXL,
} from 'src/styles/utils/typography'

import { Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'

export const ChevArrow = styled(Ionicons)`
  margin-left: auto;
`

export const ProfileOptionLabel = styled.Text<{ color?: string }>`
  ${ParagraphXL}
  color: ${({ theme, color }) => (color ? color : theme.other.white)}
`

export const ProfileOptionIcon = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`

export const ProfileOption = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`

export const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.darkColors.dark3};
`

export const Email = styled.Text`
  ${ParagraphM}
  color: ${({ theme }) => theme.other.white}
`

export const FullName = styled.Text`
  ${HeadingFour}
  color: ${({ theme }) => theme.other.white}
`

export const ProfilePreview = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`
