import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ResetPassword } from 'src/pages/User/ResetPassword'
import { Home } from 'src/pages/User/Home'
import { Home as HomeIcon } from 'src/assets/svg/Home'
import styled from 'styled-components/native'
import { BlurView } from 'expo-blur'
const { Navigator, Screen } = createBottomTabNavigator()

const HomeNavigator = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => {
        const toExclude: typeof route.name[] = ['ResetPassword']
        return {
          tabBarButton: toExclude.includes(route.name)
            ? () => {
                return null
              }
            : undefined,
          tabBarBackground: () => <BlurView intensity={100} tint="dark" />,
          tabBarStyle: { position: 'absolute' },
        }
      }}
    >
      <Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <HomeIcon />,
        }}
        name="Home"
        component={Home}
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

export default HomeNavigator
