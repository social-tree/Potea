import { Path, Svg, SvgProps } from 'react-native-svg'

export const CreditCard = (props: SvgProps) => {
  return (
    <Svg width="28" height="28" viewBox="0 0 28 28" fill="none" {...props}>
      <Path
        d="M23.334 4.66669H4.66732C3.38048 4.66669 2.33398 5.71319 2.33398 7.00002V21C2.33398 22.2869 3.38048 23.3334 4.66732 23.3334H23.334C24.6208 23.3334 25.6673 22.2869 25.6673 21V7.00002C25.6673 5.71319 24.6208 4.66669 23.334 4.66669ZM4.66732 7.00002H23.334V9.33335H4.66732V7.00002ZM4.66732 21V14H23.3351L23.3363 21H4.66732Z"
        fill="white"
      />
      <Path d="M7 16.3333H14V18.6666H7V16.3333Z" fill="white" />
    </Svg>
  )
}
