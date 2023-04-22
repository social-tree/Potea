import React, { useState } from 'react'
import { Home } from 'src/pages/User/Home'
import styled from 'styled-components/native'
import { Notifications } from 'src/pages/User/Notifications'
import { createStackNavigator } from '@react-navigation/stack'
import { Wishlist } from 'src/pages/User/Wishlist'

const { Navigator, Screen } = createStackNavigator()

const HomeNavigator = () => {
  const [searching, setSearching] = useState(false)

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
      <Screen
        name="Wishlist"
        initialParams={{ setSearching, searching }}
        component={Wishlist}
      />
    </Navigator>
  )
}

const Tabbar = styled.View``

export default HomeNavigator
