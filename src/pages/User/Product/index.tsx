import * as Styled from './Product.styles'

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
import { addProductToCart } from 'src/api/cart'
import { getProduct } from 'src/api/products'
import { productType } from 'src/types/product'
import { theme } from 'src/styles/theme'
import { useHideTab } from 'src/hooks/useHideTab'

export const Product = ({
  route,
  navigation,
}: StackScreenProps<HomeStackParamList, 'Product'>) => {
  useHideTab({ hide: true })
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
  const { addProductToFavorites, favoriteProducts, setModalErrorText } = useContext(AppContext)
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

  const handleAddProductToCart = async () => {
    const { data, error } = await addProductToCart({ id, quantity })
    console.log(error)
    if (error) {
      setModalErrorText(
        `there was an error trying to add product to cart. error code: ${error.code}`
      )
    }
  }

  return (
    <Styled.Container>
      <Styled.ProductImageContaiener>
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
            <Styled.ProductImage source={{ uri: item }} />
          )}
        />
        <Styled.DotsContainer>
          <Dots
            activeColor={theme.primary[500]}
            passiveColor={theme.darkColors.dark2}
            alignDotsOnXAxis
            activeDotWidth={32}
            active={focusedImage}
            length={productInfo.image.length}
          />
        </Styled.DotsContainer>
      </Styled.ProductImageContaiener>

      <Styled.ProductInfoContainer>
        <Styled.InfoTopBar>
          <Styled.ProductTitle>{productInfo.name}</Styled.ProductTitle>
          <TouchableOpacity onPress={() => addProductToFavorites(productInfo)}>
            <Heart
              stroke={
                !!favoriteProducts.get(id)
                  ? theme.primary[500]
                  : theme.other.white
              }
            />
          </TouchableOpacity>
        </Styled.InfoTopBar>
        <Styled.InfoBottomBar>
          <Styled.AmountSoldText>
            {productInfo.sold_amount} Sold
          </Styled.AmountSoldText>
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
            <Styled.ReviewText>
              {productInfo.average_rating} (
              {productInfo.reviews_amount?.toLocaleString()} reviews)
            </Styled.ReviewText>
          </TouchableOpacity>
        </Styled.InfoBottomBar>
        <Styled.InfoTitle>Description</Styled.InfoTitle>
        <Styled.Description>{productInfo.description}</Styled.Description>
        <Styled.QuantityContainer>
          <Styled.InfoTitle>Quantity</Styled.InfoTitle>
          <Quantity handleQuantity={handleQuantity} value={quantity} />
        </Styled.QuantityContainer>
        <Styled.PurchaseContainer>
          <Styled.PriceContainer>
            <Styled.PriceTitle>Total price</Styled.PriceTitle>
            <Styled.PriceValue>${productInfo.price}</Styled.PriceValue>
          </Styled.PriceContainer>
          <Button
            shadowProps={{ containerStyle: { flex: 1 } }}
            enableShadow={true}
            onPress={() => handleAddProductToCart()}
          >
            <Styled.ButtonContent>
              <Bag fill={theme.other.white} />
              <Styled.PurchaseText>Add to Cart</Styled.PurchaseText>
            </Styled.ButtonContent>
          </Button>
        </Styled.PurchaseContainer>
      </Styled.ProductInfoContainer>
    </Styled.Container>
  )
}
