import { HeadingFive } from 'src/styles/utils/typography'
import styled from 'styled-components/native'

export const PinButton = styled.Text`
  color: ${({ theme }) => theme.primary[500]};
  ${HeadingFive}
`

export const Wrap = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.darkColors.dark2};
  display: flex;
  align-items: center;
  justify-content: center;
`
