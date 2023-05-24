import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import { FillProfile } from 'src/pages/User/FillProfile'
import { Home as HomeIcon } from 'src/assets/svg/Home'
import HomeNavigator from './HomeNavigator'
import { ResetPassword } from 'src/pages/User/ResetPassword'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { theme } from 'src/styles/theme'

const { Navigator, Screen } = createBottomTabNavigator()

const UserNavigator = () => {
  return (
    <Navigator
      initialRouteName="Home"
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
      <Screen
        options={{
          headerTitle: 'Fill Your Profile',
          tabBarStyle: { display: 'none' },
        }}
        name="FillProfile"
        component={FillProfile}
      />
    </Navigator>
  )
}

export default UserNavigator
