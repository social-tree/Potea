import * as Styled from './MiniCard'

import { Shadow, ShadowProps } from 'react-native-shadow-2'
import { TouchableOpacityProps, ViewProps } from 'react-native'

import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'

interface Props extends TouchableOpacityProps {
  shadowProps?: ShadowProps
}

export const MiniCard = ({ children, shadowProps, ...props }: Props) => {
  return (
    <Shadow
      stretch
      style={{ borderRadius: 24 }}
      startColor="#00000037"
      {...shadowProps}
    >
      <Styled.ShippingTypeContainer {...props}>
        {children}
      </Styled.ShippingTypeContainer>
    </Shadow>
  )
}
