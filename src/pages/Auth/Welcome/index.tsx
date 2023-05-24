import { SafeAreaView, StatusBar } from 'react-native'

import { Button } from 'src/components/Elements/Button'
import { Container } from './Welcome.styles'
import { Input } from 'src/components/Form/Elements/Inputs/Input'
import React from 'react'
import { theme } from 'src/styles/theme'

export const Welcome = ({ navigation }) => {
  return (
    <SafeAreaView>
      <StatusBar />
      <Container>
        <Button
          style={{
            shadowColor: `${theme.primary[500]}90`,
            shadowOpacity: 1,
            elevation: 40,
          }}
          onPress={() => navigation.navigate('AuthMethod')}
        >
          Next
        </Button>
      </Container>
    </SafeAreaView>
  )
}
