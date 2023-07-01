import { Cart } from 'src/pages/User/Cart'
import { CartStackParamList } from './CartNavigator.types'
import { Checkout } from 'src/pages/User/Cart/Checkout'
import { Logo } from 'src/assets/svg/Leaf'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator<CartStackParamList>()

const CartNavigator = () => {
  return (
    <Navigator initialRouteName="Cart">
      <Screen
        options={{
          title: 'My Cart',
          headerLeft: () => <Logo width={20} height={24} />,
          headerLeftContainerStyle: {
            maxWidth: 50,
            width: '100%',
            alignItems: 'flex-end',
          },
        }}
        name="Cart"
        component={Cart}
      />
      <Screen
        options={{
          title: 'Checkout',
        }}
        name="Checkout"
        component={Checkout}
      />
    </Navigator>
  )
}
export default CartNavigator
