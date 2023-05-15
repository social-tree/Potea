import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { ChipText } from './Chip.styles'

interface Props extends TouchableOpacityProps {
  text: string | JSX.Element
  selected: boolean
}

export const Chip = ({ text, selected, ...props }: Props) => {
  return (
    <TouchableOpacity {...props}>
      <ChipText selected={selected}>{text}</ChipText>
    </TouchableOpacity>
  )
}
