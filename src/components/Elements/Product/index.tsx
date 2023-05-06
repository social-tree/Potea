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

import { RatingStar } from 'src/assets/svg/RatingStar'
import React from 'react'
import { productType } from 'src/types/product'
import { theme } from 'src/styles/theme'

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
  const { image, id, name, rating, price, soldAmount } = product

  return (
    <Container {...props} size={size}>
      <ImageContainer>
        <ProductImage size={size} source={{ uri: image }} />
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
        <RatingText size={size}>{rating}</RatingText>
        <RatingText size={size}>|</RatingText>
        <AmountSoldText size={size}>{soldAmount} Sold</AmountSoldText>
      </InfoContainer>
      <Price size={size}>$ {price}</Price>
    </Container>
  )
}
