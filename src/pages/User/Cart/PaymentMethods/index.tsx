import * as CheckoutStyled from '../Checkout/Checkout.styles'
import * as Styled from './PaymentMethods.styles'

import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import BottomSheet from '@gorhom/bottom-sheet'
import { Button } from 'src/components/Elements/Button'
import { CartStackParamList } from 'src/navigators/CartNavigator/CartNavigator.types'
import { Checkbox } from 'src/components/Form/Elements/Checkbox'
import { FlatList } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { MiniCard } from 'src/components/Elements/MiniCard'
import { Modal } from 'src/components/Elements/Modal'
import { PaymentMethodType } from 'src/types/paymentMethod'
import { StackScreenProps } from '@react-navigation/stack'
import { StyledHeart } from 'src/components/Elements/Product/Product.styles'
import { SuccessShield } from 'src/assets/svg/SuccessShield'
import { getCreditBalance } from 'src/api/balances'
import { getPaymentMethods } from 'src/api/paymentMethods'
import { purchaseCartProducts } from 'src/api/cart'
import { theme } from 'src/styles/theme'

export const PaymentMethods = ({
  navigation,
}: StackScreenProps<CartStackParamList, 'PaymentMethods'>) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethodType | null>(null)

  const [allPaymentMethods, setAllPaymentMethods] = useState<
    PaymentMethodType[] | []
  >([])

  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false)

  const { setModalErrorText } = useContext(AppContext)

  const handlePurchasingItems = async () => {
    const { data, error } = await purchaseCartProducts({
      payment_id: selectedPaymentMethod.id,
    })
    if (data) {
      setSuccessModalIsOpen(true)
    }

    if (error && (error?.code || error?.message)) {
      setModalErrorText(
        `error with completing your purchase. message/code: ${
          error?.message || error?.code
        }`
      )
    }
  }

  useEffect(() => {
    const getAllPaymentMethods = async () => {
      const { data, error } = await getPaymentMethods()
      const userBalanceInfo = await getCreditBalance()
      setAllPaymentMethods(() => {
        const newPaymentMethods = data.map((paymentMethod) =>
          paymentMethod.title.toLowerCase().includes('wallet')
            ? {
                balance: `${userBalanceInfo?.data?.balance}` || '0',
                ...paymentMethod,
              }
            : paymentMethod
        )
        return newPaymentMethods
      })
    }
    getAllPaymentMethods()
  }, [])

  return (
    <>
      <Modal open={successModalIsOpen}>
        <Styled.ModalContainer>
          <SuccessShield />
          <Styled.ModalInfo>
            <Styled.ModalTitle>Order Successful!</Styled.ModalTitle>
            <Styled.ModalDesc>
              You have successfully made order
            </Styled.ModalDesc>
          </Styled.ModalInfo>
          <Styled.ModalButtons>
            <Styled.ModalViewOrderButton
              onPress={() => {
                const parent = navigation.getParent()
                parent.navigate('OrdersNav')
              }}
            >
              View Order
            </Styled.ModalViewOrderButton>
          </Styled.ModalButtons>
        </Styled.ModalContainer>
      </Modal>
      <FlatList
        contentContainerStyle={{ gap: 25, padding: 20, paddingBottom: 140 }}
        data={allPaymentMethods}
        indicatorStyle="white"
        ListHeaderComponent={() => (
          <Styled.Title>
            Select the payment method you want to use.
          </Styled.Title>
        )}
        renderItem={({ item }) => (
          <Styled.PaymentMiniCard
            shadowProps={{ style: { borderRadius: 16 } }}
            onPress={() => setSelectedPaymentMethod(item)}
          >
            <FontAwesome5
              name={item.icon_name}
              size={26}
              color={`${item.color}`}
            />
            <Styled.PaymentTitle>{item.title}</Styled.PaymentTitle>
            <Styled.PaymentBalance>
              {item.balance ? `$${item.balance?.toLocaleString()}` : ``}
            </Styled.PaymentBalance>
            <Checkbox
              disableBuiltInState
              rounded
              onPress={() => setSelectedPaymentMethod(item)}
              isChecked={item.title === selectedPaymentMethod?.title}
              size={20}
            />
          </Styled.PaymentMiniCard>
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
        <CheckoutStyled.BottomSheetContainer>
          <Button
            shadowProps={{
              style: { borderRadius: 20 },
              containerStyle: { flex: 1, minWidth: undefined },
            }}
            disabled={!selectedPaymentMethod?.title}
            onPress={() => handlePurchasingItems()}
          >
            Continue
          </Button>
        </CheckoutStyled.BottomSheetContainer>
      </BottomSheet>
    </>
  )
}
