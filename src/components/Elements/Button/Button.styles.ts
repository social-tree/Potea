import styled from 'styled-components/native'

export const StyledText = styled.Text`
  color: white;
  font-weight: 700;
`

export const StyledButton = styled.TouchableOpacity`
  background: ${({ theme }) => theme.primary['500']};
  border-radius: 100px;
  padding: 15px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 100%;
`
