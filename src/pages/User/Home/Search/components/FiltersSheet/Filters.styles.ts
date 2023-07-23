import {
  HeadingFour,
  HeadingSix,
  ParagraphL,
} from 'src/styles/utils/typography'

import { Slider } from '@miblanchard/react-native-slider'
import styled from 'styled-components/native'

export const ButtonText = styled.Text`
  ${ParagraphL}
  color: ${({ theme }) => theme.other.white};
`

export const ResetFiltersButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.darkColors.dark3};
  flex: 1;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`

export const SubmitButton = styled(ResetFiltersButton)`
  background-color: ${({ theme }) => theme.primary[500]};
`

export const SubmitContainer = styled.View`
  margin: 0px 24px;
  border-style: solid;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.darkColors.dark3};
  display: flex;
  flex-direction: row;
  padding-top: 24px;
  gap: 12px;
`

export const RatingText = styled.Text`
  color: ${({ theme }) => theme.other.white};
`

export const RatingChipContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const PriceRangeDesc = styled.Text<{ value: number }>`
  color: ${({ theme }) => theme.other.white};
  margin-left: ${({ value }) =>
    value < 10 ? '15px' : value < 100 ? '10px' : '6px'};
  margin-top: -24px;
`

export const StyledSlider = styled(Slider)``

export const FilterTitle = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${HeadingSix}
  margin: 0px 24px 0px 24px;
`

export const FiltersTitle = styled.Text`
  padding: 9px 0px 24px 0px;
  color: ${({ theme }) => theme.other.white};
  ${HeadingFour}
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.darkColors.dark3};
  text-align: center;
  margin: 0px 24px 0px 24px;
`

export const FilterContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 24px;
`
