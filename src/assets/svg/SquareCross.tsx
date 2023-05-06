import { Path, Svg, SvgProps } from 'react-native-svg'

export const SquareCross = (props: SvgProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M14.7938 9.19394L9.20312 14.7846"
        stroke="#E0E0E0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.8012 14.792L9.20117 9.19196"
        stroke="#E0E0E0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.20898 12.0001C1.20898 20.0933 3.90748 22.7918 12.0007 22.7918C20.0938 22.7918 22.7923 20.0933 22.7923 12.0001C22.7923 3.90695 20.0938 1.20845 12.0007 1.20845C3.90748 1.20845 1.20898 3.90695 1.20898 12.0001Z"
        stroke="#E0E0E0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
