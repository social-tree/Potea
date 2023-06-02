import React, { useState } from 'react'

import { AppProvider } from 'src/contexts/AppContext'
import GlobalStyle from 'src/styles/GlobalStyle'
import { RootNavigator } from 'src/navigators/RootNavigator'
import { ThemeProvider } from 'styled-components/native'
import { View } from 'react-native'
import { theme } from 'src/styles/theme'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <ThemeProvider theme={theme}>
      <View style={GlobalStyle['*']}>
        <AppProvider>
          <RootNavigator loading={loading} setLoading={setLoading} />
        </AppProvider>
      </View>
    </ThemeProvider>
  )
}
