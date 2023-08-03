import * as Styled from './Input.styles'

import { Control, UseControllerProps } from 'react-hook-form/dist/types'
import { Ref, useState } from 'react'
import { TextInput, TextInputProps, ViewProps } from 'react-native'

import { Controller } from 'react-hook-form'
import { Eye } from 'src/assets/svg/Eye'
import { MaskOptions } from 'react-native-mask-text/lib/typescript/src/@types'
import React from 'react'
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
  mask?: string
  inputWrapProps?: ViewProps
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
  ref,
  mask,
  style,
  inputWrapProps,
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
    <Styled.Container>
      <Styled.Wrapper
        leftIcon={!!leftIcon}
        rightIcon={!!rightIcon}
        focused={focused}
        style={style}
        error={!!errors?.[name]}
      >
        <Styled.InputWrap
          leftIcon={!!leftIcon}
          rightIcon={!!rightIcon}
          {...inputWrapProps}
        >
          {leftIcon && <Styled.IconWrap>{leftIcon}</Styled.IconWrap>}
          <Controller
            control={control}
            {...props}
            render={({ field }) =>
              !mask ? (
                <Styled.StyledInput
                  secureTextEntry={showPassword}
                  placeholderTextColor={theme.greyscale[50]}
                  ref={ref}
                  onChangeText={field.onChange}
                  value={
                    !!field?.value?.toLocaleDateString
                      ? field.value.toLocaleDateString()
                      : field.value
                  }
                  placeholder={placeholder}
                  {...inputProps}
                  onBlur={(e) => {
                    setFocused(false)
                    field.onBlur()
                    inputProps?.onBlur && inputProps?.onBlur(e)
                  }}
                  onFocus={(e) => {
                    setFocused(true)
                    inputProps?.onFocus && inputProps?.onFocus(e)
                  }}
                />
              ) : (
                <Styled.StyledMaskedTextInput
                  style={{ width: '100%' }}
                  mask={mask}
                  ref={ref}
                  options={{ decimalSeparator: 'tg' }}
                  onChangeText={(text, rawText) => field.onChange(rawText)}
                  placeholder={placeholder}
                  placeholderTextColor={theme.other.white}
                  value={field.value}
                  onBlur={(e) => {
                    setFocused(false)
                    field.onBlur()
                    inputProps?.onBlur && inputProps?.onBlur(e)
                  }}
                  onFocus={(e) => {
                    setFocused(true)
                    inputProps?.onFocus && inputProps?.onFocus(e)
                  }}
                  {...inputProps}
                />
              )
            }
            name={name}
          />
        </Styled.InputWrap>
        {type === 'password' ? (
          <Styled.IconWrap>
            <Eye
              fill={theme.greyscale[500]}
              onPress={() => toggleShowPassword()}
              hidden={showPassword}
            />
          </Styled.IconWrap>
        ) : (
          rightIcon
        )}
      </Styled.Wrapper>
      {errors?.[name]?.message && (
        <Styled.TextError>{errors[name].message}</Styled.TextError>
      )}
    </Styled.Container>
  )
}
