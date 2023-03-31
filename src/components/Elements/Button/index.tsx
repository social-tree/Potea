import { ButtonProps } from 'react-native-elements'
import { View } from 'react-native'
import { StyledLottieView } from 'src/pages/SplashScreen/SplashScreen.styles'
import { theme } from 'src/styles/theme'
import { StyledButton, StyledText } from './Button.styles'

interface Props extends ButtonProps {
  loading?: boolean
}

export const Button = ({ children, loading, ...props }: Props) => {
  return (
    <StyledButton {...props}>
      {loading ? (
        <View style={{ height: 50, width: 50 }}>
          <StyledLottieView
            autoPlay
            colorFilters={[
              {
                keypath: 'Shape Layer 2',
                color: theme.secondary[500],
              },
              {
                keypath: 'Shape Layer 1',
                color: theme.secondary[500],
              },
            ]}
            loop
            source={require('src/assets/animations/loading.json')}
          />
        </View>
      ) : (
        <StyledText>{children}</StyledText>
      )}
    </StyledButton>
  )
}
