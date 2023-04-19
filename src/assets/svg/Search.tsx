import { Circle, Path, Svg, SvgProps } from 'react-native-svg'

export const Search = (props: SvgProps) => {
  return (
    <Svg {...props} width="18" height="19" viewBox="0 0 18 19" fill="none">
      <Circle
        cx="8.80492"
        cy="8.80553"
        r="7.49047"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.0156 14.4043L16.9523 17.3334"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
