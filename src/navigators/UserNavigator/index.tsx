import { Bag } from 'src/assets/svg/Bag'
import { Cart } from 'src/pages/User/Cart'
import CartNavigator from '../CartNavigator'
import { Home as HomeIcon } from 'src/assets/svg/Home'
import HomeNavigator from '../HomeNavigator'
import React from 'react'
import { ResetPassword } from 'src/pages/User/ResetPassword'
import { UserBottomStackParamList } from './UserNavigator.types'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { theme } from 'src/styles/theme'

const { Navigator, Screen } =
  createBottomTabNavigator<UserBottomStackParamList>()

const UserNavigator = () => {
  return (
    <Navigator
      initialRouteName="HomeNav"
      screenOptions={({ route }) => {
        const toExclude: (typeof route.name)[] = [
          'ResetPassword',
          'FillProfile',
        ]
        return {
          tabBarButton: toExclude.includes(route.name)
            ? () => {
                return null
              }
            : undefined,
          tabBarStyle: UserTabBarStyle as any,
          tabBarItemStyle: {
            borderRadius: 20,
            maxWidth: 58,
          },
          tabBarHideOnKeyboard: true,
        }
      }}
    >
      <Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <HomeIcon width={19} height={20} />,
          title: 'Home',
          tabBarStyle: { display: 'none' },
        }}
        name="HomeNav"
        component={HomeNavigator}
      />
      <Screen
        options={{
          title: 'Create New Password',
          tabBarStyle: { display: 'none' },
        }}
        name="ResetPassword"
        component={ResetPassword}
      />
      <Screen
        options={{
          headerShown: false,
          title: 'Cart',
          tabBarIcon: () => (
            <Bag width={19} height={20} color={theme.primary[500]} />
          ),
          tabBarActiveTintColor: theme.primary[500],
        }}
        name="CartNav"
        component={CartNavigator}
      />
    </Navigator>
  )
}

export const UserTabBarStyle = {
  display: 'flex',
  backgroundColor: theme.darkColors.dark2,
  height: 55,
  paddingBottom: 5,
  justifyContent: 'center',
  alignItems: 'center',
}

export default UserNavigator
