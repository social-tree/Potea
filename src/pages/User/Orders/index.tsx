import * as Styled from './Orders.styles'

import React, { useEffect, useState } from 'react'

import { ClipBoards } from 'src/assets/svg/Clipboards'
import { FlatList } from 'react-native'
import { Order } from 'src/components/Elements/Order'
import { OrderType } from 'src/types/order'
import { OrdersStackParamList } from 'src/navigators/OrdersNavigator/OrdersNavigator.types'
import { StackScreenProps } from '@react-navigation/stack'
import { getOrders } from 'src/api/orders'
import { productWithQuantityType } from 'src/types/product'
import { usePagination } from 'src/hooks/usePagination'

export const Orders = ({
  navigation,
}: StackScreenProps<OrdersStackParamList, 'MyOrders'>) => {
  const [selectedTab, setSelectedTab] = useState<'Active' | 'Completed'>(
    'Active'
  )

  const { data, hasMore, nextPage, offset, onPageRefresh, loading, fetchData } =
    usePagination(getOrders)

  useEffect(() => {
    fetchData({ type: selectedTab })
  }, [selectedTab, offset])

  return (
    <>
      <Styled.TopNavContainer>
        <Styled.TopNavItem
          selected={selectedTab === 'Active'}
          onPress={() => setSelectedTab('Active')}
        >
          <Styled.TopNavText selected={selectedTab === 'Active'}>
            Active
          </Styled.TopNavText>
        </Styled.TopNavItem>
        <Styled.TopNavItem
          selected={selectedTab === 'Completed'}
          onPress={() => setSelectedTab('Completed')}
        >
          <Styled.TopNavText selected={selectedTab === 'Completed'}>
            Completed
          </Styled.TopNavText>
        </Styled.TopNavItem>
      </Styled.TopNavContainer>
      {data.length <= 0 ? (
        <Styled.NoOrdersContainer>
          <ClipBoards />
          <Styled.NoOrdersInfo>
            <Styled.NoOrdersTitle>
              You don't have an order yet
            </Styled.NoOrdersTitle>
            <Styled.NoOrdersDesc>
              You don't have any {selectedTab.toLowerCase()} orders at this time
            </Styled.NoOrdersDesc>
          </Styled.NoOrdersInfo>
        </Styled.NoOrdersContainer>
      ) : (
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 24,
            gap: 20,
            paddingVertical: 20,
          }}
          onEndReached={() => nextPage()}
          onEndReachedThreshold={0.1}
          data={data}
          renderItem={({ item }) => (
            <Order
              productInfo={item.product}
              quantity={item.quantity}
              navigation={navigation}
            />
          )}
        />
      )}
    </>
  )
}
