import * as LocalAuthentication from 'expo-local-authentication'

import { Platform, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { AppProvider } from 'src/contexts/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Buffer } from 'buffer'
import GlobalStyle from 'src/styles/GlobalStyle'
import { PINScreen } from 'src/pages/PINScreen'
import { RootNavigator } from 'src/navigators/RootNavigator'
import { ThemeProvider } from 'styled-components/native'
import { theme } from 'src/styles/theme'

global.Buffer = Buffer
export default function App() {
  const [isBiometricsComplete, setIsBiometricsComplete] = useState(false)
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false)

  const onPinComplete = () => {
    setIsBiometricsComplete(true)
  }

  useEffect(() => {
    const checkBiometricsEnabled = async () => {
      const isEnabled = await AsyncStorage.getItem('isBiometricsEnabled')
      setIsBiometricsEnabled(isEnabled === 'true' ? true : false)
    }
    checkBiometricsEnabled()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      {isBiometricsComplete || !isBiometricsEnabled ? (
        <View style={GlobalStyle['*']}>
          <AppProvider>
            <RootNavigator />
          </AppProvider>
        </View>
      ) : (
        <PINScreen onPinComplete={onPinComplete} />
      )}
    </ThemeProvider>
  )
}
