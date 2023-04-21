import { RatingStar } from 'src/assets/svg/RatingStar'
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
import React from 'react'
import { theme } from 'src/styles/theme'
import { productType } from 'src/types/product'

interface Props {
  image: string
  name: string
  rating: number
  soldAmount: number
  price: number
  liked: boolean
  size?: 'normal' | 'large'
  id: number
  handleAddToFavorites?: (product: productType) => void
}

export const Product = ({
  image,
  name,
  size,
  rating,
  price,
  liked,
  soldAmount,
  handleAddToFavorites,
  id,
}: Props) => {
  return (
    <Container size={size}>
      <ImageContainer>
        <ProductImage size={size} source={{ uri: image }} />
        <HeartButton
          onPress={() =>
            handleAddToFavorites({ image, id, name, rating, price, soldAmount })
          }
        >
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
