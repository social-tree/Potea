import { HeadingFive, ParagraphXL } from 'src/styles/utils/typography'

import styled from 'styled-components/native'

export const RecentSearchText = styled.Text`
  color: ${({ theme }) => theme.greyscale[300]};
  ${ParagraphXL}
`

export const RecentSearch = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
`

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.darkColors.dark3};
`

export const RecentTitle = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${HeadingFive}
`

export const RecentHeader = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const RecentContainer = styled.View`
  display: flex;
  gap: 24px;
`

export const Container = styled.View`
  padding: 0px 24px;
  display: flex;
  gap: 24px;
`
