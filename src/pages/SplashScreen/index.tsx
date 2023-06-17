import * as Styled from './SplashScreen.styles'

import React from 'react'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'react-native'

export const SplashScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <Styled.Container>
        <Styled.StyledLogo />
        <Styled.StyledLoading />
      </Styled.Container>
    </SafeAreaView>
  )
}
