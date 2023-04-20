import { TouchableOpacity } from 'react-native'
import { supabase } from 'src/utils/supabase'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native'
import React, { useState } from 'react'
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
import { products } from 'src/constants/products'
import { Tag } from 'src/components/Elements/Tag'
import { filters } from 'src/constants/filters'

export const Home = ({ navigation }) => {
  const { control } = useForm()
  const [selectedFilter, setSelectedFilter] = useState('All')

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
  }

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
          <TouchableOpacity>
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
                liked={false}
                size="large"
                image={product.image}
                name={product.name}
                rating={product.rating}
                soldAmount={product.soldAmount}
                price={product.price}
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
                liked={false}
                image={product.image}
                name={product.name}
                rating={product.rating}
                soldAmount={product.soldAmount}
                price={product.price}
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
