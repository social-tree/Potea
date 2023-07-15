import * as Styled from './Product.styles'

import { productType, productWithRatingType } from 'src/types/product'

import { HomeStackParamList } from 'src/navigators/HomeNavigator/HomeNavigator.types'
import { RatingStar } from 'src/assets/svg/RatingStar'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { TouchableHighlight } from 'react-native'
import { theme } from 'src/styles/theme'
import { useNavigation } from '@react-navigation/native'

interface Props {
  size?: 'normal' | 'large'
  handleAddToFavorites?: (product: productType) => void
  style?: any
  liked: boolean
  product: productWithRatingType
}

export const Product = ({
  product,
  handleAddToFavorites,
  liked,
  size,
  ...props
}: Props) => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>()
  const { image, id, name, average_rating, price, sold_amount } = product

  return (
    <Styled.Container
      {...props}
      size={size}
      onPress={() => navigation.navigate('Product', { id })}
    >
      <Styled.ImageContainer>
        <Styled.ProductImage size={size} source={{ uri: image[0] }} />
        <Styled.HeartButton onPress={() => handleAddToFavorites(product)}>
          <Styled.StyledHeart
            width={size === 'large' ? '24' : '15'}
            size={size === 'large' ? '22' : '15'}
            stroke={liked ? theme.primary[500] : theme.other.white}
          />
        </Styled.HeartButton>
      </Styled.ImageContainer>
      <Styled.Title size={size}>{name}</Styled.Title>
      <Styled.InfoContainer>
        <RatingStar />
        <Styled.RatingText size={size}>{average_rating || 0}</Styled.RatingText>
        <Styled.RatingText size={size}>|</Styled.RatingText>
        <Styled.AmountSoldText size={size}>
          {sold_amount || 0} Sold
        </Styled.AmountSoldText>
      </Styled.InfoContainer>
      <Styled.Price size={size}>$ {price}</Styled.Price>
    </Styled.Container>
  )
}
