import * as Crypto from 'expo-crypto'

import {
  FlatList,
  Keyboard,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  Line,
  LoadingContainer,
  NothingFoundContainer,
  NothingFoundDesc,
  NothingFoundInfo,
  NothingFoundTitle,
  RecentContainer,
  RecentHeader,
  RecentSearch,
  RecentSearchText,
  RecentTitle,
  ResultsContainer,
  ResultsHeader,
  SearchText,
} from './Search.styles'
import { useContext, useEffect, useState } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ClipBoards } from 'src/assets/svg/Clipboards'
import { Container } from './Search.styles'
import { GreenButton } from '../Home/Home.styles'
import { GreenText } from 'src/pages/Auth/Login/Login.styles'
import { Loading } from 'src/assets/animations/Loading'
import { Misc } from 'src/assets/svg/Misc'
import { Product } from 'src/components/Elements/Product'
import { Search as SearchIcon } from 'src/assets/svg/Search'
import { SearchInput } from 'src/components/Form/Elements/Inputs'
import { SquareCross } from 'src/assets/svg/SquareCross'
import { TouchableOpacity as TouchableOpacityGesture } from 'react-native-gesture-handler'
import { getProducts } from 'src/api/products'
import { theme } from 'src/styles/theme'
import { useForm } from 'react-hook-form'

export const Search = () => {
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const [allRecentSearches, setAllRecentSearches] = useState([])
  const [products, setProducts] = useState([])
  const [searchInputFocused, setSearchInputFocused] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isRecentSearchesFocused, setIsRecentSearchesFocused] = useState(false)

  const { addProductToFavorites, favoriteProducts } = useContext(AppContext)

  const handleSearch = async (submitData) => {
    const { searchText } = submitData
    let storedRecentSearches =
      JSON.parse(await AsyncStorage.getItem('recentSearches')) || []
    if (storedRecentSearches[0]?.text === searchText)
      return setIsRecentSearchesFocused(false)
    const isSearchAlreadyStored = storedRecentSearches.find(
      (recentSearch) => recentSearch.text === searchText
    )
    if (isSearchAlreadyStored) {
      storedRecentSearches = storedRecentSearches.filter(
        (recentSearch) => recentSearch.text !== searchText
      )
    }
    if (storedRecentSearches.length > 12) {
      storedRecentSearches.pop()
    }
    storedRecentSearches.unshift({ id: Crypto.randomUUID(), text: searchText })
    AsyncStorage.setItem('recentSearches', JSON.stringify(storedRecentSearches))
    setLoading(true)
    const { data, error } = await getProducts({
      offerType: 'normal',
      searchText: searchText,
    })
    setProducts(data)
    setLoading(false)
    setIsRecentSearchesFocused(false)
    getAllRecentSearches()
  }

  const handleRecentSearch = async (search: { id: string; text: string }) => {
    setValue('searchText', search.text)
    handleSearch({ searchText: search.text })
  }

  const getAllRecentSearches = async () => {
    const storedRecentSearches = JSON.parse(
      await AsyncStorage.getItem('recentSearches')
    )
    setAllRecentSearches(storedRecentSearches)
  }

  useEffect(() => {
    getAllRecentSearches()
  }, [])

  const removeRecentSearch = async (id: string) => {
    let storedRecentSearches = JSON.parse(
      await AsyncStorage.getItem('recentSearches')
    )
    console.log(storedRecentSearches)
    storedRecentSearches = storedRecentSearches.filter(
      (recentSearch) => recentSearch.id !== id
    )
    await AsyncStorage.setItem(
      'recentSearches',
      JSON.stringify(storedRecentSearches)
    )
    getAllRecentSearches()
  }

  const removeAllRecentSearches = () => {
    AsyncStorage.removeItem('recentSearches')
    getAllRecentSearches()
  }

  const SearchInputValue = watch('searchText')

  return (
    <Container>
      <SearchInput
        leftIcon={<SearchIcon />}
        name="searchText"
        placeholder="Search"
        control={control}
        rules={{ required: 'Please enter a search term' }}
        inputProps={{
          placeholderTextColor: theme.greyscale[600],
          onSubmitEditing: handleSubmit(handleSearch),
          autoFocus: true,
          onFocus: () => setSearchInputFocused(true),
          onBlur: () => setSearchInputFocused(false),
        }}
        rightIcon={
          <TouchableOpacity>
            <Misc />
          </TouchableOpacity>
        }
      />
      {!searchInputFocused &&
      !loading &&
      SearchInputValue &&
      !isRecentSearchesFocused ? (
        <ResultsContainer>
          <ResultsHeader>
            <SearchText>
              Results for "
              <GreenText>
                {SearchInputValue?.length > 11
                  ? `${SearchInputValue?.slice(0, 11)}...`
                  : SearchInputValue}
              </GreenText>
              "
            </SearchText>
            <GreenText>{products?.length.toLocaleString()} found</GreenText>
          </ResultsHeader>
          {products.length === 0 ? (
            <NothingFoundContainer>
              <ClipBoards />
              <NothingFoundInfo>
                <NothingFoundTitle>Not Found</NothingFoundTitle>
                <NothingFoundDesc>
                  Sorry, the keyword you entered cannot be found, please check
                  again or search with another keyword.
                </NothingFoundDesc>
              </NothingFoundInfo>
            </NothingFoundContainer>
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
        </ResultsContainer>
      ) : loading ? (
        <LoadingContainer>
          <Loading style={{ width: 200 }} />
        </LoadingContainer>
      ) : (
        <RecentContainer>
          <RecentHeader>
            <RecentTitle>Recent</RecentTitle>
            <TouchableOpacity onPress={() => removeAllRecentSearches()}>
              <GreenButton>Clear All</GreenButton>
            </TouchableOpacity>
          </RecentHeader>
          <Line />
          <FlatList
            data={allRecentSearches}
            keyExtractor={(item) => item.id}
            onScroll={() => {
              setIsRecentSearchesFocused(true)
            }}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacityGesture
                  onPress={() => handleRecentSearch(item)}
                >
                  <RecentSearch>
                    <RecentSearchText>
                      {item.text?.length > 19
                        ? `${item.text?.slice(0, 19)}...`
                        : item.text}
                    </RecentSearchText>
                    <TouchableOpacityGesture
                      onPress={() => removeRecentSearch(item.id)}
                    >
                      <SquareCross />
                    </TouchableOpacityGesture>
                  </RecentSearch>
                </TouchableOpacityGesture>
              </View>
            )}
          />
        </RecentContainer>
      )}
    </Container>
  )
}