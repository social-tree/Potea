import {
  HeadingFour,
  ParagraphL,
  ParagraphS,
} from 'src/styles/utils/typography'

import { Animated } from 'react-native'
import { Button } from 'src/components/Elements/Button'
import { Loading } from 'src/assets/animations/Loading'
import { Shadow } from 'react-native-shadow-2'
import { keyframes } from 'styled-components'
import styled from 'styled-components/native'

export const UpdatingProductsText = styled.Text`
  color: ${({ theme }) => theme.other.white};
  ${ParagraphL}
  margin-right: 30px;
`

export const UpdatingProductsLoading = styled(Loading)`
  height: 60px;
  width: 60px;
`

export const UpdatingProducts = styled(Animated.View)`
  position: absolute;
  z-index: 10000000000000;
  width: 100%;
`

export const UpdatingProductsShadow = styled(Shadow)`
  height: 60px;
  position: absolute;
  width: 100%;
  background-color: ${({ theme }) => theme.darkColors.dark1};
  width: 100%;
  max-height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const TotalPriceValue = styled.Text`
  ${HeadingFour}
  color: ${({ theme }) => theme.other.white}
`

export const TotalPriceLabel = styled.Text`
  ${ParagraphS}
  color: ${({ theme }) => theme.other.white}
`

export const TotalPrice = styled.View`
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
`

export const CheckoutButton = styled(Button)`
  min-width: 0px;
`

export const BottomSheetContainer = styled.View`
  padding: 0px 20px;
  display: flex;
  flex-direction: row;
  gap: 32px;
  justify-content: center;
  flex: 1;
  align-items: center;
`

export const Container = styled.ScrollView`
  padding: 12px 24px;
  flex: 1;
`
