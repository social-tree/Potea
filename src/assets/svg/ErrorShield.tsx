import { Circle, Path, Svg, SvgProps } from 'react-native-svg'

import React from 'react'

export const ErrorShield = (props: SvgProps) => {
  return (
    <Svg width="181" height="180" viewBox="0 0 181 180" fill="none" {...props}>
      <Circle cx="90.4668" cy="90.5" r="70.5" fill="#F75555" />
      <Circle cx="173.433" cy="27.5" r="7.5" fill="#F75555" />
      <Circle cx="15" cy="10" r="10" fill="#F75555" />
      <Circle cx="5" cy="133" r="5" fill="#F75555" />
      <Circle cx="160.5" cy="160.5" r="2.5" fill="#F75555" />
      <Circle cx="101.5" cy="4.5" r="2.5" fill="#F75555" />
      <Circle cx="57.5" cy="176.5" r="3.5" fill="#F75555" />
      <Circle cx="117" cy="171" r="1" fill="#F75555" />
      <Circle cx="165.5" cy="110.5" r="2.5" fill="#F75555" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M79.8548 65.9146H101.169C109.502 65.9146 115.083 71.7654 115.083 80.4679V100.555C115.083 109.233 109.502 115.081 101.169 115.081H79.8548C71.521 115.081 65.916 109.233 65.916 100.555V80.4679C65.916 71.7654 71.521 65.9146 79.8548 65.9146ZM97.8989 97.8729C98.7348 97.0395 98.7348 95.6874 97.8989 94.8516L93.5231 90.4758L97.8989 86.0975C98.7348 85.2641 98.7348 83.8874 97.8989 83.0516C97.0631 82.2133 95.711 82.2133 94.8506 83.0516L90.4993 87.425L86.1235 83.0516C85.2631 82.2133 83.911 82.2133 83.0752 83.0516C82.2393 83.8874 82.2393 85.2641 83.0752 86.0975L87.451 90.4758L83.0752 94.827C82.2393 95.6874 82.2393 97.0395 83.0752 97.8729C83.4931 98.2908 84.0585 98.5145 84.5993 98.5145C85.1648 98.5145 85.7056 98.2908 86.1235 97.8729L90.4993 93.5241L94.8752 97.8729C95.2931 98.3178 95.8339 98.5145 96.3748 98.5145C96.9402 98.5145 97.481 98.2908 97.8989 97.8729Z"
        fill="white"
      />
    </Svg>
  )
}
