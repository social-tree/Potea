import * as Styled from './MiniProduct.styles'

import React, { useState } from 'react'
import { TouchableOpacity, ViewProps } from 'react-native'

import { Trash } from 'src/assets/svg/Trash'
import { productWithQuantityType } from 'src/types/product'

interface Props extends ViewProps {
  handleDelete: (product: productWithQuantityType) => void
  disableDelete?: boolean
  disableChangeQuantity?: boolean
  initialQuantity?: number
  productInfo?: productWithQuantityType
  handleQuantityChange?: (id: number, type: string) => Promise<number>
}

export const MiniProduct = ({
  handleDelete,
  disableDelete,
  disableChangeQuantity,
  initialQuantity,
  productInfo,
  handleQuantityChange,
  ...props
}: Props) => {
  const [quantity, setQuantity] = useState(initialQuantity || 1)
  const [changingQuantity, setChangingQuantity] = useState(false)

  const handleQuantity = async (type: 'add' | 'rem') => {
    if ((type === 'rem' && quantity === 1) || changingQuantity) return
    setChangingQuantity(true)
    if (handleQuantityChange) {
      const newQuantity = await handleQuantityChange(productInfo.id, type)
      if (newQuantity) setQuantity(newQuantity)
    } else {
      type === 'add' && setQuantity((prev) => (prev += 1))
      type === 'rem' && setQuantity((prev) => (prev -= 1))
    }
    setChangingQuantity(false)
  }

  return (
    <Styled.Container {...props}>
      <Styled.MiniProductImage source={{ uri: productInfo?.image[0] || '' }} />
      <Styled.MiniProductInfo>
        <Styled.MiniProductName>{productInfo?.name}</Styled.MiniProductName>
        <Styled.MiniProductPrice>${productInfo?.price}</Styled.MiniProductPrice>
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
            disable={changingQuantity}
          />
        )}
      </Styled.MiniProductInfo>
      {!disableDelete && (
        <Styled.MiniProductTrash
          onPress={() => handleDelete({ ...productInfo, quantity })}
        >
          <Trash />
        </Styled.MiniProductTrash>
      )}
    </Styled.Container>
  )
}
