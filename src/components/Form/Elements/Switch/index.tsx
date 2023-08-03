import { Control, Controller } from 'react-hook-form'

import React from 'react'
import { Switch as ReactNativeSwitch } from 'react-native'
import { theme } from 'src/styles/theme'

interface Props {
  name: string
  control: Control
}

export const Switch = ({ name, control, ...props }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <ReactNativeSwitch
          trackColor={{
            false: theme.darkColors.dark3,
            true: theme.primary[500],
          }}
          thumbColor={value ? theme.other.white : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onChange}
          value={value}
        />
      )}
      {...props}
    />
  )
}
