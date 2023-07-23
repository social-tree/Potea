import * as Styled from './Order.styles'

import { productType, productWithQuantityType } from 'src/types/product'

import { OrdersStackParamList } from 'src/navigators/OrdersNavigator/OrdersNavigator.types'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'

interface Props {
  productInfo: productType
  quantity: number
  navigation?: StackNavigationProp<OrdersStackParamList, 'MyOrders'>
}

export const Order = ({ productInfo, quantity, navigation }: Props) => {
  return (
    <Styled.Container>
      <Styled.OrderImage source={{ uri: productInfo.image[0] || '' }} />
      <Styled.OrderInfo>
        <Styled.OrderProductName>{productInfo.name}</Styled.OrderProductName>
        <Styled.OrderQuantity>Qty = {quantity}</Styled.OrderQuantity>
        {navigation && <Styled.OrderStatus>In Delivery</Styled.OrderStatus>}
        <Styled.OrderInfoBottom>
          <Styled.OrderPrice>${productInfo.price}</Styled.OrderPrice>
          {navigation && (
            <Styled.TrackOrderButton
              onPress={() =>
                navigation.navigate('TrackOrder', {
                  product: productInfo,
                  quantity,
                })
              }
              textProps={{ style: { fontSize: 14 } }}
            >
              Track Order
            </Styled.TrackOrderButton>
          )}
        </Styled.OrderInfoBottom>
      </Styled.OrderInfo>
    </Styled.Container>
  )
}
