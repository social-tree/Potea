import * as ChooseShippingStyled from '../../Cart/ShippingAddress/ShippingAddress.styles'

import React, { useEffect, useState } from 'react'

import { Button } from 'src/components/Elements/Button'
import { EditPen } from 'src/assets/svg/EditPen'
import { FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MiniCard } from 'src/components/Elements/MiniCard'
import { ProfileStackParamList } from 'src/navigators/ProfileNavigator/ProfileNavigator.types'
import { Shadow } from 'react-native-shadow-2'
import { ShippingAddressType } from 'src/types/shippingAddress'
import { StackScreenProps } from '@react-navigation/stack'
import { getShippingAddresses } from 'src/api/shippingAddresses'
import { theme } from 'src/styles/theme'
import { usePagination } from 'src/hooks/usePagination'

export const Addresses = ({
  navigation,
}: StackScreenProps<ProfileStackParamList, 'Addresses'>) => {
  const { fetchData, loading, data, nextPage, onPageRefresh } =
    usePagination(getShippingAddresses)

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <FlatList
      refreshing={loading}
      contentContainerStyle={{ padding: 20, gap: 30, flexGrow: 1 }}
      data={data}
      onRefresh={() => onPageRefresh()}
      onEndReached={() => nextPage()}
      onEndReachedThreshold={0.1}
      renderItem={({ item }) => (
        <MiniCard
          onPress={() =>
            navigation.navigate('EditAddress', { id: item.id, type: 'edit' })
          }
        >
          <Shadow
            style={{ borderRadius: 20 }}
            distance={6}
            startColor={`${theme.primary[500]}20`}
            endColor={`${theme.primary[500]}20`}
          >
            <ChooseShippingStyled.ShippingInfoIcon>
              <Ionicons name="ios-location-sharp" size={20} color="white" />
            </ChooseShippingStyled.ShippingInfoIcon>
          </Shadow>
          <ChooseShippingStyled.ShippingInfo>
            <ChooseShippingStyled.ShippingInfoTitle>
              {item?.title}
            </ChooseShippingStyled.ShippingInfoTitle>
            <ChooseShippingStyled.ShippingInfoAddress>
              {item.address}
            </ChooseShippingStyled.ShippingInfoAddress>
          </ChooseShippingStyled.ShippingInfo>
          <EditPen />
        </MiniCard>
      )}
      ListFooterComponentStyle={{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      }}
      ListFooterComponent={
        <Button
          onPress={() => navigation.navigate('EditAddress', { type: 'add' })}
        >
          Add New Address
        </Button>
      }
    />
  )
}
