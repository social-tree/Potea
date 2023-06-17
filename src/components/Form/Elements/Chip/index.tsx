import * as Styled from './Chip.styles'

import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import React from 'react'

interface Props extends TouchableOpacityProps {
  text: string | JSX.Element
  selected: boolean
}

export const Chip = ({ text, selected, ...props }: Props) => {
  return (
    <Styled.ChipTouchableOpacity selected={selected} {...props}>
      {typeof text !== 'string' ? (
        text
      ) : (
        <Styled.ChipText selected={selected}>{text}</Styled.ChipText>
      )}
    </Styled.ChipTouchableOpacity>
  )
}
