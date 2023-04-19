import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { TagText } from './Tag.styles'

interface Props extends TouchableOpacityProps {
  text: string
  selected: boolean
}

export const Tag = ({ text, selected, ...props }: Props) => {
  return (
    <TouchableOpacity {...props}>
      <TagText selected={selected}>{text}</TagText>
    </TouchableOpacity>
  )
}
