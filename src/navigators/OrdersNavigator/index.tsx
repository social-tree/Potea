import { Logo } from 'src/assets/svg/Leaf'
import { Orders } from 'src/pages/User/Orders'
import { OrdersStackParamList } from './OrdersNavigator.types'
import React from 'react'
import { TrackOrder } from 'src/pages/User/Orders/TrackOrder'
import { createStackNavigator } from '@react-navigation/stack'
import { useHideTab } from 'src/hooks/useHideTab'

const { Navigator, Screen } = createStackNavigator<OrdersStackParamList>()
const routesWithoutTabs = ['TrackOrder']
const OrdersNavigator = () => {
  useHideTab({ routesToHideTab: routesWithoutTabs })
  return (
    <Navigator initialRouteName="MyOrders">
      <Screen
        options={{
          title: 'My Orders',
          headerLeft: () => <Logo width={20} height={24} />,
          headerLeftContainerStyle: {
            maxWidth: 43,
            width: '100%',
            alignItems: 'flex-end',
          },
        }}
        name="MyOrders"
        component={Orders}
      />
      <Screen
        options={{
          title: 'Track Order',
        }}
        name="TrackOrder"
        component={TrackOrder}
      />
    </Navigator>
  )
}
export default OrdersNavigator
