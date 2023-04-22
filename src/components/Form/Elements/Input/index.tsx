import {
  Container,
  IconWrap,
  InputWrap,
  StyledInput,
  TextError,
  Wrapper,
} from './Input.styles'

import { Eye } from 'src/assets/svg/Eye'
import { TextInputProps } from 'react-native'
import { theme } from 'src/styles/theme'
import { useState } from 'react'
import { Control, UseControllerProps } from 'react-hook-form/dist/types'
import { Controller } from 'react-hook-form'
import { InputProps } from 'react-native-elements'

interface Props extends UseControllerProps {
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  type?: string
  name: string
  control: Control
  placeholder: string
  inputProps?: TextInputProps
  errors?: any
  style?: any
}

export const Input = ({
  leftIcon,
  rightIcon,
  control,
  type,
  name,
  inputProps,
  placeholder,
  errors,
  style,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(
    type === 'password' ? true : false
  )

  const toggleShowPassword = () => {
    setShowPassword((prev) => (prev ? false : true))
  }

  return (
    <Container>
      <Wrapper style={style} error={!!errors?.[name]}>
        <InputWrap>
          {leftIcon && <IconWrap>{leftIcon}</IconWrap>}
          <Controller
            control={control}
            {...props}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledInput
                secureTextEntry={showPassword}
                placeholderTextColor={theme.greyscale[50]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
                {...inputProps}
              />
            )}
            name={name}
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
      </Wrapper>
      {errors?.[name]?.message && <TextError>{errors[name].message}</TextError>}
    </Container>
  )
}
