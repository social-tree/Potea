import { Input } from 'src/components/Form/Elements/Input'
import { HeadingFive, ParagraphL } from 'src/styles/utils/typography'
import styled from 'styled-components/native'

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
`

export const MostPopularContainer = styled.View`
  display: flex;
  gap: 24px;
`

export const SeeAllButton = styled.Text`
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
`

export const SpecialOffersContainer = styled.View`
  display: flex;
  gap: 24px;
`

export const SearchInput = styled(Input)`
  max-height: 56px !important;
  height: 56px !important;
`

export const WelcomeText = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${ParagraphL}
  font-weight: 300;
`

export const Username = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${HeadingFive}
`

export const ProfilePicture = styled.Image`
  height: 48px;
  width: 48px;
`

export const UserInfo = styled.View`
  display: flex;
  margin-right: auto;
`

export const HomeHeader = styled.View`
  height: 50px;
  margin-top: 14px;
  display: flex;
  gap: 16px;
  flex-direction: row;
  align-items: center;
`

export const Container = styled.View`
  padding: 0px 24px;
  display: flex;
  gap: 24px;
`
