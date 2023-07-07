import {
  HeadingFive,
  HeadingSix,
  ParagraphM,
} from 'src/styles/utils/typography'

import styled from 'styled-components/native'

export const ShippingTypePrice = styled.Text`
  margin-left: auto;
  ${HeadingFive}
  color: ${({ theme }) => theme.primary[500]};
  padding: 0px;
`

export const ShippingTypeDesc = styled.Text`
  ${ParagraphM}
  color: ${({ theme }) => theme.other.white};
`

export const ShippingTypeTitle = styled.Text`
  ${HeadingSix}
  color: ${({ theme }) => theme.other.white}
`

export const ShippingTypeInfo = styled.View``

export const ShippingTypeIcon = styled.View`
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primary[500]};
  border-radius: 30px;
`

export const ShippingTypeContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  gap: 16px;
  background-color: ${({ theme }) => theme.darkColors.dark2};
  border-radius: 24px;
  padding: 20px;
  align-items: center;
`

export const Container = styled.ScrollView`
  display: flex;
  flex-direction: row;
  gap: 16px;
  background-color: ${({ theme }) => theme.darkColors.dark2};
  border-radius: 24px;
  padding: 20px;
  align-items: center;
`
