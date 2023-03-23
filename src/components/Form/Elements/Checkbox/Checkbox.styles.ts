import BouncyCheckbox from 'react-native-bouncy-checkbox'
import styled from 'styled-components/native'

export const StyledCheckBox = styled(BouncyCheckbox)`
  height: 24px;
  color: ${({ theme }) => theme.greyscale[50]};
`

export const Container = styled.View`
  flex: 1;
`
