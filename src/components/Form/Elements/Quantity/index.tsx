import * as Styled from './Quantity.styles'

import { TextProps, TouchableOpacity, ViewProps } from 'react-native'

import { Minus } from 'src/assets/svg/Minus'
import { Plus } from 'src/assets/svg/Plus'
import React from 'react'
import { SvgProps } from 'react-native-svg'

interface Props extends ViewProps {
  handleQuantity: (type: 'add' | 'rem') => void
  value: number | string
  minusProps?: SvgProps
  plusProps?: SvgProps
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
        <Minus {...minusProps} />
      </TouchableOpacity>
      <Styled.QuantityAmount {...quantityProps}>{value}</Styled.QuantityAmount>
      <TouchableOpacity
        disabled={disable}
        onPress={() => handleQuantity('add')}
      >
        <Plus {...plusProps} />
      </TouchableOpacity>
    </Styled.Container>
  )
}
