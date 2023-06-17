import { Path, Svg, SvgProps } from 'react-native-svg'

import React from 'react'

export const Plus = (props: SvgProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M19 11.7C19 11.3134 18.6866 11 18.3 11H13.7C13.3134 11 13 10.6866 13 10.3V5.7C13 5.3134 12.6866 5 12.3 5H11.7C11.3134 5 11 5.3134 11 5.7V10.3C11 10.6866 10.6866 11 10.3 11H5.7C5.3134 11 5 11.3134 5 11.7V12.3C5 12.6866 5.3134 13 5.7 13H10.3C10.6866 13 11 13.3134 11 13.7V18.3C11 18.6866 11.3134 19 11.7 19H12.3C12.6866 19 13 18.6866 13 18.3V13.7C13 13.3134 13.3134 13 13.7 13H18.3C18.6866 13 19 12.6866 19 12.3V11.7Z"
        fill="white"
      />
    </Svg>
  )
}