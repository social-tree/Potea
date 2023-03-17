import { Container, IconWrap, InputWrap, StyledInput } from './Input.styles'

import { Eye } from 'src/assets/svg/Eye'
import { TextInputProps } from 'react-native'
import { theme } from 'src/styles/theme'
import { useState } from 'react'

interface Props extends TextInputProps {
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  type?: string
}

export const Input = ({ leftIcon, rightIcon, type, ...props }: Props) => {
  const [showPassword, setShowPassword] = useState(
    type === 'password' ? true : false
  )

  const toggleShowPassword = () => {
    setShowPassword((prev) => (prev ? false : true))
  }

  return (
    <Container>
      <InputWrap>
        {leftIcon && <IconWrap>{leftIcon}</IconWrap>}
        <StyledInput
          {...props}
          secureTextEntry={showPassword}
          placeholderTextColor={theme.greyscale[50]}
        />
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
