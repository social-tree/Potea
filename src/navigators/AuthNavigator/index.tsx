import { AuthMethod } from 'src/pages/Auth/AuthMethod'
import { AuthStackParamList } from './AuthNavigator.types'
import { Confirmation } from 'src/pages/Auth/ForgotPassword/Confirmation'
import { CreateAccount } from 'src/pages/Auth/CreateAccount'
import { Login } from 'src/pages/Auth/Login'
import React from 'react'
import { ResetMethod } from 'src/pages/Auth/ForgotPassword/ResetMethod'
import { Welcome } from 'src/pages/Auth/Welcome'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator<AuthStackParamList>()

const defaultOptions = {
  title: '',
}

const AuthNavigator = () => {
  return (
    <Navigator initialRouteName="Welcome">
      <Screen
        options={{
          headerShown: false,
          ...defaultOptions,
        }}
        name="Welcome"
        component={Welcome}
      />
      <Screen
        options={defaultOptions}
        name="AuthMethod"
        component={AuthMethod}
      />
      <Screen
        options={defaultOptions}
        name="CreateAccount"
        component={CreateAccount}
      />
      <Screen options={defaultOptions} name="Login" component={Login} />
      <Screen
        options={{ title: 'Forgot Password' }}
        name="ResetMethod"
        component={ResetMethod}
      />
      <Screen
        options={{ title: 'Forgot Password' }}
        name="Confirmation"
        component={Confirmation}
      />
    </Navigator>
  )
}

export default AuthNavigator
