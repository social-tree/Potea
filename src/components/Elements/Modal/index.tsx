import { BackShadowDrop, Container, ModalContainer } from './Modal.styles'
import { Touchable, TouchableWithoutFeedback } from 'react-native'

interface Props {
  children?: JSX.Element | JSX.Element[]
  onClose?: () => void
  open: boolean
}

export const Modal = ({ onClose, open, children }: Props) => {
  return (
    <Container open={open}>
      <TouchableWithoutFeedback
        touchSoundDisabled={true}
        onPress={() => onClose && onClose()}
      >
        <BackShadowDrop />
      </TouchableWithoutFeedback>
      <ModalContainer>{children}</ModalContainer>
    </Container>
  )
}
