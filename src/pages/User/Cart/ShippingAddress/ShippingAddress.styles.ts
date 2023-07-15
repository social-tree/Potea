import { HeadingSix, ParagraphM } from 'src/styles/utils/typography'

import { Button } from 'src/components/Elements/Button'
import styled from 'styled-components/native'

export const AddNewButton = styled(Button)`
  background-color: ${({ theme }) => theme.darkColors.dark3};
`

export const ShippingInfoAddress = styled.Text`
  ${ParagraphM}
  color: ${({ theme }) => theme.other.white}
`

export const ShippingInfoTitle = styled.Text`
  ${HeadingSix}
  color: ${({ theme }) => theme.other.white}
`

export const ShippingInfo = styled.View`
  display: flex;
  gap: 6px;
  margin-right: auto;
`

export const ShippingInfoIcon = styled.View`
  background-color: ${({ theme }) => theme.primary[500]};
  padding: 8px;
  border-radius: 50px;
`

export const Container = styled.FlatList``
