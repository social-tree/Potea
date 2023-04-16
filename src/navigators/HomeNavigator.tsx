import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from 'src/pages/Home'
import { ResetPassword } from 'src/pages/Home/ResetPassword'

const { Navigator, Screen } = createStackNavigator()

const HomeNavigator = () => {
  return (
    <Navigator initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen
        options={{ title: 'Create New Password' }}
        name="ResetPassword"
        component={ResetPassword}
      />
    </Navigator>
  )
}

export default HomeNavigator
