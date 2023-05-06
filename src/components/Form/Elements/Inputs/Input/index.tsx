import {
  Container,
  IconWrap,
  InputWrap,
  StyledInput,
  TextError,
  Wrapper,
} from './Input.styles'
import { Control, UseControllerProps } from 'react-hook-form/dist/types'
import { Ref, useState } from 'react'
import { TextInput, TextInputProps } from 'react-native'

import { Controller } from 'react-hook-form'
import { Eye } from 'src/assets/svg/Eye'
import { theme } from 'src/styles/theme'

interface Props extends UseControllerProps {
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  type?: string
  name: string
  control: Control
  placeholder: string
  inputProps?: TextInputProps
  ref?: Ref<TextInput>
  errors?: any
  style?: any
}

export const Input = ({
  leftIcon,
  rightIcon,
  control,
  type,
  name,
  inputProps: { onFocus, onBlur, ...inputProps },
  placeholder,
  errors,
  ref,
  style,
  ...props
}: Props) => {
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(
    type === 'password' ? true : false
  )

  const toggleShowPassword = () => {
    setShowPassword((prev) => (prev ? false : true))
  }

  return (
    <Container>
      <Wrapper focused={focused} style={style} error={!!errors?.[name]}>
        <InputWrap>
          {leftIcon && <IconWrap>{leftIcon}</IconWrap>}
          <Controller
            control={control}
            {...props}
            render={({ field }) => (
              <StyledInput
                secureTextEntry={showPassword}
                placeholderTextColor={theme.greyscale[50]}
                onBlur={(e) => {
                  setFocused(false)
                  field.onBlur()
                  onBlur && onBlur(e)
                }}
                ref={ref}
                onChangeText={field.onChange}
                value={field.value}
                placeholder={placeholder}
                onFocus={(e) => {
                  setFocused(true)
                  onFocus && onFocus(e)
                }}
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
