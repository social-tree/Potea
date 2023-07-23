import {
  HeadingFive,
  HeadingSix,
  ParagraphM,
  ParagraphS,
} from 'src/styles/utils/typography'

import { Checkbox } from 'src/components/Form/Elements/Checkbox'
import styled from 'styled-components/native'

export const OrderStatusAddress = styled.Text`
  color: ${({ theme }) => theme.greyscale[300]};
  ${ParagraphM}
`

export const OrderStatusTime = styled.Text`
  color: ${({ theme }) => theme.greyscale[300]};
  ${ParagraphS}
`

export const OrderStatusName = styled.Text`
  ${HeadingSix}
  color: ${({ theme }) => theme.other.white}
`

export const OrderStatusTop = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const OrderStatusInfo = styled.View`
  display: flex;
  gap: 5px;

  flex: 1;
`

export const OrderStatusCircle = styled.View`
  background-color: ${({ theme }) => theme.primary[500]};
  width: 15px;
  height: 15px;
  border-radius: 10px;
`
export const OrderStatusLine = styled.View`
  height: 27px;
  width: 1px;
  border-width: 1px;
  border-style: dashed;
  border-color: ${({ theme }) => theme.darkColors.dark3};
`

export const OrderStatusCircleContainer = styled.View`
  display: flex;
  align-items: center;
  padding-top: 10px;
  gap: 9px;
`

export const OrderStatusCircleBorder = styled.View`
  width: 36px;
  height: 35px;
  border-radius: 20px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.primary[500]};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const OrderStatusContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

export const OrderStatusTitle = styled.Text`
  ${HeadingFive};
  color: ${({ theme }) => theme.other.white};
  padding-bottom: 24px;
`

export const Line = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.darkColors.dark3};
`

export const Status = styled.Text`
  ${HeadingSix};
  color: ${({ theme }) => theme.other.white};
  text-align: center;
`

export const StatusLine = styled.View<{ selected: boolean }>`
  border-width: 1px;
  border-style: dashed;
  border-color: ${({ theme, selected }) =>
    selected ? theme.primary[500] : theme.darkColors.dark3};
  border-radius: 5px;
  height: 1px;
  flex: 1;
  margin-bottom: 8px;
`

export const StatusCheckbox = styled(Checkbox)`
  width: 12.5;
  height: 20;
`

export const StatusItem = styled.View`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`

export const StatusContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  padding: 0px 24px;
  gap: 8px;
`
