import { Path, Svg, SvgProps } from 'react-native-svg'

export const User = (props: SvgProps) => {
  return (
    <Svg width="20" height="24" viewBox="0 0 20 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.1757 6.50621C16.1757 9.93274 13.4283 12.6803 9.99935 12.6803C6.57156 12.6803 3.82303 9.93274 3.82303 6.50621C3.82303 3.07967 6.57156 0.333313 9.99935 0.333313C13.4283 0.333313 16.1757 3.07967 16.1757 6.50621ZM9.99935 23.6666C4.93879 23.6666 0.666016 22.8441 0.666016 19.6708C0.666016 16.4962 4.96563 15.7029 9.99935 15.7029C15.0611 15.7029 19.3327 16.5254 19.3327 19.6988C19.3327 22.8733 15.0331 23.6666 9.99935 23.6666Z"
        fill="white"
      />
    </Svg>
  )
}
