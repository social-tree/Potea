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
import { HomeStackParamList } from 'src/navigators/HomeNavigator/HomeNavigator.types'
import { Quantity } from 'src/components/Form/Elements/Quantity'
import { RatingStar } from 'src/assets/svg/RatingStar'
import { StackScreenProps } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getProduct } from 'src/api/products'
import { productType } from 'src/types/product'
import { theme } from 'src/styles/theme'
import { useHideTab } from 'src/hooks/useHideTab'

export const Product = ({
  route,
  navigation,
}: StackScreenProps<HomeStackParamList, 'Product'>) => {
  useHideTab({ hide: true })
  const { setModalErrorText } = useContext(AppContext)
  const width = Dimensions.get('window').width
  const [productInfo, setProductInfo] = useState<productType>({
    id: 0,
    image: [''],
    name: '',
    price: 0,
    description: '',
    sold_amount: 0,
    count: 0,
    average_rating: 0,
    reviews_amount: 0,
  })
  const { addProductToFavorites, favoriteProducts } = useContext(AppContext)
  const carouselRef = useRef(null)
  const { id } = route.params
  const [focusedImage, setFocusedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  useEffect(() => {
    const getProductInfo = async () => {
      const { data, error } = await getProduct({ id: id })
      if (data) setProductInfo(data as productType)
      if (error)
        setModalErrorText(
          `An error occurred while trying to get product information. error code: ${error.code}`
        )
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
          <TouchableOpacity onPress={() => addProductToFavorites(productInfo)}>
            <Heart
              stroke={
                !!favoriteProducts.get(id)
                  ? theme.primary[500]
                  : theme.other.white
              }
            />
          </TouchableOpacity>
        </InfoTopBar>
        <InfoBottomBar>
          <AmountSoldText>{productInfo.sold_amount} Sold</AmountSoldText>
          <RatingStar />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Reviews', {
                name: `${productInfo.average_rating} (${productInfo.reviews_amount} reviews)`,
                productId: productInfo.id,
                reviewsAmount: productInfo.reviews_amount,
              })
            }
          >
            <ReviewText>
              {productInfo.average_rating} (
              {productInfo.reviews_amount?.toLocaleString()} reviews)
            </ReviewText>
          </TouchableOpacity>
        </InfoBottomBar>
        <InfoTitle>Description</InfoTitle>
        <Description>{productInfo.description}</Description>
        <QuantityContainer>
          <InfoTitle>Quantity</InfoTitle>
          <Quantity handleQuantity={handleQuantity} value={quantity} />
        </QuantityContainer>
        <PurchaseContainer>
          <PriceContainer>
            <PriceTitle>Total price</PriceTitle>
            <PriceValue>${productInfo.price}</PriceValue>
          </PriceContainer>
          <Button
            shadowProps={{ containerStyle: { flex: 1 } }}
            enableShadow={true}
          >
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
