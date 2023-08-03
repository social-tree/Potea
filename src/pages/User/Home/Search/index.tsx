import * as Crypto from 'expo-crypto'
import * as Styled from './Search.styles'

import { FlatList, Keyboard, TouchableOpacity, View } from 'react-native'
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { AppContext } from 'src/contexts/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BottomSheet from '@gorhom/bottom-sheet'
import { ClipBoards } from 'src/assets/svg/Clipboards'
import { Container } from './Search.styles'
import { FiltersSheet } from './components/FiltersSheet'
import { GreenButton } from '../Home.styles'
import { GreenText } from 'src/pages/Auth/Login/Login.styles'
import { HomeStackParamList } from 'src/navigators/HomeNavigator/HomeNavigator.types'
import { Loading } from 'src/assets/animations/Loading'
import { Misc } from 'src/assets/svg/Misc'
import { Product } from 'src/components/Elements/Product'
import React from 'react'
import { Search as SearchIcon } from 'src/assets/svg/Search'
import { SearchInput } from 'src/components/Form/Elements/Inputs'
import { SquareCross } from 'src/assets/svg/SquareCross'
import { StackScreenProps } from '@react-navigation/stack'
import { TouchableOpacity as TouchableOpacityGesture } from 'react-native-gesture-handler'
import { getProducts } from 'src/api/products'
import { productWithRatingType } from 'src/types/product'
import { theme } from 'src/styles/theme'
import { useForm } from 'react-hook-form'
import { usePagination } from 'src/hooks/usePagination'

