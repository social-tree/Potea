import { BlurView } from 'expo-blur'
import { Home as HomeIcon } from 'src/assets/svg/Home'
import HomeNavigator from './HomeNavigator'
import React from 'react'
import { ResetPassword } from 'src/pages/User/ResetPassword'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import styled from 'styled-components/native'

const { Navigator, Screen } = createBottomTabNavigator()

const UserNavigator = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => {
        const toExclude: (typeof route.name)[] = ['ResetPassword']
        return {
          tabBarButton: toExclude.includes(route.name)
            ? () => {
                return null
              }
            : undefined,
          tabBarBackground: () => <BlurView intensity={100} tint="dark" />,
          tabBarStyle: { position: 'absolute' },
          tabBarHideOnKeyboard: true,
        }
      }}
    >
      <Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <HomeIcon />,
          title: 'Home',
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

const Tabbar = styled.View``

export default UserNavigator
