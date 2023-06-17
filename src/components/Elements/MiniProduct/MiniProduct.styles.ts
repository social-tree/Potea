import { HeadingSix, ParagraphM } from 'src/styles/utils/typography'

import { Quantity } from 'src/components/Form/Elements/Quantity'
import { Trash } from 'src/assets/svg/Trash'
import styled from 'styled-components/native'

export const MiniProductTrash = styled(Trash)`
  align-self: flex-end;
  margin-left: auto;
  margin-bottom: 10px;
`

export const MiniProductQuantityValue = styled.Text`
  background-color: ${({ theme }) => theme.darkColors.dark3};
  width: 35px;
  border-radius: 50px;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  ${ParagraphM}
  color:${({ theme }) => theme.other.white};
  padding: 8px 14px;
`

export const MiniProductQuantity = styled(Quantity)`
  gap: 17px;
  padding: 6px 12px;
  justify-content: center;
  min-width: 93px;
  align-items: center;
`

export const MiniProductPrice = styled.Text`
  ${HeadingSix}
  color: ${({ theme }) => theme.primary[500]}
`

export const MiniProductName = styled.Text`
  ${HeadingSix}
  color: ${({ theme }) => theme.other.white}
`

export const MiniProductInfo = styled.View`
  display: flex;
  gap: 16px;
`

export const MiniProductImage = styled.Image`
  width: 120px;
  border-radius: 32px;
  height: 120px;
  background-color: ${({ theme }) => theme.darkColors.dark3};
`

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.darkColors.dark2};
  border-radius: 32px;
  display: flex;
  flex-direction: row;
  padding: 20px;
  gap: 16px;
  align-items: center;
  max-height: 160px;
`
