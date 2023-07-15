import * as CartStyles from '../Cart.styles'
import * as Styled from './Checkout.styles'

import { FlatList, View } from 'react-native'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { Animated } from 'react-native'
import { AppContext } from 'src/contexts/AppContext'
import { Arrow } from 'src/assets/svg/Arrow'
import { BoldArrow } from 'src/assets/svg/BoldArrow'
import BottomSheet from '@gorhom/bottom-sheet'
import { Button } from 'src/components/Elements/Button'
import { CartStackParamList } from 'src/navigators/CartNavigator/CartNavigator.types'
import { Easing } from 'react-native'
import { EditPen } from 'src/assets/svg/EditPen'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MiniCard } from 'src/components/Elements/MiniCard'
import { MiniProduct } from 'src/components/Elements/MiniProduct'
import { Shadow } from 'react-native-shadow-2'
import { ShippingTypeType } from 'src/types/shippingTypes'
import { StackScreenProps } from '@react-navigation/stack'
import { getProductsFromCart } from 'src/api/cart'
import { productWithQuantityType } from 'src/types/product'
import { theme } from 'src/styles/theme'

export const Checkout = ({
  navigation,
  route,
}: StackScreenProps<CartStackParamList, 'Checkout'>) => {
  const [cartProducts, setCartProducts] = useState<
    productWithQuantityType[] | []
  >([])
  const [loading, setLoading] = useState(false)
  const [dots, setDots] = useState('.')
  const slideInAnim = useRef(new Animated.Value(-200)).current
  const { setModalErrorText } = useContext(AppContext)
  const selectedShippingType = route.params as ShippingTypeType
  console.log(selectedShippingType)

  const slidInAnimationHandler = useMemo(() => {
    return Animated.timing(slideInAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    })
  }, [slideInAnim])

  const totalCost = useMemo(() => {
    if (cartProducts?.length === 0) return
    let newTotalCost = 0
    cartProducts.map((product: productWithQuantityType) => {
      newTotalCost += product.quantity * product.price
    })
    return newTotalCost
  }, [cartProducts])

  useEffect(() => {
    if (!loading) return
    const interval =
      !loading &&
      setInterval(() => {
        setDots((prevDots) => {
          if (prevDots.length === 3) {
            return '.'
          } else {
            return prevDots + '.'
          }
        })
      }, 500)

    return () => clearInterval(interval)
  }, [loading])

  const toggleLoading = () => {
    setLoading((prev) => {
      if (prev) {
        slidInAnimationHandler.reset()
        return false
      } else {
        slidInAnimationHandler.start()
        return true
      }
    })
  }

  const getCartProducts = useCallback(async () => {
    toggleLoading()
    const { data, error } = await getProductsFromCart()
    if (error) {
      setModalErrorText(
        `There was an error when trying to get your cart items. Error code: ${error?.code}`
      )
      navigation.navigate('Cart')
    }
    if (!data && data.length <= 0) navigation.navigate('Cart')

    setCartProducts(data || [])
    toggleLoading()
  }, [])

  useEffect(() => {
    getCartProducts()
  }, [])

  return (
    <Styled.Container>
      <CartStyles.UpdatingProducts
        style={[{ transform: [{ translateY: slideInAnim }] }]}
      >
        <CartStyles.UpdatingProductsShadow
          stretch
          containerStyle={{
            elevation: 5000,
            zIndex: 5000,
          }}
          offset={[0, 10]}
          startColor="#00000090"
          sides={{ end: false, start: false, top: false, bottom: true }}
        >
          <CartStyles.UpdatingProductsLoading />
          <CartStyles.UpdatingProductsText>
            Updating Products{dots}
          </CartStyles.UpdatingProductsText>
        </CartStyles.UpdatingProductsShadow>
      </CartStyles.UpdatingProducts>
      <FlatList
        ListHeaderComponentStyle={{ gap: 24 }}
        contentContainerStyle={{
          gap: 24,
          paddingTop: 24,
          paddingHorizontal: 24,
          paddingBottom: 110,
        }}
        style={{ width: '100%' }}
        ListFooterComponentStyle={{ gap: 24 }}
        ListHeaderComponent={() => (
          <>
            <Styled.CheckoutTitle>Shipping Address</Styled.CheckoutTitle>
            <MiniCard onPress={() => navigation.navigate('ShippingAddress')}>
              <Shadow
                style={{ borderRadius: 20 }}
                distance={6}
                startColor={`${theme.primary[500]}20`}
                endColor={`${theme.primary[500]}20`}
              >
                <Styled.ShippingInfoIcon>
                  <Ionicons name="ios-location-sharp" size={20} color="white" />
                </Styled.ShippingInfoIcon>
              </Shadow>
              <Styled.ShippingInfo>
                <Styled.ShippingInfoTitle>Home</Styled.ShippingInfoTitle>
                <Styled.ShippingInfoAddress>
                  61480 Sunbrook Park, PC 5679
                </Styled.ShippingInfoAddress>
              </Styled.ShippingInfo>
              <EditPen />
            </MiniCard>
            <Styled.Line />
            <Styled.CheckoutTitle>Order List</Styled.CheckoutTitle>
          </>
        )}
        data={cartProducts}
        renderItem={({ item }) => (
          <MiniProduct
            productInfo={item}
            initialQuantity={item.quantity}
            disableChangeQuantity
            disableDelete
          />
        )}
        ListFooterComponent={() => (
          <>
            <Styled.Line />
            <Styled.CheckoutTitle>Choose Shipping</Styled.CheckoutTitle>
            <Styled.ChooseShippingButton
              onPress={() => navigation.navigate('ChooseShipping')}
            >
              <MaterialCommunityIcons
                name="truck"
                size={24}
                color={theme.primary[500]}
              />
              <Styled.ChooseShippingText>
                Choose Shipping Type{' '}
              </Styled.ChooseShippingText>
              <Arrow rotation={180} />
            </Styled.ChooseShippingButton>
            <Styled.Line />
            <Styled.TotalAmountContainer>
              <Styled.TotalAmountRow>
                <Styled.TotalAmountTitle>Amount</Styled.TotalAmountTitle>
                <Styled.TotalAmountValue>${totalCost}</Styled.TotalAmountValue>
              </Styled.TotalAmountRow>
              <Styled.TotalAmountRow>
                <Styled.TotalAmountTitle>Shipping</Styled.TotalAmountTitle>
                <Styled.TotalAmountValue>
                  {selectedShippingType?.price
                    ? `$${selectedShippingType?.price}`
                    : `-`}
                </Styled.TotalAmountValue>
              </Styled.TotalAmountRow>
              <Styled.Line />
              <Styled.TotalAmountRow>
                <Styled.TotalAmountTitle>Total</Styled.TotalAmountTitle>
                <Styled.TotalAmountValue>
                  {selectedShippingType?.price && totalCost
                    ? `$${selectedShippingType?.price + totalCost}`
                    : `-`}
                </Styled.TotalAmountValue>
              </Styled.TotalAmountRow>
            </Styled.TotalAmountContainer>
          </>
        )}
      />
      <BottomSheet
        backgroundStyle={{
          backgroundColor: theme.darkColors.dark1,
          borderRadius: 40,
          borderWidth: 1,
          borderColor: theme.darkColors.dark3,
        }}
        snapPoints={[110]}
        enableOverDrag={false}
        handleStyle={{ display: 'none' }}
      >
        <Styled.BottomSheetContainer>
          <Button
            shadowProps={{
              style: { borderRadius: 20 },
              containerStyle: { flex: 1, minWidth: undefined },
            }}
            enableShadow={!loading}
            loading={loading}
            disabled={cartProducts.length <= 0 || loading}
            onPress={() => navigation.navigate('Checkout')}
          >
            Continue to Payment
            <Styled.CheckoutBoldArrow>
              <BoldArrow />
            </Styled.CheckoutBoldArrow>
          </Button>
        </Styled.BottomSheetContainer>
      </BottomSheet>
    </Styled.Container>
  )
}
