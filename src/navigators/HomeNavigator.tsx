import React, { useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { Home } from 'src/pages/User/Home'
import { Notifications } from 'src/pages/User/Notifications'
import { Search } from 'src/pages/User/Search'
import { Wishlist } from 'src/pages/User/Wishlist'
import { createStackNavigator } from '@react-navigation/stack'
import styled from 'styled-components/native'

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
      initialRouteName="Home"
    >
      <Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Screen options={{ headerTitle: '' }} name="Search" component={Search} />
      <Screen name="Notifications" component={Notifications} />
      <Screen name="Wishlist" component={Wishlist} />
    </Navigator>
  )
}

const Tabbar = styled.View``

export default HomeNavigator
