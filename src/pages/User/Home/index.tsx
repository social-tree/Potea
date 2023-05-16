import {
  Container,
  GreenButton,
  HomeHeader,
  MostPopularContainer,
  MostPopularHeader,
  MostPopularTitle,
  ProfilePicture,
  SearchContainer,
  SpecialOffersContainer,
  SpecialOffersHeader,
  SpecialOffersTitle,
  UserInfo,
  Username,
  WelcomeText,
} from './Home.styles'
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import { Bell } from 'src/assets/svg/Bell'
import { Chip } from 'src/components/Form/Elements/Chip'
import { Heart } from 'src/assets/svg/Heart'
import { Misc } from 'src/assets/svg/Misc'
import { Product } from 'src/components/Elements/Product'
import { ScrollView } from 'react-native'
import { Search } from 'src/assets/svg/Search'
import { SearchInput } from 'src/components/Form/Elements/Inputs'
import { allFilters } from 'src/constants/filters'
import { getProducts } from 'src/api/products'
import styled from 'styled-components/native'
import { supabase } from 'src/utils/supabase'
import { theme } from 'src/styles/theme'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

export const Home = ({ navigation }) => {
  const { control } = useForm()
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [specialOffers, setSpecialOffers] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const bottomTabBarHeight = useBottomTabBarHeight()
  const { getParent } = useNavigation()

  useEffect(() => {
    const parent = getParent()

    parent?.setOptions({
      tabBarStyle: {
        display: 'flex',
        backgroundColor: theme.darkColors.dark2,
        height: 55,
        paddingBottom: 5,
      },
    })

    return () => {
      parent?.setOptions({
        tabBarStyle: { display: 'none' },
      })
    }
  }, [])

  const { addProductToFavorites, favoriteProducts } = useContext(AppContext)

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
  }

  const getSpecialOfferProducts = async () => {
    const { data, error } = await getProducts({ offerType: 'specialOffer' })
    setSpecialOffers(data)
    return
  }

  const getNormalProducts = async () => {
    const { data, error } = await getProducts({ offerType: 'normal' })
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
    <Container>
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
            <HomeHeader>
              <ProfilePicture
                source={{ uri: 'https://i.imgur.com/zol9PsV.png' }}
              />
              <UserInfo>
                <WelcomeText>Good Morning 👋</WelcomeText>
                <Username>Andrew Ainsley</Username>
              </UserInfo>
              <TouchableOpacity
                onPress={() => navigation.navigate('Notifications')}
              >
                <Bell />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
                <Heart />
              </TouchableOpacity>
            </HomeHeader>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('Search')
              }}
            >
              <SearchContainer
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
              </SearchContainer>
            </TouchableWithoutFeedback>
          </>
        )}
        stickyHeaderIndices={[0]}
        ListEmptyComponent={() => (
          <>
            <SpecialOffersContainer>
              <SpecialOffersHeader>
                <SpecialOffersTitle>Special Offers</SpecialOffersTitle>
                <TouchableOpacity>
                  <GreenButton>See All</GreenButton>
                </TouchableOpacity>
              </SpecialOffersHeader>
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
            </SpecialOffersContainer>
            <MostPopularContainer>
              <MostPopularHeader>
                <MostPopularTitle>Most Popular</MostPopularTitle>
                <TouchableOpacity>
                  <GreenButton>See All</GreenButton>
                </TouchableOpacity>
              </MostPopularHeader>
              <ScrollView
                contentContainerStyle={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: 24,
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {allFilters?.map((filter, index) => (
                  <Chip
                    key={index}
                    onPress={() => handleFilterChange(filter)}
                    selected={selectedFilter === filter}
                    text={filter}
                  />
                ))}
              </ScrollView>
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
            </MostPopularContainer>
          </>
        )}
      />
      <TouchableOpacity onPress={() => supabase.auth.signOut()}>
        <StyledText>log out</StyledText>
      </TouchableOpacity>
    </Container>
  )
}

const StyledText = styled.Text``
