import * as CheckoutStyled from '../Checkout/Checkout.styles'
import * as Styled from './ChooseShipping.styles'

import React, { useState } from 'react'

import BottomSheet from '@gorhom/bottom-sheet'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { Button } from 'src/components/Elements/Button'
import { CartStackParamList } from 'src/navigators/CartNavigator/CartNavigator.types'
import { FlatList } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ShippingTypeType } from 'src/types/shippingTypes'
import { StackScreenProps } from '@react-navigation/stack'
import { theme } from 'src/styles/theme'

export const ChooseShipping = ({
  navigation,
  route,
}: StackScreenProps<CartStackParamList, 'ChooseShipping'>) => {
  const [selectedShippingType, setSelectedShippingType] = useState({
    iconName: '',
    title: '',
    estimated_arrival_time: '',
    price: 0,
  })
  const [shippingTypes, setSelectedShippingTypes] = useState<
    ShippingTypeType[] | []
  >([
    {
      iconName: 'sale',
      title: 'Economy',
      estimated_arrival_time: '3-6',
      price: 20,
    },
    {
      iconName: 'package-variant-closed',
      title: 'Regular',
      estimated_arrival_time: '3-5',
      price: 20,
    },
    {
      iconName: 'truck',
      title: 'Cargo',
      estimated_arrival_time: '2-3',
      price: 20,
    },
    {
      iconName: 'truck-fast',
      title: 'Express',
      estimated_arrival_time: '1-2',
      price: 20,
    },
  ])

  const changeShippingType = (shippingType: ShippingTypeType) => {
    setSelectedShippingType((prev) => ({ ...shippingType }))
  }

  const calculateEtaDate = (eta: string) => {
    const days = eta.split('-')
    const todaysDate = new Date()
    const todaysMonth = new Date().toLocaleString('en-US', { month: 'long' })
    return `${todaysMonth} ${todaysDate.getDate() + Number(days[0])}-${
      todaysDate.getDate() + Number(days[1])
    }`
  }

  return (
    <>
      <FlatList
        contentContainerStyle={{ padding: 24, gap: 24, paddingBottom: 140 }}
        data={shippingTypes}
        renderItem={({ item }: { item: ShippingTypeType }) => (
          <Styled.ShippingTypeContainer
            onPress={() => changeShippingType(item)}
          >
            <Styled.ShippingTypeIcon>
              <MaterialCommunityIcons
                name={item.iconName as any}
                size={24}
                color="white"
              />
            </Styled.ShippingTypeIcon>
            <Styled.ShippingTypeInfo>
              <Styled.ShippingTypeTitle>{item.title}</Styled.ShippingTypeTitle>
              <Styled.ShippingTypeDesc>
                Estimated Arrival,{' '}
                {calculateEtaDate(item.estimated_arrival_time)}
              </Styled.ShippingTypeDesc>
            </Styled.ShippingTypeInfo>
            <Styled.ShippingTypePrice>${item.price}</Styled.ShippingTypePrice>
            <BouncyCheckbox
              disableBuiltInState
              fillColor={theme.primary[500]}
              iconComponent
              isChecked={selectedShippingType.title === item.title}
              onPress={() => changeShippingType(item)}
              size={20}
              style={{ width: 20 }}
            />
          </Styled.ShippingTypeContainer>
        )}
      ></FlatList>
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
            disabled={!selectedShippingType.title}
            onPress={() => navigation.navigate('Checkout')}
          >
            Apply
          </Button>
        </CheckoutStyled.BottomSheetContainer>
      </BottomSheet>
    </>
  )
}
