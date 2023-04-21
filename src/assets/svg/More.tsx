import { Path, Svg, SvgProps } from 'react-native-svg'

export const More = (props: SvgProps) => {
  return (
    <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.0007 3.2085C19.96 3.2085 24.7923 8.03966 24.7923 14.0002C24.7923 19.9595 19.96 24.7918 14.0007 24.7918C8.04015 24.7918 3.20898 19.9595 3.20898 14.0002C3.20898 8.04083 8.04132 3.2085 14.0007 3.2085Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.5957 14.0152H18.6062"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.9199 14.0152H13.9304"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.24215 14.0152H9.25265"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
