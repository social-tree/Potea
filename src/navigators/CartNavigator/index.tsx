import { Cart } from 'src/pages/User/Cart'
import { CartStackParamList } from './CartNavigator.types'
import { Logo } from 'src/assets/svg/Leaf'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator<CartStackParamList>()

const CartNavigator = () => {
  return (
    <Navigator
      screenOptions={{ headerLeftContainerStyle: { marginLeft: 25 } }}
      initialRouteName="Cart"
    >
      <Screen
        options={{
          title: 'My Cart',
          headerLeft: () => <Logo width={20} height={24} />,
        }}
        name="Cart"
        component={Cart}
      />
    </Navigator>
  )
}
export default CartNavigator
