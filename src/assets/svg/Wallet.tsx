import { Path, Svg, SvgProps } from 'react-native-svg'

import React from 'react'

export const Wallet = ({ fill, stroke, ...props }) => {
  return (
    <Svg
      width="21"
      height="18"
      viewBox="0 0 21 18"
      fill="none"
      stroke={stroke === '#01B763' ? 'none' : stroke}
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.3705 5.3818H20.6016C20.6016 1.98459 18.566 0 15.1171 0H6.08601C2.63712 0 0.601562 1.98459 0.601562 5.33847V12.6615C0.601562 16.0154 2.63712 18 6.08601 18H15.1171C18.566 18 20.6016 16.0154 20.6016 12.6615V12.3495H16.3705C14.4068 12.3495 12.8149 10.7975 12.8149 8.883C12.8149 6.96849 14.4068 5.41647 16.3705 5.41647V5.3818ZM16.3705 6.87241H19.8549C20.2673 6.87241 20.6016 7.19834 20.6016 7.60039V10.131C20.5968 10.5311 20.2653 10.8543 19.8549 10.8589H16.4505C15.4563 10.872 14.587 10.2084 14.3616 9.26432C14.2486 8.67829 14.4072 8.07357 14.7946 7.61222C15.1821 7.15087 15.7589 6.88007 16.3705 6.87241ZM16.5216 9.53298H16.8505C17.2726 9.53298 17.6149 9.1993 17.6149 8.78767C17.6149 8.37605 17.2726 8.04237 16.8505 8.04237H16.5216C16.3196 8.04005 16.1252 8.11664 15.9815 8.25504C15.8379 8.39344 15.7571 8.58213 15.7571 8.77901C15.7571 9.19205 16.0979 9.52823 16.5216 9.53298ZM5.33934 5.3818H10.9838C11.406 5.3818 11.7482 5.04812 11.7482 4.63649C11.7482 4.22487 11.406 3.89119 10.9838 3.89119H5.33934C4.9206 3.89116 4.57977 4.2196 4.5749 4.62783C4.57487 5.04087 4.91572 5.37705 5.33934 5.3818Z"
        fill={fill || '#01B763'}
      />
    </Svg>
  )
}