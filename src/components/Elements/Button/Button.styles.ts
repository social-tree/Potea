import styled from 'styled-components/native'

export const StyledText = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 16px;
`

export const StyledButton = styled.TouchableOpacity<{ loading: boolean }>`
  background: ${({ theme, loading }) =>
    loading ? theme.greyscale['800'] : theme.primary['500']};
  border-radius: 100px;
  padding: 15px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 100%;
  height: 58px;
`
