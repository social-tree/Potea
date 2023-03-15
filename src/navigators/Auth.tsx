import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Welcome } from 'src/pages/Auth/Welcome'

const { Navigator, Screen } = createStackNavigator()

const AuthNavigator = () => {
  return (
    <Navigator>
      <Screen
        options={{ headerShown: false }}
        name="Welcome"
        component={Welcome}
      />
    </Navigator>
  )
}

export default AuthNavigator
