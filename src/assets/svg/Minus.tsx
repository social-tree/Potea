import { Path, Svg, SvgProps } from 'react-native-svg'

import React from 'react'

export const Minus = (props: SvgProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M5 11.7C5 11.3134 5.3134 11 5.7 11H18.3C18.6866 11 19 11.3134 19 11.7V12.3C19 12.6866 18.6866 13 18.3 13H5.7C5.3134 13 5 12.6866 5 12.3V11.7Z"
        fill="white"
      />
    </Svg>
  )
}
