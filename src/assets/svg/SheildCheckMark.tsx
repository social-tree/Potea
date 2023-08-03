import { Path, Svg, SvgProps } from 'react-native-svg'

import React from 'react'

export const SheildCheckMark = (props: SvgProps) => {
  return (
    <Svg width="18" height="21" viewBox="0 0 18 21" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.98457 20.1055C11.3196 20.1055 16.6566 17.7835 16.6566 11.3785C16.6566 4.97449 16.9346 4.47349 16.3196 3.85749C15.7036 3.24149 12.4936 1.25049 8.98457 1.25049C5.47557 1.25049 2.26557 3.24149 1.65057 3.85749C1.03457 4.47349 1.31257 4.97449 1.31257 11.3785C1.31257 17.7835 6.65057 20.1055 8.98457 20.1055Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.38672 10.3746L8.27872 12.2696L12.1767 8.36963"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
