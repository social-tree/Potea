import * as CheckoutStyled from '../Checkout/Checkout.styles'
import * as Styled from './ShippingAddress.styles'

import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import BottomSheet from '@gorhom/bottom-sheet'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { Button } from 'src/components/Elements/Button'
import { CartStackParamList } from 'src/navigators/CartNavigator/CartNavigator.types'
import { Checkbox } from 'src/components/Form/Elements/Checkbox'
import { EditPen } from 'src/assets/svg/EditPen'
import { Ionicons } from '@expo/vector-icons'
import { MiniCard } from 'src/components/Elements/MiniCard'
import { Shadow } from 'react-native-shadow-2'
import { ShippingAddressType } from 'src/types/shippingAddress'
import { StackScreenProps } from '@react-navigation/stack'
import { getShippingAddresses } from 'src/api/shippingAddresses'
import { theme } from 'src/styles/theme'

export const ShippingAddress = ({
  navigation,
}: StackScreenProps<CartStackParamList, 'ShippingAddress'>) => {
  const { user } = useContext(AppContext)

  const [shippingAddresses, setShippingAddresses] = useState<
    ShippingAddressType[] | []
  >([])
  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<ShippingAddressType | null>(null)

  useEffect(() => {
    const getUsersShippingAddresses = async () => {
      const { data, error } = await getShippingAddresses({ userId: user?.id })
      setShippingAddresses(data || [])
    }
    getUsersShippingAddresses()
  }, [])

  return (
    <>
      <Styled.Container
        contentContainerStyle={{ padding: 20, gap: 30, paddingBottom: 140 }}
        data={shippingAddresses}
        renderItem={({ item }: any) => (
          <MiniCard onPress={() => setSelectedShippingAddress(item)}>
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
              <Styled.ShippingInfoTitle>{item.title}</Styled.ShippingInfoTitle>
              <Styled.ShippingInfoAddress>
                {item.desc}
              </Styled.ShippingInfoAddress>
            </Styled.ShippingInfo>
            <Checkbox
              disableBuiltInState
              isChecked={item.title === selectedShippingAddress?.title}
              onPress={() => setSelectedShippingAddress(item)}
              rounded
              size={20}
            />
          </MiniCard>
        )}
        ListFooterComponent={() => (
          <Styled.AddNewButton onPress={() => navigation.navigate('Cart')}>
            Add New Address
          </Styled.AddNewButton>
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
            disabled={!selectedShippingAddress.title}
            onPress={() => navigation.navigate('Checkout')}
          >
            Apply
          </Button>
        </CheckoutStyled.BottomSheetContainer>
      </BottomSheet>
    </>
  )
}
