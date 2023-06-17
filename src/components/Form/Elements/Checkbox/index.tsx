import * as Styled from './Checkbox.styles'

import { Control } from 'react-hook-form/dist/types/form'
import { Controller } from 'react-hook-form'
import { IBouncyCheckboxProps } from 'react-native-bouncy-checkbox'
import React from 'react'
import { theme } from 'src/styles/theme'

interface Props extends IBouncyCheckboxProps {
  label: string
  control: Control
  name: string
}

export const Checkbox = ({ control, name, label, text, ...props }: Props) => {
  return (
    <Styled.Container>
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Styled.StyledCheckBox
            {...props}
            size={25}
            text={label}
            fillColor={theme.primary[500]}
            unfillColor="transparent"
            iconStyle={{ borderColor: theme.primary[500] }}
            innerIconStyle={{ borderWidth: 2, borderRadius: 8 }}
            textComponent={<Styled.Label>{label || text}</Styled.Label>}
            onPress={(isChecked) => onChange(isChecked)}
            onBlur={onBlur}
            isChecked={value}
          />
        )}
        name={name}
      />
    </Styled.Container>
  )
}
