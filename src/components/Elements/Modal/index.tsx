import * as Styled from './Modal.styles'

import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'

interface Props {
  children?: JSX.Element | JSX.Element[]
  onClose?: () => void
  open: boolean
}

export const Modal = ({ onClose, open, children }: Props) => {
  return (
    <Styled.Container open={open}>
      <TouchableWithoutFeedback
        touchSoundDisabled={true}
        onPress={() => onClose && onClose()}
      >
        <Styled.BackShadowDrop />
      </TouchableWithoutFeedback>
      <Styled.ModalContainer>{children}</Styled.ModalContainer>
    </Styled.Container>
  )
}
