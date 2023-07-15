import * as Styled from './Checkbox.styles'

import React, { useMemo } from 'react'

import { Control } from 'react-hook-form/dist/types/form'
import { Controller } from 'react-hook-form'
import { IBouncyCheckboxProps } from 'react-native-bouncy-checkbox'
import { theme } from 'src/styles/theme'

interface Props extends IBouncyCheckboxProps {
  label?: string
  control?: Control
  name?: string
  rounded?: boolean
}

export const Checkbox = ({
  control,
  name,
  label,
  text,
  rounded,
  ...props
}: Props) => {
  const styles = useMemo(
    () => ({
      size: 25,
      text: label,
      fillColor: theme.primary[500],
      unfillColor: 'transparent',
      iconStyle: {
        borderColor: theme.primary[500],
        width: props.size ? Math.abs(props.size - 8) : 17,
        height: props.size ? Math.abs(props.size - 8) : 17,
      },
      innerIconStyle: {
        borderWidth: 2,
        borderRadius: rounded ? 15 : 8,
        padding: 5,
      },
      textComponent: <Styled.Label>{label || text}</Styled.Label>,
      iconImageStyle: {
        display: rounded ? 'none' : 'flex',
      },
    }),
    [props.size, rounded, theme, label]
  )

  return (
    <Styled.Container>
      {control ? (
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Styled.StyledCheckBox
              {...(styles as any)}
              onPress={(isChecked) => onChange(isChecked)}
              onBlur={onBlur}
              isChecked={value}
              {...props}
            />
          )}
          name={name}
        />
      ) : (
        <Styled.StyledCheckBox {...(styles as any)} {...props} />
      )}
    </Styled.Container>
  )
}
