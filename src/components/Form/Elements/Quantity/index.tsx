import { Container, QuantityAmount } from './Quantity.styles'

import { Minus } from 'src/assets/svg/Minus'
import { Plus } from 'src/assets/svg/Plus'
import React from 'react'
import { TouchableOpacity } from 'react-native'

interface Props {
  handleQuantity: (type: 'add' | 'rem') => void
  value: number | string
}

export const Quantity = ({ handleQuantity, value }: Props) => {
  return (
    <Container>
      <TouchableOpacity onPress={() => handleQuantity('rem')}>
        <Minus />
      </TouchableOpacity>
      <QuantityAmount>{value}</QuantityAmount>
      <TouchableOpacity onPress={() => handleQuantity('add')}>
        <Plus />
      </TouchableOpacity>
    </Container>
  )
}
