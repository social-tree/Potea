import { Container, StyledCheckBox } from './Checkbox.styles'

import { IBouncyCheckboxProps } from 'react-native-bouncy-checkbox'
import { theme } from 'src/styles/theme'

interface Props extends IBouncyCheckboxProps {}

export const Checkbox = ({ ...props }: Props) => {
  return (
    <Container>
      <StyledCheckBox
        {...props}
        size={25}
        fillColor={theme.primary[500]}
        unfillColor="transparent"
        iconStyle={{ borderColor: theme.primary[500] }}
        innerIconStyle={{ borderWidth: 2, borderRadius: 8 }}
      />
    </Container>
  )
}
