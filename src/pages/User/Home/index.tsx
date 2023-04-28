import { FlatList, TouchableOpacity } from 'react-native'
import { supabase } from 'src/utils/supabase'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native'
import React, { useState, useContext } from 'react'
import {
  Container,
  HomeHeader,
  ProfilePicture,
  UserInfo,
  Username,
  WelcomeText,
  SearchInput,
  SpecialOffersContainer,
  SpecialOffersHeader,
  SpecialOffersTitle,
  SeeAllButton,
  MostPopularContainer,
  MostPopularHeader,
  MostPopularTitle,
} from './Home.styles'
import { Bell } from 'src/assets/svg/Bell'
import { Heart } from 'src/assets/svg/Heart'
import { useForm } from 'react-hook-form'
import { Search } from 'src/assets/svg/Search'
import { Misc } from 'src/assets/svg/Misc'
import { Product } from 'src/components/Elements/Product'
import { Chip } from 'src/components/Form/Elements/Chip'
import { filters } from 'src/constants/filters'
import { AppContext } from 'src/contexts/AppContext'
import { theme } from 'src/styles/theme'

export const Home = ({ navigation }) => {
  const { control } = useForm()
  const [selectedFilter, setSelectedFilter] = useState('All')
  const { products, addProductToFavorites, favoriteProducts } =
    useContext(AppContext)

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
  }

  return (
    <ScrollView horizontal={false}>
      <Container>
        <HomeHeader>
          <ProfilePicture source={{ uri: 'https://i.imgur.com/zol9PsV.png' }} />
          <UserInfo>
            <WelcomeText>Good Morning 👋</WelcomeText>
            <Username>Andrew Ainsley</Username>
          </UserInfo>
          <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
            <Heart />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}
          >
            <Bell />
          </TouchableOpacity>
        </HomeHeader>
        <SearchInput
          leftIcon={<Search />}
          name="search"
          placeholder="Search"
          control={control}
          inputProps={{ placeholderTextColor: theme.greyscale[600] }}
          rightIcon={
            <TouchableOpacity>
              <Misc />
            </TouchableOpacity>
          }
        />
        <SpecialOffersContainer>
          <SpecialOffersHeader>
            <SpecialOffersTitle>Special Offers</SpecialOffersTitle>
            <TouchableOpacity>
              <SeeAllButton>See All</SeeAllButton>
            </TouchableOpacity>
          </SpecialOffersHeader>
          <FlatList
            data={products}
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
        </SpecialOffersContainer>
        <MostPopularContainer>
          <MostPopularHeader>
            <MostPopularTitle>Most Popular</MostPopularTitle>
            <TouchableOpacity>
              <SeeAllButton>See All</SeeAllButton>
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
            {filters?.map((filter) => (
              <Chip
                onPress={() => handleFilterChange(filter)}
                selected={selectedFilter === filter}
                text={filter}
              />
            ))}
          </ScrollView>
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
        </MostPopularContainer>
        <TouchableOpacity onPress={() => supabase.auth.signOut()}>
          <StyledText>log out</StyledText>
        </TouchableOpacity>
      </Container>
    </ScrollView>
  )
}

const StyledText = styled.Text``
