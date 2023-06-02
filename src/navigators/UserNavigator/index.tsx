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
          tabBarStyle: {
            display: 'flex',
            backgroundColor: theme.darkColors.dark2,
            height: 55,
            paddingBottom: 5,
          },
          tabBarHideOnKeyboard: true,
        }
      }}
    >
      <Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <HomeIcon />,
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
    </Navigator>
  )
}

export default UserNavigator
