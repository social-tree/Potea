import { useState } from 'react'
import { TextInputProps } from 'react-native'
import { theme } from 'src/styles/theme'
import { Eye } from 'src/assets/svg/Eye'
import { Container, IconWrap, InputWrap, StyledInput } from './Input.styles'

interface Props extends TextInputProps {
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  type?: string
}

export const Input = ({ leftIcon, rightIcon, type, ...props }: Props) => {
  const [showPassword, setShowPassword] = useState(true)

  const toggleShowPassword = () => {
    setShowPassword((prev) => (prev ? false : true))
  }

  return (
    <Container>
      <InputWrap>
        <IconWrap>{leftIcon}</IconWrap>
        <StyledInput secureTextEntry={showPassword} {...props} />
      </InputWrap>
      <IconWrap>
        {type === 'password' ? (
          <Eye
            fill={theme.greyscale[500]}
            onPress={() => toggleShowPassword()}
            hidden={showPassword}
          />
        ) : (
          rightIcon
        )}
      </IconWrap>
    </Container>
  )
}
