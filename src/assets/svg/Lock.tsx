import { Path, Svg, SvgProps } from 'react-native-svg'

import React from 'react'

export const Lock = (props: SvgProps) => {
  return (
    <Svg width="18" height="21" viewBox="0 0 18 21" fill="none">
      <Path
        d="M13.4706 7.90335V5.75435C13.4396 3.23535 11.3716 1.21935 8.85361 1.25035C6.38661 1.28135 4.39161 3.26735 4.34961 5.73435V7.90335"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.91016 12.6562V14.8772"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.91 7.32422C3.165 7.32422 1.25 8.89222 1.25 13.5952C1.25 18.2992 3.165 19.8672 8.91 19.8672C14.655 19.8672 16.571 18.2992 16.571 13.5952C16.571 8.89222 14.655 7.32422 8.91 7.32422Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
