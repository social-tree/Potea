import styled from 'styled-components/native'

export const IconWrap = styled.View`
  flex: 1;
  padding-right: 20px;
`

export const StyledInput = styled.TextInput`
  font-size: 14px;
  width: 100%;
  color: ${({ theme }) => theme.greyscale[50]};
`

export const InputWrap = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 100;
  gap: 14px;
`

export const TextError = styled.Text`
  color: ${({ theme }) => theme.status.error};
`

export const Wrapper = styled.View<{ error: boolean; focused: boolean }>`
  background-color: ${({ theme, focused }) =>
    focused ? `${theme.transparent.green}20` : theme.darkColors.dark2};
  ${({ theme, error }) => error && `border: 1px solid ${theme.status.error}`};
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  min-height: ${({ focused }) => (focused ? '61px' : '60px')};
  border: ${({ focused, theme }) =>
    focused ? `1px solid ${theme.primary[500]}` : 'none'};
`

export const Container = styled.View`
  display: flex;
  gap: 7px;
  width: 100%;
`
