import { Image, SafeAreaView, StatusBar, Text } from 'react-native'
import { Input } from 'src/components/Form/Elements/Input'
import { Button } from 'src/components/Elements/Button'
import { theme } from 'src/styles/theme'
import { Container } from './Welcome.styles'

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
