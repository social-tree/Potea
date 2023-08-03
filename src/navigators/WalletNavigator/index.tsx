import { AllTransactions } from 'src/pages/User/Wallet/AllTransactions'
import { ChooseAmount } from 'src/pages/User/Wallet/ChooseAmount'
import { Logo } from 'src/assets/svg/Leaf'
import React from 'react'
import { TopUpPaymentMethod } from 'src/pages/User/Wallet/TopUpPaymentMethod'
import { Wallet } from 'src/pages/User/Wallet'
import { WalletStackParamList } from './WalletNavigator.types'
import { createStackNavigator } from '@react-navigation/stack'
import { useHideTab } from 'src/hooks/useHideTab'

const { Navigator, Screen } = createStackNavigator<WalletStackParamList>()
const routesWithoutTabs = ['ChooseAmount', 'TopUpPaymentMethod']
const WalletNavigator = () => {
  useHideTab({ routesToHideTab: routesWithoutTabs })
  return (
    <Navigator initialRouteName="MyWallet">
      <Screen
        options={{
          title: 'My E-Wallet',
          headerLeft: () => <Logo width={20} height={24} />,
          headerLeftContainerStyle: {
            maxWidth: 43,
            width: '100%',
            alignItems: 'flex-end',
          },
        }}
        name="MyWallet"
        component={Wallet}
      />
      <Screen
        options={{
          title: 'Top Up E-Wallet',
        }}
        name="ChooseAmount"
        component={ChooseAmount}
      />
      <Screen
        options={{
          title: 'Top Up E-Wallet',
        }}
        name="TopUpPaymentMethod"
        component={TopUpPaymentMethod}
      />
      <Screen
        options={{
          title: 'Transaction History',
        }}
        name="AllTransactions"
        component={AllTransactions}
      />
    </Navigator>
  )
}
export default WalletNavigator
