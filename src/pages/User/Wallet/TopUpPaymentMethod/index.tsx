import * as CheckoutStyled from '../../Cart/Checkout/Checkout.styles'
import * as PaymentMethodsStyled from 'src/pages/User/Cart/PaymentMethods/PaymentMethods.styles'
import * as Styled from './TopUpPaymentMethod.styles'

import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import BottomSheet from '@gorhom/bottom-sheet'
import { Button } from 'src/components/Elements/Button'
import { Checkbox } from 'src/components/Form/Elements/Checkbox'
import { FlatList } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Modal } from 'src/components/Elements/Modal'
import { PaymentMethodType } from 'src/types/paymentMethod'
import { StackScreenProps } from '@react-navigation/stack'
import { SuccessShield } from 'src/assets/svg/SuccessShield'
import { WalletStackParamList } from 'src/navigators/WalletNavigator/WalletNavigator.types'
import { getPaymentMethods } from 'src/api/paymentMethods'
import { theme } from 'src/styles/theme'
import { topUpUserWallet } from 'src/api/balances'

export const TopUpPaymentMethod = ({
  route,
  navigation,
}: StackScreenProps<WalletStackParamList, 'TopUpPaymentMethod'>) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethodType | null>(null)

  const [allPaymentMethods, setAllPaymentMethods] = useState<
    PaymentMethodType[] | []
  >([])
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false)
  const { user } = useContext(AppContext)
  const { topUpAmount } = route.params

  useEffect(() => {
    const getAllPaymentMethods = async () => {
      const { data } = await getPaymentMethods()
      setAllPaymentMethods(() => {
        const newPaymentMethods = data.filter(
          (method) => !method.title.toLowerCase().includes('wallet')
        )
        return newPaymentMethods
      })
    }
    getAllPaymentMethods()
  }, [])

  const handlePurchasingItems = async () => {
    const { data, error } = await topUpUserWallet({
      amount: topUpAmount,
    })
    console.log(data, error)
    if (data) {
      setSuccessModalIsOpen(true)
    }
  }

  return (
    <>
      <Modal open={successModalIsOpen}>
        <PaymentMethodsStyled.ModalContainer>
          <SuccessShield />
          <PaymentMethodsStyled.ModalInfo>
            <PaymentMethodsStyled.ModalTitle>
              Top Up Successful!
            </PaymentMethodsStyled.ModalTitle>
            <Styled.ModalDesc>
              You have successfully top up e-wallet for ${topUpAmount}
            </Styled.ModalDesc>
          </PaymentMethodsStyled.ModalInfo>
          <PaymentMethodsStyled.ModalButtons>
            <PaymentMethodsStyled.ModalViewOrderButton
              onPress={() => {
                navigation.navigate('MyWallet')
              }}
            >
              Return
            </PaymentMethodsStyled.ModalViewOrderButton>
          </PaymentMethodsStyled.ModalButtons>
        </PaymentMethodsStyled.ModalContainer>
      </Modal>
      <FlatList
        contentContainerStyle={{ gap: 25, padding: 20, paddingBottom: 140 }}
        data={allPaymentMethods}
        indicatorStyle="white"
        ListHeaderComponent={() => (
          <PaymentMethodsStyled.Title>
            Select the top up method you want to use.
          </PaymentMethodsStyled.Title>
        )}
        renderItem={({ item }) => (
          <PaymentMethodsStyled.PaymentMiniCard
            shadowProps={{ style: { borderRadius: 16 } }}
            onPress={() => setSelectedPaymentMethod(item)}
          >
            <FontAwesome5
              name={item.icon_name}
              size={26}
              color={`${item.color}`}
            />
            <PaymentMethodsStyled.PaymentTitle>
              {item.title}
            </PaymentMethodsStyled.PaymentTitle>
            <PaymentMethodsStyled.PaymentBalance>
              {item.balance ? `$${item.balance?.toLocaleString()}` : ``}
            </PaymentMethodsStyled.PaymentBalance>
            <Checkbox
              disableBuiltInState
              rounded
              onPress={() => setSelectedPaymentMethod(item)}
              isChecked={item.title === selectedPaymentMethod?.title}
              size={20}
            />
          </PaymentMethodsStyled.PaymentMiniCard>
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
