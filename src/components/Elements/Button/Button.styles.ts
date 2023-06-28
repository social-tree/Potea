import { Shadow } from 'react-native-shadow-2'
import styled from 'styled-components/native'

export const StyledText = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Container = styled(Shadow)`
  min-height: 58px;
  min-width: 100%;
`

export const StyledTouchableOpacity = styled.TouchableOpacity<{
  loading: boolean
}>`
  background: ${({ theme, loading }) =>
    loading ? theme.greyscale['800'] : theme.primary['500']};
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  min-width: 100%;
  min-height: 58px;
`
