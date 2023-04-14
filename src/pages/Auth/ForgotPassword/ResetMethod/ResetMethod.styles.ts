import {
  ParagraphL,
  ParagraphM,
  ParagraphXL,
} from 'src/styles/utils/typography'
import styled from 'styled-components/native'

export const MethodInfoText = styled.Text`
  ${ParagraphL}
  color: ${({ theme }) => theme.other.white};
`

export const MethodText = styled.Text`
  ${ParagraphM}
  color: ${({ theme }) => theme.greyscale[300]};
`

export const MethodInfo = styled.View`
  display: flex;
  gap: 8px;
`

export const MethodIcon = styled.View`
  height: 80px;
  width: 80px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const IconShadow = styled.View`
  background: ${({ theme }) => theme.primary[500]};
  opacity: 0.1;
  padding: 20px;
  border-radius: 50px;
  height: 80px;
  width: 80px;
  position: absolute;
`

export const MethodButton = styled.TouchableHighlight<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 24px;
  background: ${({ theme }) => theme.darkColors.dark2};
  border-radius: 32px;
  border: ${({ theme, selected }) =>
    selected ? `1px solid ${theme.primary[500]}` : `1px solid transparent`};
`

export const InfoText = styled.Text`
  ${ParagraphXL}
  color: ${({ theme }) => theme.other.white};
`

export const Methods = styled.View`
  display: flex;
  gap: 24px;
  width: 100%;
`

export const Container = styled.View`
  display: flex;
  align-items: center;
  gap: 33.33px;
  padding: 10px 24px 0px 24px;
`
