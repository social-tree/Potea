import {
  AmountSoldText,
  ButtonContent,
  Container,
  Description,
  DotsContainer,
  InfoBottomBar,
  InfoTitle,
  InfoTopBar,
  PriceContainer,
  PriceTitle,
  PriceValue,
  ProductImage,
  ProductImageContaiener,
  ProductInfoContainer,
  ProductTitle,
  PurchaseContainer,
  PurchaseText,
  QuantityContainer,
  ReviewText,
} from './Product.styles'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import { Bag } from 'src/assets/svg/Bag'
import { Button } from 'src/components/Elements/Button'
import Carousel from 'react-native-reanimated-carousel'
import { Dimensions } from 'react-native'
import Dots from 'react-native-dots-pagination'
import { Heart } from 'src/assets/svg/Heart'
import { Quantity } from 'src/components/Form/Elements/Quantity'
import { RatingStar } from 'src/assets/svg/RatingStar'
import { StackScreenProps } from '@react-navigation/stack'
import { getProduct } from 'src/api/products'
import { productType } from 'src/types/product'
import { theme } from 'src/styles/theme'
import { useHideTab } from 'src/hooks/useHideTab'

export const Product = ({ route }: StackScreenProps<{}>) => {
  useHideTab({ hide: true })
  const { setModalErrorText } = useContext(AppContext)
  const width = Dimensions.get('window').width
  const [productInfo, setProductInfo] = useState({
    id: 0,
    image: [''],
    name: '',
    price: 0,
    rating: 0,
    soldAmount: 0,
  })
  const carouselRef = useRef(null)
  const { id } = route.params
  const [focusedImage, setFocusedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  useEffect(() => {
    const getProductInfo = async () => {
      try {
        const { data, error } = await getProduct({ id: id })

        if (data) setProductInfo(data as productType)
        if (error)
          setModalErrorText(
            `An error occurred while trying to get product information. error code: ${error.code}`
          )
      } catch (err) {
        console.log(err.message, 'w')
        setModalErrorText(err.message)
      }
    }
    getProductInfo()
  }, [id])

  const handleQuantity = (type: 'add' | 'rem') => {
    type === 'add' && setQuantity((prev) => prev + 1)
    type === 'rem' && quantity !== 1 && setQuantity((prev) => prev - 1)
  }

  return (
    <Container>
      <ProductImageContaiener>
        <Carousel
          ref={carouselRef}
          width={width}
          height={500}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          data={productInfo?.image}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => setFocusedImage(index)}
          renderItem={({ index, item }) => (
            <ProductImage source={{ uri: item }} />
          )}
        />
        <DotsContainer>
          <Dots
            activeColor={theme.primary[500]}
            passiveColor={theme.darkColors.dark2}
            alignDotsOnXAxis
            activeDotWidth={32}
            active={focusedImage}
            length={productInfo.image.length}
          />
        </DotsContainer>
      </ProductImageContaiener>

      <ProductInfoContainer>
        <InfoTopBar>
          <ProductTitle>{productInfo.name}</ProductTitle>
          <Heart stroke={theme.primary[500]} />
        </InfoTopBar>
        <InfoBottomBar>
          <AmountSoldText>{productInfo.soldAmount} Sold</AmountSoldText>
          <RatingStar />
          <ReviewText>
            {productInfo.rating} (
            {(productInfo.soldAmount > 200
              ? productInfo.soldAmount - 49
              : productInfo.soldAmount
            ).toLocaleString()}{' '}
            reviews)
          </ReviewText>
        </InfoBottomBar>
        <InfoTitle>Description</InfoTitle>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit.
        </Description>
        <QuantityContainer>
          <InfoTitle>Quantity</InfoTitle>
          <Quantity handleQuantity={handleQuantity} value={quantity} />
        </QuantityContainer>
        <PurchaseContainer>
          <PriceContainer>
            <PriceTitle>Total price</PriceTitle>
            <PriceValue>${productInfo.price}</PriceValue>
          </PriceContainer>
          <Button enableShadow={true}>
            <ButtonContent>
              <Bag />
              <PurchaseText>Add to Cart</PurchaseText>
            </ButtonContent>
          </Button>
        </PurchaseContainer>
      </ProductInfoContainer>
    </Container>
  )
}
