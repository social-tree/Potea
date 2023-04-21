import React from 'react'
import { Home } from 'src/pages/User/Home'
import styled from 'styled-components/native'
import { Notifications } from 'src/pages/User/Notifications'
import { createStackNavigator } from '@react-navigation/stack'
import { More } from 'src/assets/svg/More'

const { Navigator, Screen } = createStackNavigator()

const HomeNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerRightContainerStyle: {
          display: 'flex',
          justifyContent: 'center',
          marginRight: 15,
          marginTop: 5,
        },
      }}
      initialRouteName="ResetPassword"
    >
      <Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Screen name="Notifications" component={Notifications} />
    </Navigator>
  )
}

const Tabbar = styled.View``

export default HomeNavigator
