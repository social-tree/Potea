import { Path, Svg, SvgProps } from 'react-native-svg'

import React from 'react'

export const Logout = (props: SvgProps) => {
  return (
    <Svg width="22" height="21" viewBox="0 0 22 21" fill="none" {...props}>
      <Path
        d="M20.791 10.6211H8.75"
        stroke="#F75555"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.8652 7.70508L20.7932 10.6211L17.8652 13.5371"
        stroke="#F75555"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.3613 6.13C15.0313 2.55 13.6913 1.25 8.36133 1.25C1.26033 1.25 1.26033 3.56 1.26033 10.5C1.26033 17.44 1.26033 19.75 8.36133 19.75C13.6913 19.75 15.0313 18.45 15.3613 14.87"
        stroke="#F75555"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
