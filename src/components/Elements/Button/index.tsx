import * as Styled from './Button.styles'

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
    <Styled.Container
      startColor={shadowColor || `${theme.primary[500]}20`}
      style={{ borderRadius: 15 }}
      offset={[0, 0]}
      disabled={!enableShadow}
      {...shadowProps}
    >
      <Styled.StyledTouchableOpacity loading={loading} {...props}>
        {loading ? (
          <View style={{ height: 50, width: 50 }}>
            <Loading />
          </View>
        ) : (
          <Styled.StyledText {...textProps}>{children}</Styled.StyledText>
        )}
      </Styled.StyledTouchableOpacity>
    </Styled.Container>
  )
}
