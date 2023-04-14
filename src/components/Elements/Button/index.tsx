import { ButtonProps } from 'react-native-elements'
import { View } from 'react-native'
import { StyledButton, StyledText } from './Button.styles'
import { Loading } from 'src/assets/animations/Loading'

interface Props extends ButtonProps {
  loading?: boolean
}

export const Button = ({ children, loading, ...props }: Props) => {
  return (
    <StyledButton loading={loading} {...props}>
      {loading ? (
        <View style={{ height: 50, width: 50 }}>
          <Loading />
        </View>
      ) : (
        <StyledText>{children}</StyledText>
      )}
    </StyledButton>
  )
}
