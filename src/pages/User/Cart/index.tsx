import * as SearchStyled from '../Search/Search.styles'
import * as Styled from './Cart.styles'

import { Animated, Easing } from 'react-native'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { changeCartProductQuantity, getProductsFromCart } from 'src/api/cart'
import { productType, productWithQuantityType } from 'src/types/product'

import { AppContext } from 'src/contexts/AppContext'
import { BoldArrow } from 'src/assets/svg/BoldArrow'
import BottomSheet from '@gorhom/bottom-sheet'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { CartStackParamList } from 'src/navigators/CartNavigator/CartNavigator.types'
import { ClipBoards } from 'src/assets/svg/Clipboards'
import { MiniProduct } from 'src/components/Elements/MiniProduct'
import { RemoveItemSheet } from './components/RemoveItemSheet'
import { Shadow } from 'react-native-shadow-2'
import { StackScreenProps } from '@react-navigation/stack'
import { theme } from 'src/styles/theme'
import { useHideTab } from 'src/hooks/useHideTab'

export const Cart = ({
  navigation,
}: StackScreenProps<CartStackParamList, 'Cart'>) => {
  const sheetRef = useRef<BottomSheetModalMethods>(null)
  const [selectedProduct, setSelectedProduct] =
    useState<productWithQuantityType | null>(null)
  const [cartProducts, setCartProducts] = useState<
    productWithQuantityType[] | []
  >([])
  const { setModalErrorText } = useContext(AppContext)
  const [dots, setDots] = useState('.')
  const [loading, setLoading] = useState(false)
  const slideInAnim = useRef(new Animated.Value(-200)).current
  useHideTab({ customStyles: { backgroundColor: theme.darkColors.dark1 } })

  const slidInAnimationHandler = useMemo(() => {
    return Animated.timing(slideInAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    })
  }, [slideInAnim])

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

  const handleProductDelete = (product: productWithQuantityType) => {
    sheetRef.current.present()
    setSelectedProduct(product)
  }

  const closeRemoveItemSheet = () => {
    sheetRef.current.close()
    setSelectedProduct(null)
  }

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

  const totalCost = useMemo(() => {
    if (cartProducts?.length === 0) return
    let newTotalCost = 0
    cartProducts.map((product: productWithQuantityType) => {
      newTotalCost += product.quantity * product.price
    })
    return newTotalCost
  }, [cartProducts])

  const getCartProducts = useCallback(async () => {
    toggleLoading()
    const { data, error } = await getProductsFromCart()
    if (error) {
      setModalErrorText(
        `There was an error when trying to get your cart items. Error code: ${error?.code}`
      )
    }
    setCartProducts(data ? data : [])
    toggleLoading()
  }, [])

  const handleRemoveProductRefresh = () => {
    getCartProducts()
    sheetRef.current.close()
  }

  useEffect(() => {
    if (loading) return
    const unsubscribe = navigation.addListener('focus', async () => {
      getCartProducts()
    })

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [navigation, loading])

  useEffect(() => {
    getCartProducts()
  }, [])

  useEffect(() => {
    if (!loading) return
    slidInAnimationHandler.start()
  }, [loading, slideInAnim])

  const handleQuantityChange = useCallback(
    async (id: number, type: 'rem' | 'add') => {
      toggleLoading()
      const { data, error } = await changeCartProductQuantity({
        id,
        type,
      })
      if (error || !data?.quantity) {
        setModalErrorText(
          `There was an error when trying to update the quantity. Error code: ${error?.code}`
        )
        toggleLoading()
        return
      }

      setCartProducts((prevProducts) => {
        const updatedProducts = prevProducts.map((product) => {
          if (product.id === id) {
            return { ...product, quantity: data.quantity }
          }
          return product
        })
        return updatedProducts
      })

      slidInAnimationHandler.reset()
      toggleLoading()

      return data.quantity
    },
    [setModalErrorText, setCartProducts, slidInAnimationHandler]
  )
  return (
    <>
      <Styled.UpdatingProducts
        style={[{ transform: [{ translateY: slideInAnim }] }]}
      >
        <Styled.UpdatingProductsShadow
          stretch
          containerStyle={{
            elevation: 5000,
            zIndex: 5000,
          }}
          offset={[0, 10]}
          startColor="#00000090"
          sides={{ end: false, start: false, top: false, bottom: true }}
        >
          <Styled.UpdatingProductsLoading />
          <Styled.UpdatingProductsText>
            Updating Products{dots}
          </Styled.UpdatingProductsText>
        </Styled.UpdatingProductsShadow>
      </Styled.UpdatingProducts>
      <Styled.Container
        contentContainerStyle={{
          gap: 24,
          display: 'flex',
          paddingTop: 20,
          paddingBottom: 50,
        }}
      >
        {cartProducts.length > 0 ? (
          cartProducts?.map((item: productWithQuantityType) => (
            <MiniProduct
              key={item.id}
              handleQuantityChange={handleQuantityChange}
              productInfo={item}
              initialQuantity={item.quantity}
              handleDelete={handleProductDelete}
            />
          ))
        ) : (
          <SearchStyled.NothingFoundContainer>
            <ClipBoards />
            <SearchStyled.NothingFoundInfo>
              <SearchStyled.NothingFoundTitle>
                Your cart is empty
              </SearchStyled.NothingFoundTitle>
              <SearchStyled.NothingFoundDesc>
                You don't have any items added to cart yet. You need to add
                items to cart before checkout.
              </SearchStyled.NothingFoundDesc>
            </SearchStyled.NothingFoundInfo>
          </SearchStyled.NothingFoundContainer>
        )}
      </Styled.Container>
      {cartProducts.length > 0 && (
        <BottomSheet
          backgroundStyle={{
            backgroundColor: theme.darkColors.dark2,
            borderRadius: 32,
            borderWidth: 1,
            borderColor: theme.darkColors.dark3,
          }}
          snapPoints={[110]}
          enableOverDrag={false}
          handleStyle={{ display: 'none' }}
        >
          <Styled.BottomSheetContainer>
            <Styled.TotalPrice>
              <Styled.TotalPriceLabel>Total Price</Styled.TotalPriceLabel>
              <Styled.TotalPriceValue>${totalCost}</Styled.TotalPriceValue>
            </Styled.TotalPrice>
            <Styled.CheckoutButton
              shadowProps={{
                style: { borderRadius: 20 },
                containerStyle: { flex: 1, minWidth: undefined },
              }}
              enableShadow={!loading}
              disabled={cartProducts.length <= 0 || loading}
              loading={loading}
              onPress={() => navigation.navigate('Checkout')}
            >
              Checkout
              <Styled.CheckoutBoldArrow>
                <BoldArrow />
              </Styled.CheckoutBoldArrow>
            </Styled.CheckoutButton>
          </Styled.BottomSheetContainer>
        </BottomSheet>
      )}
      <RemoveItemSheet
        refreshProducts={() => handleRemoveProductRefresh()}
        selectedProduct={selectedProduct}
        closeRemoveItemSheet={closeRemoveItemSheet}
        handleProductDelete={handleProductDelete}
        sheetRef={sheetRef}
      />
    </>
  )
}
