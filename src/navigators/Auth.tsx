import { Text, View } from 'react-native'

import { AuthMethod } from 'src/pages/Auth/AuthMethod'
import React from 'react'
import { Welcome } from 'src/pages/Auth/Welcome'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

const AuthNavigator = () => {
  return (
    <Navigator screenOptions={{ headerTitle: '' }}>
      <Screen
        options={{
          headerShown: false,
        }}
        name="Welcome"
        component={Welcome}
      />
      <Screen name="AuthMethod" component={AuthMethod} />
    </Navigator>
  )
}

export default AuthNavigator
