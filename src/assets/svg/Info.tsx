import { Path, Svg, SvgProps } from 'react-native-svg'

import React from 'react'

export const Info = (props: SvgProps) => {
  return (
    <Svg width="20" height="21" viewBox="0 0 20 21" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.25 10.5C19.25 17.437 16.937 19.75 10 19.75C3.063 19.75 0.75 17.437 0.75 10.5C0.75 3.563 3.063 1.25 10 1.25C16.937 1.25 19.25 3.563 19.25 10.5Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 14.3955V10.5005"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.0045 7H9.9955"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
