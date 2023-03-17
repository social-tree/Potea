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

export const Container = styled.View`
  background-color: ${({ theme }) => theme.darkColors.dark2};
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`
