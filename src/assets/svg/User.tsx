import { Path, Svg, SvgProps } from 'react-native-svg'

import React from 'react'

export const User = (props: SvgProps) => {
  return (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.4952 7.29105C17.4952 10.2281 15.1403 12.5831 12.2012 12.5831C9.26307 12.5831 6.90719 10.2281 6.90719 7.29105C6.90719 4.35402 9.26307 2 12.2012 2C15.1403 2 17.4952 4.35402 17.4952 7.29105ZM12.2012 22C7.86355 22 4.20117 21.295 4.20117 18.575C4.20117 15.8539 7.88655 15.1739 12.2012 15.1739C16.5398 15.1739 20.2012 15.8789 20.2012 18.599C20.2012 21.32 16.5158 22 12.2012 22Z"
        fill={props.fill || '#9E9E9E'}
      />
    </Svg>
  )
}
