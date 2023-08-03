import { Path, Svg, SvgProps } from 'react-native-svg'

import React from 'react'

export const Bell = (props: SvgProps) => {
  return (
    <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9947 2.93323C8.82139 2.93323 6.57361 7.61767 6.57361 10.7143C6.57361 13.0288 6.90917 12.3477 5.62806 15.171C4.06361 19.1943 10.3547 20.8388 13.9947 20.8388C17.6336 20.8388 23.9247 19.1943 22.3614 15.171C21.0803 12.3477 21.4158 13.0288 21.4158 10.7143C21.4158 7.61767 19.1669 2.93323 13.9947 2.93323Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.6888 23.9309C15.1788 25.6176 12.8233 25.6376 11.2988 23.9309"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
