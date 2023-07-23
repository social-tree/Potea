import { FillProfile } from 'src/pages/User/FillProfile'
import { Home } from 'src/pages/User/Home'
import { HomeStackParamList } from './HomeNavigator.types'
import { Notifications } from 'src/pages/User/Home/Notifications'
import { Product } from 'src/pages/User/Home/Product'
import React from 'react'
import { Reviews } from 'src/pages/User/Home/Reviews'
import { Search } from 'src/pages/User/Home/Search'
import { Wishlist } from 'src/pages/User/Home/Wishlist'
import { createStackNavigator } from '@react-navigation/stack'
import styled from 'styled-components/native'
import { useHideTab } from 'src/hooks/useHideTab'

const { Navigator, Screen } = createStackNavigator<HomeStackParamList>()
const routesWithoutTabs = [
  'FillProfile',
  'Notifications',
  'Product',
  'Reviews',
  'Search',
  'Notifications',
  'Wishlist',
]

const HomeNavigator = () => {
  useHideTab({ routesToHideTab: routesWithoutTabs })
  return (
    <Navigator
      screenOptions={{
        headerRightContainerStyle: {
          display: 'flex',
          justifyContent: 'center',
          marginRight: 15,
          marginTop: 5,
        },
        headerBackTitle: ' ',
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
        options={({ route }) => ({ title: route?.params?.name || 'reviews' })}
        name="Reviews"
        component={Reviews}
      />
    </Navigator>
  )
}

const Tabbar = styled.View``

export default HomeNavigator
