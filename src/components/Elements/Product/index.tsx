import {
  AmountSoldText,
  Container,
  HeartButton,
  ImageContainer,
  InfoContainer,
  Price,
  ProductImage,
  Rating,
  RatingText,
  StyledHeart,
  Title,
} from './Product.styles'
import React, { useState } from 'react'

import { HomeStackParamList } from 'src/navigators/HomeNavigator/HomeNavigator.types'
import { RatingStar } from 'src/assets/svg/RatingStar'
import { StackNavigationProp } from '@react-navigation/stack'
import { TouchableHighlight } from 'react-native'
import { productType } from 'src/types/product'
import { theme } from 'src/styles/theme'
import { useNavigation } from '@react-navigation/native'

interface Props {
  size?: 'normal' | 'large'
  handleAddToFavorites?: (product: productType) => void
  style?: any
  liked: boolean
  product: productType
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
    <Container
      {...props}
      size={size}
      onPress={() => navigation.navigate('Product', { id })}
    >
      <ImageContainer>
        <ProductImage size={size} source={{ uri: image[0] }} />
        <HeartButton onPress={() => handleAddToFavorites(product)}>
          <StyledHeart
            width={size === 'large' ? '24' : '15'}
            size={size === 'large' ? '22' : '15'}
            stroke={liked ? theme.primary[500] : theme.other.white}
          />
        </HeartButton>
      </ImageContainer>
      <Title size={size}>{name}</Title>
      <InfoContainer>
        <RatingStar />
        <RatingText size={size}>{average_rating || 0}</RatingText>
        <RatingText size={size}>|</RatingText>
        <AmountSoldText size={size}>{sold_amount || 0} Sold</AmountSoldText>
      </InfoContainer>
      <Price size={size}>$ {price}</Price>
    </Container>
  )
}
