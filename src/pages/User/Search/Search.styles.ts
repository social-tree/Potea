import {
  HeadingFive,
  HeadingFour,
  HeadingSix,
  ParagraphXL,
} from 'src/styles/utils/typography'

import styled from 'styled-components/native'

export const NothingFoundDesc = styled.Text`
  ${ParagraphXL}
  color: ${({ theme }) => theme.other.white};
  text-align: center;
`

export const NothingFoundTitle = styled.Text`
  ${HeadingFour}
  color: ${({ theme }) => theme.other.white};
`

export const NothingFoundInfo = styled.View`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const NothingFoundContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 124px;
  gap: 40px;
`

export const SearchText = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${HeadingFive}
`

export const ResultsHeader = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const ResultsContainer = styled.View`
  display: flex;
  gap: 24px;
  height: 100%;
`

export const LoadingContainer = styled.View`
  display: flex;
  width: 100%;
  margin-top: 124px;
  align-items: center;
  justify-content: center;
`

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
  flex: 1;
  padding-bottom: 25px;
`

export const Container = styled.View`
  padding: 0px 24px;
  display: flex;
  gap: 24px;
  flex: 1;
`
