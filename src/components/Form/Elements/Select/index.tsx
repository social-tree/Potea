import * as Styled from './Select.types'

import { Controller, UseControllerProps } from 'react-hook-form'
import React, { Ref } from 'react'

import { DropDownArrow } from 'src/assets/svg/DropDownArrow'
import { DropdownProps } from 'react-native-input-select/lib/typescript/types/index.types'
import { TextInput } from 'react-native'
import { theme } from 'src/styles/theme'

interface Props extends UseControllerProps {
  ref?: Ref<TextInput>
  placeholder?: string
  options: { name: string; value: string }[]
  DropdownProps?: DropdownProps
  errors?: any
}

export const Select = ({
  control,
  ref,
  name,
  placeholder,
  options,
  DropdownProps,
  errors,
  ...props
}: Props) => {
  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <Styled.StyledDropdown
              placeholder={placeholder}
              options={options}
              dropdownStyle={{
                backgroundColor: theme.darkColors.dark2,
                minHeight: 63,
                maxHeight: 63,
                borderRadius: 20,
                borderWidth: 0,
              }}
              modalOptionsContainerStyle={{
                backgroundColor: theme.darkColors.dark2,
              }}
              checkboxLabelStyle={{ color: 'white' }}
              placeholderStyle={{
                color: theme.other.white,
                marginTop: 5,
              }}
              selectedItemStyle={{ marginTop: 5, color: theme.other.white }}
              dropdownIconStyle={{ marginTop: 4 }}
              dropdownIcon={<DropDownArrow />}
              optionLabel={'name'}
              optionValue={'value'}
              selectedValue={value}
              onValueChange={(value) => onChange(value)}
              primaryColor={theme.primary[500]}
              {...DropdownProps}
            />
          )}
          {...props}
        />
      </Styled.Wrapper>
      {errors?.[name]?.message && (
        <Styled.TextError>{errors[name].message}</Styled.TextError>
      )}
    </Styled.Container>
  )
}
