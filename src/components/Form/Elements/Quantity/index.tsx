import * as Styled from './Quantity.styles'

import { TextProps, TouchableOpacity, ViewProps } from 'react-native'

import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { SvgProps } from 'react-native-svg'

interface Props extends ViewProps {
  handleQuantity: (type: 'add' | 'rem') => void
  value: number | string
  minusProps?: any
  plusProps?: any
  quantityProps?: TextProps
  disable?: boolean
}

export const Quantity = ({
  handleQuantity,
  value,
  minusProps,
  plusProps,
  quantityProps,
  disable,
  ...props
}: Props) => {
  return (
    <Styled.Container {...props}>
      <TouchableOpacity
        disabled={disable}
        onPress={() => handleQuantity('rem')}
      >
        <AntDesign name="minus" size={24} color="white" {...plusProps} />
      </TouchableOpacity>
      <Styled.QuantityAmount {...quantityProps}>{value}</Styled.QuantityAmount>
      <TouchableOpacity
        disabled={disable}
        onPress={() => handleQuantity('add')}
      >
        <AntDesign name="plus" size={24} color="white" {...plusProps} />
      </TouchableOpacity>
    </Styled.Container>
  )
}
