import {
  HeadingFive,
  ParagraphL,
  ParagraphXL,
} from 'src/styles/utils/typography'

import styled from 'styled-components/native'

export const NoOrdersDesc = styled.Text`
  ${ParagraphL}
  color: ${({ theme }) => theme.other.white}
`

export const NoOrdersTitle = styled.Text`
  ${HeadingFive}
  color: ${({ theme }) => theme.other.white}
`

export const NoOrdersInfo = styled.View`
  display: flex;
  gap: 12px;

  align-items: center;
  justify-content: center;
`

export const NoOrdersContainer = styled.View`
  height: 100%;
  display: flex;
  padding-top: 128px;
  align-items: center;
  gap: 48px;
`

export const TopNavText = styled.Text<{ selected: boolean }>`
  color: ${({ theme, selected }) =>
    selected ? theme.primary[500] : theme.greyscale[700]};
  ${ParagraphXL}
`

export const TopNavItem = styled.TouchableOpacity<{ selected: boolean }>`
  flex: 1;
  padding: 12px;
  display: flex;
  align-items: center;
  border-bottom-width: 4px;
  border-bottom-color: ${({ theme, selected }) =>
    selected ? theme.primary[500] : theme.darkColors.dark3};
`

export const TopNavContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 0px 24px;
`

export const Container = styled.FlatList``
