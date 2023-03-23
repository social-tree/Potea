import { Container, Label, StyledCheckBox } from './Checkbox.styles'

import { IBouncyCheckboxProps } from 'react-native-bouncy-checkbox'
import { Text } from 'react-native'
import { theme } from 'src/styles/theme'

interface Props extends IBouncyCheckboxProps {
  label: string
}

export const Checkbox = ({ label, text, ...props }: Props) => {
  return (
    <Container>
      <StyledCheckBox
        {...props}
        size={25}
        text={label}
        fillColor={theme.primary[500]}
        unfillColor="transparent"
        iconStyle={{ borderColor: theme.primary[500] }}
        innerIconStyle={{ borderWidth: 2, borderRadius: 8 }}
        textComponent={<Label>{label || text}</Label>}
      />
    </Container>
  )
}
