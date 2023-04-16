import GlobalStyle from 'src/styles/GlobalStyle'
import { ThemeProvider } from 'styled-components/native'
import { View } from 'react-native'
import { theme } from 'src/styles/theme'
import React, { useState } from 'react'
import { AppProvider } from 'src/contexts/AppContext'
import { RootNavigator } from 'src/navigators/RootNavigator'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <ThemeProvider theme={theme}>
      <View style={GlobalStyle['*']}>
        <AppProvider>
          <RootNavigator setLoading={setLoading} />
        </AppProvider>
      </View>
    </ThemeProvider>
  )
}
