import { FillProfile } from 'src/pages/User/FillProfile'
import { Home } from 'src/pages/User/Home'
import { HomeStackParamList } from './HomeNavigator.types'
import { Notifications } from 'src/pages/User/Notifications'
import { Product } from 'src/pages/User/Product'
import React from 'react'
import { Search } from 'src/pages/User/Search'
import { Wishlist } from 'src/pages/User/Wishlist'
import { createStackNavigator } from '@react-navigation/stack'
import styled from 'styled-components/native'

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()

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
      initialRouteName={'Home'}
    >
      <Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Screen options={{ headerTitle: '' }} name="Search" component={Search} />
      <Screen name="Notifications" component={Notifications} />
      <Screen name="Wishlist" component={Wishlist} />
      <Screen
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
        name="Product"
        component={Product}
      />
      <Screen
        options={{ headerLeft: () => <></>, headerTitle: 'Fill Your Profile' }}
        name="FillProfile"
        component={FillProfile}
      />
    </Navigator>
  )
}

const Tabbar = styled.View``

export default HomeNavigator
