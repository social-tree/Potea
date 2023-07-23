import * as Styled from './TrackOrder.styles'

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useCallback, useState } from 'react'

import { FlatList } from 'react-native'
import { Order } from 'src/components/Elements/Order'
import { OrdersStackParamList } from 'src/navigators/OrdersNavigator/OrdersNavigator.types'
import { StackScreenProps } from '@react-navigation/stack'
import { theme } from 'src/styles/theme'

export const TrackOrder = ({
  route,
}: StackScreenProps<OrdersStackParamList, 'TrackOrder'>) => {
  const { product, quantity } = route.params
  const [routeId] = useState(2)
  const [orderDetails] = useState([
    {
      title: 'Order In Transit - Dec 17',
      time: '15:20 PM',
      address: '32 Manchester Ave. Ringgold, GA 30736',
    },
    {
      title: 'Order ... Customs Port - Dec 16',
      time: '14:40 PM',
      address: '4 Evergreen Street Lake Zurich, IL 60047',
    },
    {
      title: 'Orders are ... Shipped - Dec 15',
      time: '11:30 AM',
      address: '32 Manchester Ave. Ringgold, GA 30736',
    },
    {
      title: 'Order is in Packing - Dec 15',
      time: '10:25 AM',
      address: '32 Manchester Ave. Ringgold, GA 30736',
    },
    {
      title: 'Verified Payments - Dec 15',
      time: '10:04 AM',
      address: '32 Manchester Ave. Ringgold, GA 30736',
    },
  ])

  const checkboxProps = useCallback(
    (checkboxRouteId: number) => ({
      disableBuiltInState: true,
      isChecked: true,
      fillColor:
        routeId >= checkboxRouteId
          ? theme.primary[500]
          : theme.darkColors.dark3,
      unfillColor:
        routeId >= checkboxRouteId
          ? theme.primary[500]
          : theme.darkColors.dark3,
      rounded: true,
      size: 20,
    }),
    [routeId]
  )

  return (
    <FlatList
      contentContainerStyle={{ padding: 24 }}
      ListHeaderComponentStyle={{ gap: 24 }}
      ListHeaderComponent={
        <>
          <Order productInfo={product} quantity={quantity} />
          <Styled.StatusContainer>
            <Styled.StatusItem>
              <FontAwesome5
                size={30}
                name="box"
                color={
                  routeId >= 1 ? theme.primary[500] : theme.darkColors.dark3
                }
              />
              <Styled.StatusCheckbox {...checkboxProps(1)} />
            </Styled.StatusItem>
            <Styled.StatusLine selected={routeId >= 2} />
            <Styled.StatusItem>
              <FontAwesome5
                size={30}
                name="truck"
                color={
                  routeId >= 2 ? theme.primary[500] : theme.darkColors.dark3
                }
              />
              <Styled.StatusCheckbox {...checkboxProps(2)} />
            </Styled.StatusItem>
            <Styled.StatusLine selected={routeId >= 3} />
            <Styled.StatusItem>
              <MaterialCommunityIcons
                size={30}
                name="human-dolly"
                color={
                  routeId >= 3 ? theme.primary[500] : theme.darkColors.dark3
                }
              />
              <Styled.StatusCheckbox {...checkboxProps(3)} />
            </Styled.StatusItem>
            <Styled.StatusLine selected={routeId >= 4} />
            <Styled.StatusItem>
              <FontAwesome5
                size={30}
                name="box-open"
                color={
                  routeId >= 4 ? theme.primary[500] : theme.darkColors.dark3
                }
              />
              <Styled.StatusCheckbox {...checkboxProps(4)} />
            </Styled.StatusItem>
          </Styled.StatusContainer>
          <Styled.Status>Package In Delivery</Styled.Status>
          <Styled.Line />
          <Styled.OrderStatusTitle>
            Order Status Details
          </Styled.OrderStatusTitle>
        </>
      }
      data={orderDetails}
      renderItem={({ item, index }) => (
        <Styled.OrderStatusContainer>
          <Styled.OrderStatusCircleContainer>
            <Styled.OrderStatusCircleBorder>
              <Styled.OrderStatusCircle />
            </Styled.OrderStatusCircleBorder>
            {index !== orderDetails.length - 1 && <Styled.OrderStatusLine />}
          </Styled.OrderStatusCircleContainer>
          <Styled.OrderStatusInfo>
            <Styled.OrderStatusTop>
              <Styled.OrderStatusName>{item.title}</Styled.OrderStatusName>
              <Styled.OrderStatusTime>{item.time}</Styled.OrderStatusTime>
            </Styled.OrderStatusTop>
            <Styled.OrderStatusAddress>
              {item.address}
            </Styled.OrderStatusAddress>
          </Styled.OrderStatusInfo>
        </Styled.OrderStatusContainer>
      )}
    />
  )
}
