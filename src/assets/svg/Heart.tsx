import { Path, Svg, SvgProps } from 'react-native-svg'

export const Heart = ({ fill, stroke, ...props }: SvgProps) => {
  return (
    <Svg width="24" height="22" {...props} viewBox="0 0 24 22" fill={fill}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.40829 11.5207C0.156461 7.61234 1.62063 2.75318 5.72379 1.43251C7.88213 0.736012 10.5456 1.31701 12.0588 3.40418C13.4856 1.24001 16.2261 0.740679 18.3821 1.43251C22.4841 2.75318 23.9565 7.61234 22.7058 11.5207C20.7575 17.7157 13.9593 20.9427 12.0588 20.9427C10.1595 20.9427 3.42196 17.788 1.40829 11.5207Z"
        stroke={stroke || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.4199 5.82471C17.8281 5.96937 18.7089 7.08587 18.6564 8.65037"
        stroke={stroke || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
