import { SafeAreaView, StatusBar } from 'react-native'

import { Button } from 'src/components/Elements/Button'
import { Container } from './Welcome.styles'
import { Input } from 'src/components/Form/Elements/Input'
import { theme } from 'src/styles/theme'

export const Welcome = () => {
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
        >
          Next
        </Button>
      </Container>
    </SafeAreaView>
  )
}