export const Search = ({
  route,
}: StackScreenProps<HomeStackParamList, 'Search'>) => {
  const { control, watch, handleSubmit, setValue, reset } = useForm()
  const [allRecentSearches, setAllRecentSearches] = useState([])
  const { data, fetchData, nextPage, onPageRefresh } =
    usePagination(getProducts)
  const [searchInputFocused, setSearchInputFocused] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isRecentSearchesFocused, setIsRecentSearchesFocused] = useState(false)
  const [filters, setFilters] = useState({
    offerType: '',
    category: 'All',
    sortBy: 'Most Recent',
    rating: 0,
  })
  const [priceRange, setPriceRange] = useState([0, 100])
  const { addProductToFavorites, favoriteProducts } = useContext(AppContext)
  const sheetRef = useRef<BottomSheet>(null)
  const selectedFilters = route.params?.selectedFilters

  const saveRecents = async ({ DontSaveToRecent, searchText }) => {
    if (!DontSaveToRecent) {
      let storedRecentSearches =
        JSON.parse(await AsyncStorage.getItem('recentSearches')) || []
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
      storedRecentSearches.unshift({
        id: Crypto.randomUUID(),
        text: searchText,
      })
      AsyncStorage.setItem(
        'recentSearches',
        JSON.stringify(storedRecentSearches)
      )
    }
  }

  const handleSearch = async ({
    submitData,
    DontSaveToRecent = false,
    otherFilters,
  }: {
    submitData: { searchText?: string }
    DontSaveToRecent?: boolean
    otherFilters?: any
  }) => {
    const { searchText } = submitData
    setLoading(true)
    try {
      await fetchData(
        otherFilters || {
          offerType: filters.offerType,
          searchText: searchText,
          type: filters.category,
          priceRange: priceRange,
          rating: filters.rating,
        }
      ).finally(() => saveRecents({ DontSaveToRecent, searchText }))
      setLoading(false)
      setIsRecentSearchesFocused(false)
      getAllRecentSearches()
    } catch (error) {
      console.log(error)
    }
  }

  const handleRecentSearch = async (search: { id: string; text: string }) => {
    setValue('searchText', search.text)
    handleSearch({ submitData: { searchText: search.text } })
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

  useLayoutEffect(() => {
    if (selectedFilters) {
      handleSearch({
        submitData: {},
        DontSaveToRecent: true,
        otherFilters: selectedFilters,
      })
      setSearchInputFocused(false)
    }
  }, [selectedFilters])

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

  const toggleBottomSheet = () => {
    sheetRef.current?.snapToIndex(0)
    Keyboard.dismiss()
  }

  const handleFilterChange = (filterName, filterValue) => {
    setFilters((prev) => ({ ...prev, [filterName]: filterValue }))
  }

  return (
    <Container>
      <FiltersSheet
        handleFilterChange={handleFilterChange}
        filters={filters}
        priceRange={priceRange}
        handlePriceRange={setPriceRange}
        sheetRef={sheetRef}
        handleReset={() => {
          setFilters({
            category: 'All',
            rating: 0,
            sortBy: 'Most Recent',
            offerType: '',
          })
          setPriceRange([1, 100])
        }}
        handleSearch={() => {
          handleSubmit((submitData) => handleSearch({ submitData }))()
          sheetRef.current?.close()
        }}
      />
      <SearchInput
        leftIcon={<SearchIcon />}
        name="searchText"
        placeholder="Search"
        control={control}
        rules={{ required: 'Please enter a search term' }}
        inputProps={{
          placeholderTextColor: theme.greyscale[600],
          onSubmitEditing: handleSubmit((submitData) =>
            handleSearch({ submitData })
          ),
          autoFocus: selectedFilters ? false : true,
          onFocus: () => setSearchInputFocused(true),
          onBlur: () => setSearchInputFocused(false),
        }}
        rightIcon={
          <TouchableOpacity
            style={{ width: 20 }}
            onPress={() => toggleBottomSheet()}
          >
            <Misc fill={'red'} />
          </TouchableOpacity>
        }
      />
      {!searchInputFocused &&
      !loading &&
      (SearchInputValue || selectedFilters) &&
      !isRecentSearchesFocused ? (
        <Styled.ResultsContainer>
          <Styled.ResultsHeader>
            <Styled.SearchText>
              Results {SearchInputValue?.length > 0 && `for "`}
              <GreenText>
                {SearchInputValue?.length > 11
                  ? `${SearchInputValue?.slice(0, 11)}...`
                  : SearchInputValue}
              </GreenText>
              {SearchInputValue?.length > 0 && `"`}
            </Styled.SearchText>
            <GreenText>{data?.length.toLocaleString()} found</GreenText>
          </Styled.ResultsHeader>
          {data.length === 0 ? (
            <Styled.NothingFoundContainer>
              <ClipBoards />
              <Styled.NothingFoundInfo>
                <Styled.NothingFoundTitle>Not Found</Styled.NothingFoundTitle>
                <Styled.NothingFoundDesc>
                  Sorry, the keyword you entered cannot be found, please check
                  again or search with another keyword.
                </Styled.NothingFoundDesc>
              </Styled.NothingFoundInfo>
            </Styled.NothingFoundContainer>
          ) : (
            <FlatList
              data={data}
              onRefresh={() => onPageRefresh()}
              onEndReached={() => nextPage()}
              onEndReachedThreshold={0.1}
              numColumns={2}
              contentContainerStyle={{ paddingBottom: 78 }}
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
        </Styled.ResultsContainer>
      ) : loading ? (
        <Styled.LoadingContainer>
          <Loading style={{ width: 200 }} />
        </Styled.LoadingContainer>
      ) : (
        <Styled.RecentContainer>
          <Styled.RecentHeader>
            <Styled.RecentTitle>Recent</Styled.RecentTitle>
            <TouchableOpacity onPress={() => removeAllRecentSearches()}>
              <GreenButton>Clear All</GreenButton>
            </TouchableOpacity>
          </Styled.RecentHeader>
          <Styled.Line />
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
                  <Styled.RecentSearch>
                    <Styled.RecentSearchText>
                      {item.text?.length > 19
                        ? `${item.text?.slice(0, 19)}...`
                        : item.text}
                    </Styled.RecentSearchText>
                    <TouchableOpacityGesture
                      onPress={() => removeRecentSearch(item.id)}
                    >
                      <SquareCross />
                    </TouchableOpacityGesture>
                  </Styled.RecentSearch>
                </TouchableOpacityGesture>
              </View>
            )}
          />
        </Styled.RecentContainer>
      )}
    </Container>
  )
}
