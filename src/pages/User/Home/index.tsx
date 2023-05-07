import {
  Container,
  GreenButton,
  HomeHeader,
  MostPopularContainer,
  MostPopularHeader,
  MostPopularTitle,
  ProfilePicture,
  SpecialOffersContainer,
  SpecialOffersHeader,
  SpecialOffersTitle,
  UserInfo,
  Username,
  WelcomeText,
} from './Home.styles'
import {
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import { Bell } from 'src/assets/svg/Bell'
import { Chip } from 'src/components/Form/Elements/Chip'
import { Heart } from 'src/assets/svg/Heart'
import { Loading } from 'src/assets/animations/Loading'
import { Misc } from 'src/assets/svg/Misc'
import { Product } from 'src/components/Elements/Product'
import { ScrollView } from 'react-native'
import { Search } from 'src/assets/svg/Search'
import { SearchInput } from 'src/components/Form/Elements/Inputs'
import { filters } from 'src/constants/filters'
import { getProducts } from 'src/api/products'
import styled from 'styled-components/native'
import { supabase } from 'src/utils/supabase'
import { theme } from 'src/styles/theme'
import { useForm } from 'react-hook-form'

export const Home = ({ navigation }) => {
  const { control } = useForm()
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [specialOffers, setSpecialOffers] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const { addProductToFavorites, favoriteProducts } = useContext(AppContext)

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
  }

  const getSpecialOfferProducts = async () => {
    const { data, error } = await getProducts({ type: 'specialOffer' })
    setSpecialOffers(data)
    return
  }

  const getNormalProducts = async () => {
    const { data, error } = await getProducts({ type: 'normal' })
    console.log({ data, error }, 'all')
    setProducts(data)
    return
  }

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
    <FlatList
      data={[]}
      keyExtractor={() => 'key'}
      renderItem={null}
      onRefresh={async () => {
        setLoading(true)
        await getSpecialOfferProducts()
        await getNormalProducts()
        setLoading(false)
      }}
      refreshing={loading}
      ListHeaderComponent={() => (
        <Container>
          <HomeHeader>
            <ProfilePicture
              source={{ uri: 'https://i.imgur.com/zol9PsV.png' }}
            />
            <UserInfo>
              <WelcomeText>Good Morning 👋</WelcomeText>
              <Username>Andrew Ainsley</Username>
            </UserInfo>
            <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
              <Heart />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Bell />
            </TouchableOpacity>
          </HomeHeader>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Search')
            }}
          >
            <View>
              <SearchInput
                leftIcon={<Search />}
                name="search"
                placeholder="Search"
                control={control}
                inputProps={{
                  placeholderTextColor: theme.greyscale[600],
                  onFocus: () => {
                    navigation.navigate('Search')
                  },
                }}
                rightIcon={
                  <TouchableOpacity>
                    <Misc />
                  </TouchableOpacity>
                }
              />
            </View>
          </TouchableWithoutFeedback>
          <SpecialOffersContainer>
            <SpecialOffersHeader>
              <SpecialOffersTitle>Special Offers</SpecialOffersTitle>
              <TouchableOpacity>
                <GreenButton>See All</GreenButton>
              </TouchableOpacity>
            </SpecialOffersHeader>
            {loading ? (
              <Loading style={{ height: 362 }} />
            ) : (
              <FlatList
                data={specialOffers}
                horizontal
                renderItem={({ item, index }) => (
                  <Product
                    style={{
                      marginRight: index % 2 !== 0 ? 0 : 15,
                      marginLeft: index === 0 || index === 1 ? 0 : 15,
                    }}
                    product={item}
                    key={item.id}
                    size="large"
                    liked={!!favoriteProducts.get(item.id)}
                    handleAddToFavorites={addProductToFavorites}
                  />
                )}
              />
            )}
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
              }}
              horizontal
            >
              {filters?.map((filter, index) => (
                <Chip
                  key={index}
                  onPress={() => handleFilterChange(filter)}
                  selected={selectedFilter === filter}
                  text={filter}
                />
              ))}
            </ScrollView>
            {loading ? (
              <Loading style={{ height: 362 }} />
            ) : (
              <FlatList
                data={products}
                numColumns={2}
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
            )}
          </MostPopularContainer>
          <TouchableOpacity onPress={() => supabase.auth.signOut()}>
            <StyledText>log out</StyledText>
          </TouchableOpacity>
        </Container>
      )}
    />
  )
}

const StyledText = styled.Text``
