import * as CheckoutStyled from '../Checkout/Checkout.styles'
import * as Styled from './ChooseShipping.styles'

import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import BottomSheet from '@gorhom/bottom-sheet'
import { Button } from 'src/components/Elements/Button'
import { CartStackParamList } from 'src/navigators/CartNavigator/CartNavigator.types'
import { Checkbox } from 'src/components/Form/Elements/Checkbox'
import { FlatList } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MiniCard } from 'src/components/Elements/MiniCard'
import { ShippingTypeType } from 'src/types/shippingTypes'
import { StackScreenProps } from '@react-navigation/stack'
import { getShippingTypes } from 'src/api/shippingTypes'
import { theme } from 'src/styles/theme'

export const ChooseShipping = ({
  navigation,
  route,
}: StackScreenProps<CartStackParamList, 'ChooseShipping'>) => {
  const [selectedShippingType, setSelectedShippingType] =
    useState<ShippingTypeType | null>(null)
  const [shippingTypes, setShippingTypes] = useState<ShippingTypeType[] | []>(
    []
  )
  const { setLoading } = useContext(AppContext)

  const Params = route.params

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

  useEffect(() => {
    if (!Params?.ShippingType) return
    setSelectedShippingType(Params?.ShippingType)
  }, [Params])

  useEffect(() => {
    const getAllShippingTypes = async () => {
      setLoading(true)
      const { data, error } = await getShippingTypes()

      setShippingTypes((data as ShippingTypeType[]) || [])
      setLoading(false)
    }
    getAllShippingTypes()
  }, [])

  return (
    <>
      <FlatList
        contentContainerStyle={{ padding: 24, gap: 24, paddingBottom: 140 }}
        data={shippingTypes}
        renderItem={({ item }: { item: ShippingTypeType }) => (
          <MiniCard onPress={() => changeShippingType(item)}>
            <Styled.ShippingTypeIcon>
              <MaterialCommunityIcons
                name={item.icon_name as any}
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
            <Checkbox
              disableBuiltInState
              isChecked={selectedShippingType?.title === item.title}
              onPress={() => changeShippingType(item)}
              size={20}
              rounded
            />
          </MiniCard>
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
            disabled={!selectedShippingType?.title}
            onPress={() =>
              navigation.navigate('Checkout', {
                ShippingType: selectedShippingType,
              })
            }
          >
            Apply
          </Button>
        </CheckoutStyled.BottomSheetContainer>
      </BottomSheet>
    </>
  )
}
