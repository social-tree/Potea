import * as Styled from './MiniProduct.styles'

import React, { useState } from 'react'
import { TouchableOpacity, ViewProps } from 'react-native'

import { Trash } from 'src/assets/svg/Trash'
import { productType } from 'src/types/product'

interface Props extends ViewProps {
  handleDelete: (product: productType) => void
  disableDelete?: boolean
  disableChangeQuantity?: boolean
  initialQuantity?: number
}

export const MiniProduct = ({
  handleDelete,
  disableDelete,
  disableChangeQuantity,
  initialQuantity,
  ...props
}: Props) => {
  const [quantity, setQuantity] = useState(initialQuantity || 1)

  const handleQuantity = (type: 'add' | 'rem') => {
    type === 'add' && setQuantity((prev) => prev + 1)
    type === 'rem' && quantity !== 1 && setQuantity((prev) => prev - 1)
  }

  return (
    <Styled.Container {...props}>
      <Styled.MiniProductImage
        source={{ uri: 'https://i.imgur.com/JLNQX7t.png' }}
      />
      <Styled.MiniProductInfo>
        <Styled.MiniProductName>Mini Product</Styled.MiniProductName>
        <Styled.MiniProductPrice>$99</Styled.MiniProductPrice>
        {disableChangeQuantity ? (
          <Styled.MiniProductQuantityValue>
            {quantity}
          </Styled.MiniProductQuantityValue>
        ) : (
          <Styled.MiniProductQuantity
            minusProps={{ width: 12 }}
            plusProps={{ width: 12 }}
            quantityProps={{ style: { fontSize: 14 } }}
            handleQuantity={handleQuantity}
            value={quantity}
          />
        )}
      </Styled.MiniProductInfo>
      {!disableDelete && (
        <Styled.MiniProductTrash
          onPress={() =>
            handleDelete({
              average_rating: 4,
              count: 234,
              description: '',
              id: 2,
              image: ['https://i.imgur.com/JLNQX7t.png'],
              name: 'Mini Product',
              price: 99,
              reviews_amount: 224,
              sold_amount: 2155,
            })
          }
        >
          <Trash />
        </Styled.MiniProductTrash>
      )}
    </Styled.Container>
  )
}
