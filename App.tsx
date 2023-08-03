import React, { useState } from 'react'

import { AppProvider } from 'src/contexts/AppContext'
import { Buffer } from 'buffer'
import GlobalStyle from 'src/styles/GlobalStyle'
import { RootNavigator } from 'src/navigators/RootNavigator'
import { ThemeProvider } from 'styled-components/native'
import { View } from 'react-native'
import { theme } from 'src/styles/theme'

global.Buffer = Buffer
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <View style={GlobalStyle['*']}>
        <AppProvider>
          <RootNavigator />
        </AppProvider>
      </View>
    </ThemeProvider>
  )
}
