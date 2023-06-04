import { Container, StyledText, StyledTouchableOpacity } from './Button.styles'
import { TextProps, TouchableOpacityProps } from 'react-native'

import { Loading } from 'src/assets/animations/Loading'
import React from 'react'
import { ShadowProps } from 'react-native-shadow-2'
import { View } from 'react-native'
import { theme } from 'src/styles/theme'

interface Props extends TouchableOpacityProps {
  loading?: boolean
  textProps?: TextProps
  enableShadow?: boolean
  shadowColor?: string
  shadowProps?: ShadowProps
}

export const Button = ({
  children,
  loading,
  textProps,
  enableShadow,
  shadowColor,
  shadowProps,
  ...props
}: Props) => {
  return (
    <Container
      startColor={enableShadow ? shadowColor || `${theme.primary[500]}15` : ''}
      style={{ borderRadius: 15 }}
      offset={[0, 0]}
      containerStyle={{ flex: 1 }}
      {...shadowProps}
    >
      <StyledTouchableOpacity loading={loading} {...props}>
        {loading ? (
          <View style={{ height: 50, width: 50 }}>
            <Loading />
          </View>
        ) : (
          <StyledText {...textProps}>{children}</StyledText>
        )}
      </StyledTouchableOpacity>
    </Container>
  )
}
