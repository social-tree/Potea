import { MaskedTextInput } from 'react-native-mask-text'
import styled from 'styled-components/native'

export const IconWrap = styled.View`
  flex: 1;
  padding-right: 20px;
`

export const StyledMaskedTextInput = styled(MaskedTextInput)`
  width: 100%;
  color: ${({ theme }) => theme.other.white};
  font-size: 14px;
`

export const StyledInput = styled.TextInput`
  font-size: 14px;
  width: 100%;
  color: ${({ theme }) => theme.greyscale[50]};
`

export const InputWrap = styled.View<{
  leftIcon?: boolean
  rightIcon?: boolean
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 100;
  gap: 14px;

  padding-right: 20px;
  padding-left: 20px;
`

export const TextError = styled.Text`
  color: ${({ theme }) => theme.status.error};
`

export const Wrapper = styled.View<{
  leftIcon?: boolean
  rightIcon?: boolean
  error: boolean
  focused: boolean
}>`
  background-color: ${({ theme, focused }) =>
    focused ? `${theme.transparent.green}20` : theme.darkColors.dark2};
  ${({ theme, error }) => error && `border: 1px solid ${theme.status.error}`};
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 59px;
  border: ${({ focused, theme }) =>
    focused
      ? `1px solid ${theme.primary[500]}`
      : `1px solid ${theme.darkColors.dark2}`};

  padding-right: ${({ rightIcon }) => (rightIcon ? '20px' : '0px')};
`

export const Container = styled.View`
  display: flex;
  gap: 7px;
  width: 100%;
`
