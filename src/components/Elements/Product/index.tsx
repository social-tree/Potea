import { RatingStar } from 'src/assets/svg/RatingStar'
import {
  AmountSoldText,
  Container,
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

interface Props {
  image: string
  name: string
  rating: number
  soldAmount: number
  price: number
  size?: 'normal' | 'large'
}

export const Product = ({
  image,
  name,
  size,
  rating,
  price,
  soldAmount,
}: Props) => {
  return (
    <Container size={size}>
      <ImageContainer>
        <ProductImage size={size} source={{ uri: image }} />
        <StyledHeart
          width={size === 'large' ? '24' : '15'}
          size={size === 'large' ? '22' : '15'}
          stroke={theme.primary[500]}
        />
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
