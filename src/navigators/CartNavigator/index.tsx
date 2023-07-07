import { Cart } from 'src/pages/User/Cart'
import { CartStackParamList } from './CartNavigator.types'
import { Checkout } from 'src/pages/User/Cart/Checkout'
import { ChooseShipping } from 'src/pages/User/Cart/ChooseShipping'
import { Logo } from 'src/assets/svg/Leaf'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useHideTab } from 'src/hooks/useHideTab'

const { Navigator, Screen } = createStackNavigator<CartStackParamList>()
const routesWithoutTabs = ['Checkout', 'ChooseShipping']
const CartNavigator = (props) => {
  useHideTab({ routesToHideTab: routesWithoutTabs })
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
      <Screen
        options={{
          title: 'Choose Shipping',
        }}
        name="ChooseShipping"
        component={ChooseShipping}
      />
    </Navigator>
  )
}
export default CartNavigator
