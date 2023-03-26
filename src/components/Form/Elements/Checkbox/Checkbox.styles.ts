import BouncyCheckbox from 'react-native-bouncy-checkbox'
import styled from 'styled-components/native'

export const Label = styled.Text`
  color: ${({ theme }) => theme.greyscale[50]};
`

export const StyledCheckBox = styled(BouncyCheckbox)`
  height: 24px;
  color: ${({ theme }) => theme.greyscale[50]};
  display: flex;
  flex-direction: row;
  gap: 12px;
`

export const Container = styled.View``
