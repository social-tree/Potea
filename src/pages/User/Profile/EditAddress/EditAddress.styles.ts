import { HeadingFour, HeadingSix } from 'src/styles/utils/typography'

import MapView from 'react-native-maps'
import styled from 'styled-components/native'

export const Line = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.darkColors.dark3};
`

export const InputLabel = styled.Text`
  ${HeadingSix}
  color: ${({ theme }) => theme.other.white}
`

export const InputContainer = styled.View`
  display: flex;
  gap: 16px;
`

export const Title = styled.Text`
  ${HeadingFour}
  color: ${({ theme }) => theme.other.white};
  text-align: center;
`

export const BottomSheetContainer = styled.View`
  padding: 20px;
  display: flex;
  gap: 20px;
`

export const ShippingMapView = styled(MapView)`
  flex: 1;
  margin-bottom: 406px;
`
