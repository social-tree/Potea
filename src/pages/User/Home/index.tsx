import * as Styled from './Home.styles'

import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { storageSupabaseURL, supabase } from 'src/utils/supabase'

import { AppContext } from 'src/contexts/AppContext'
import { Bell } from 'src/assets/svg/Bell'
import { Chip } from 'src/components/Form/Elements/Chip'
import { Heart } from 'src/assets/svg/Heart'
import { HomeStackParamList } from 'src/navigators/HomeNavigator/HomeNavigator.types'
import { Misc } from 'src/assets/svg/Misc'
import { Octicons } from '@expo/vector-icons'
import { Product } from 'src/components/Elements/Product'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { Search } from 'src/assets/svg/Search'
import { SearchInput } from 'src/components/Form/Elements/Inputs'
import { StackScreenProps } from '@react-navigation/stack'
import { allFilters } from 'src/constants/filters'
import { getProducts } from 'src/api/products'
import styled from 'styled-components/native'
import { theme } from 'src/styles/theme'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useForm } from 'react-hook-form'

export const Home = ({
  navigation,
}: StackScreenProps<HomeStackParamList, 'Home'>) => {
  const { control } = useForm()
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [specialOffers, setSpecialOffers] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const bottomTabBarHeight = useBottomTabBarHeight()
  const { user, setModalErrorText } = useContext(AppContext)

  const { addProductToFavorites, favoriteProducts } = useContext(AppContext)

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
  }

  const getSpecialOfferProducts = async () => {
    const { data, error } = await getProducts({ offerType: 'specialOffer' })
    if (error)
      return setModalErrorText(
        `there was an error recieving all products. error code:${error.code}`
      )
    setSpecialOffers(data)
    return
  }

  const getNormalProducts = async () => {
    const { data, error } = await getProducts({ offerType: 'normal' })
    if (error)
      return setModalErrorText(
        `there was an error recieving all products. error code:${error.code}`
      )
    setProducts(data)
    return
  }

  useEffect(() => {
    if (selectedFilter) {
      const getProductsWithFilter = async () => {
        const { data, error } = await getProducts({
          offerType: 'normal',
          type: selectedFilter,
        })
        setProducts(data)
        return
      }

      getProductsWithFilter()
    }
  }, [selectedFilter])

  useEffect(() => {
    const getAllProducts = async () => {
      setLoading(true)
      await getSpecialOfferProducts()
      await getNormalProducts()
      setLoading(false)
    }
    getAllProducts()
  }, [])

  return (
    <SafeAreaView>
      <Styled.Container>
        <FlatList
          data={[]}
          keyExtractor={() => 'key'}
          renderItem={null}
          refreshControl={
            <RefreshControl
              progressBackgroundColor={theme.other.white}
              colors={[theme.primary[500]]}
              refreshing={loading}
              onRefresh={async () => {
                setLoading(true)
                await getSpecialOfferProducts()
                await getNormalProducts()
                setLoading(false)
              }}
              progressViewOffset={60}
            />
          }
          contentContainerStyle={[
            { minHeight: 1060, paddingBottom: bottomTabBarHeight },
          ]}
          ListHeaderComponent={() => (
            <>
              <Styled.HomeHeader>
                <Styled.ProfilePicture
                  borderRadius={50}
                  source={{
                    uri: user?.user_metadata?.avatar
                      ? `${storageSupabaseURL}${user?.user_metadata?.avatar}`
                      : 'https://i.imgur.com/zol9PsV.png',
                  }}
                />
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => supabase.auth.signOut()}
                >
                  <Styled.UserInfo>
                    <Styled.WelcomeText>Good Morning 👋</Styled.WelcomeText>
                    <Styled.Username>
                      {user?.user_metadata.full_name}
                    </Styled.Username>
                  </Styled.UserInfo>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Notifications')}
                >
                  <Bell />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Wishlist')}
                >
                  <Heart />
                </TouchableOpacity>
              </Styled.HomeHeader>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('Search')
                }}
              >
                <Styled.SearchContainer
                  style={{
                    shadowColor: '#0000008d',
                    backgroundColor: theme.darkColors.dark1,
                    elevation: 23,
                  }}
                >
                  <SearchInput
                    leftIcon={<Search />}
                    name="search"
                    placeholder="Search"
                    control={control}
                    inputProps={{
                      placeholderTextColor: theme.greyscale[600],
                      onPressIn: () => {
                        navigation.navigate('Search')
                      },
                      editable: false,
                      focusable: false,
                    }}
                    rightIcon={<Misc />}
                  />
                </Styled.SearchContainer>
              </TouchableWithoutFeedback>
            </>
          )}
          stickyHeaderIndices={[0]}
          ListEmptyComponent={() => (
            <>
              <Styled.SpecialOffersContainer>
                <Styled.SpecialOffersHeader>
                  <Styled.SpecialOffersTitle>
                    Special Offers
                  </Styled.SpecialOffersTitle>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Search', {
                        selectedFilters: { offerType: 'specialOffer' },
                      })
                    }
                  >
                    <Styled.GreenButton>See All</Styled.GreenButton>
                  </TouchableOpacity>
                </Styled.SpecialOffersHeader>
                <FlatList
                  data={specialOffers}
                  horizontal
                  renderItem={({ item, index }) => (
                    <Product
                      style={{
                        marginRight:
                          index === specialOffers?.length - 1
                            ? 24
                            : index % 2 !== 0
                            ? 0
                            : 15,
                        marginLeft: index === 0 ? 24 : index === 1 ? 0 : 15,
                      }}
                      product={item}
                      key={item.id}
                      size="large"
                      liked={!!favoriteProducts.get(item.id)}
                      handleAddToFavorites={addProductToFavorites}
                    />
                  )}
                />
              </Styled.SpecialOffersContainer>
              <Styled.MostPopularContainer>
                <Styled.MostPopularHeader>
                  <Styled.MostPopularTitle>
                    Most Popular
                  </Styled.MostPopularTitle>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Search', {
                        selectedFilters: { offerType: 'normal' },
                      })
                    }
                  >
                    <Styled.GreenButton>See All</Styled.GreenButton>
                  </TouchableOpacity>
                </Styled.MostPopularHeader>
                <FlatList
                  data={allFilters}
                  contentContainerStyle={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 24,
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <Chip
                      key={item.id}
                      onPress={() => handleFilterChange(item.filter)}
                      selected={selectedFilter === item.filter}
                      text={item.filter}
                    />
                  )}
                />
                <FlatList
                  data={products}
                  numColumns={2}
                  style={{ paddingLeft: 24, paddingRight: 24 }}
                  renderItem={({ item, index }) => (
                    <Product
                      style={{
                        marginRight: index % 2 !== 0 ? 0 : 15,
                      }}
                      product={item}
                      key={item.id}
                      liked={!!favoriteProducts.get(item.id)}
                      handleAddToFavorites={addProductToFavorites}
                    />
                  )}
                />
              </Styled.MostPopularContainer>
            </>
          )}
        />
      </Styled.Container>
    </SafeAreaView>
  )
}

const StyledText = styled.Text``
