import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from 'src/pages/Home'

const { Navigator, Screen } = createStackNavigator()

const HomeNavigator = () => {
  return (
    <Navigator>
      <Screen name="Home" component={Home} />
    </Navigator>
  )
}

export default HomeNavigator
