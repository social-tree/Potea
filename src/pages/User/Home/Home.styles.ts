import { HeadingFive, ParagraphL } from 'src/styles/utils/typography'

import { Input } from 'src/components/Form/Elements/Inputs/Input'
import { SearchInput } from 'src/components/Form/Elements/Inputs'
import styled from 'styled-components/native'

export const HideOnTrue = styled.View<{ hide?: boolean }>`
  display: ${({ hide }) => (hide ? 'none' : 'flex')};
`

export const TagsContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;
`

export const MostPopularTitle = styled.Text`
  ${HeadingFive}
  color: ${({ theme }) => theme.other.white}
`

export const MostPopularHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  padding: 24px 24px 0px 24px;
`

export const MostPopularContainer = styled.View`
  display: flex;
  gap: 24px;
`

export const GreenButton = styled.Text`
  color: ${({ theme }) => theme.primary[500]};
  ${ParagraphL}
`

export const SpecialOffersTitle = styled.Text`
  ${HeadingFive}
  color: ${({ theme }) => theme.other.white}
`

export const SpecialOffersHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 24px;
`

export const SpecialOffersContainer = styled.View`
  display: flex;
  gap: 24px;
  padding-top: 20px;
`

export const SearchContainer = styled.View`
  height: 96px;
  padding: 24px 24px 0px 24px;
`

export const WelcomeText = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${ParagraphL}
  font-weight: 300;
`

export const Username = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${HeadingFive};
`

export const ProfilePicture = styled.Image`
  height: 47px;
  width: 47px;
`

export const UserInfo = styled.View`
  display: flex;
  margin-right: auto;
`

export const HomeHeader = styled.View`
  height: 61px;
  display: flex;
  gap: 16px;
  flex-direction: row;
  align-items: center;
  padding: 14px 24px 0px 24px;
  background-color: ${({ theme }) => theme.darkColors.dark1};
`

export const Container = styled.View`
  display: flex;
`
