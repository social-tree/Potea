import { TouchableOpacity } from 'react-native'
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
  TagsContainer,
} from './Home.styles'
import { Bell } from 'src/assets/svg/Bell'
import { Heart } from 'src/assets/svg/Heart'
import { useForm } from 'react-hook-form'
import { Search } from 'src/assets/svg/Search'
import { Misc } from 'src/assets/svg/Misc'
import { Product } from 'src/components/Elements/Product'
import { Tag } from 'src/components/Elements/Tag'
import { filters } from 'src/constants/filters'
import { AppContext } from 'src/contexts/AppContext'

export const Home = ({ navigation }) => {
  const { control } = useForm()
  const [selectedFilter, setSelectedFilter] = useState('All')
  const { products, addProductToFavorites, favoriteProducts } =
    useContext(AppContext)

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
  }

  console.log(favoriteProducts)

  return (
    <ScrollView>
      <Container>
        <HomeHeader>
          <ProfilePicture source={{ uri: 'https://i.imgur.com/zol9PsV.png' }} />
          <UserInfo>
            <WelcomeText>Good Morning 👋</WelcomeText>
            <Username>Andrew Ainsley</Username>
          </UserInfo>
          <TouchableOpacity>
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
          <ScrollView
            horizontal
            contentContainerStyle={{ display: 'flex', gap: 16 }}
          >
            {products.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                liked={!!favoriteProducts.get(product.id)}
                size="large"
                image={product.image}
                name={product.name}
                rating={product.rating}
                soldAmount={product.soldAmount}
                price={product.price}
                handleAddToFavorites={addProductToFavorites}
              />
            ))}
          </ScrollView>
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
            {filters.map((filter) => (
              <Tag
                onPress={() => handleFilterChange(filter)}
                selected={selectedFilter === filter}
                text={filter}
              />
            ))}
          </ScrollView>
          <ScrollView
            contentContainerStyle={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 10,
              alignItems: 'center',
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {products.map((product) => (
              <Product
                key={product.id}
                liked={!!favoriteProducts.get(product.id)}
                id={product.id}
                image={product.image}
                name={product.name}
                rating={product.rating}
                soldAmount={product.soldAmount}
                price={product.price}
                handleAddToFavorites={addProductToFavorites}
              />
            ))}
          </ScrollView>
        </MostPopularContainer>
        <TouchableOpacity onPress={() => supabase.auth.signOut()}>
          <StyledText>log out</StyledText>
        </TouchableOpacity>
      </Container>
    </ScrollView>
  )
}

const StyledText = styled.Text``
