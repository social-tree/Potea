import { Path, Svg, SvgProps } from 'react-native-svg'

import React from 'react'

export const Trash = (props: SvgProps) => {
  return (
    <Svg width="19" height="21" viewBox="0 0 19 21" fill="none" {...props}>
      <Path
        d="M15.8889 8.05408C15.8889 16.0731 17.0432 19.6979 9.27942 19.6979C1.51466 19.6979 2.69276 16.0731 2.69276 8.05408"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.3653 4.97985H1.21484"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.7158 4.97983C12.7158 4.97983 13.2444 1.21411 9.29009 1.21411C5.33676 1.21411 5.86533 4.97983 5.86533 4.97983"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
