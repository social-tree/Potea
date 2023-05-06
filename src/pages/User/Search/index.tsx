import * as Crypto from 'expo-crypto'

import { FlatList, TouchableOpacity } from 'react-native'
import {
  Line,
  RecentContainer,
  RecentHeader,
  RecentSearch,
  RecentSearchText,
  RecentTitle,
} from './Search.styles'
import { useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Container } from './Search.styles'
import { GreenButton } from '../Home/Home.styles'
import { Misc } from 'src/assets/svg/Misc'
import { Search as SearchIcon } from 'src/assets/svg/Search'
import { SearchInput } from 'src/components/Form/Elements/Inputs'
import { SquareCross } from 'src/assets/svg/SquareCross'
import { theme } from 'src/styles/theme'
import { useForm } from 'react-hook-form'

export const Search = () => {
  const { control, watch, handleSubmit, setValue } = useForm()
  const [allRecentSearches, setAllRecentSearches] = useState([])

  const handleSearch = async (data) => {
    const { search } = data
    const storedRecentSearches =
      JSON.parse(await AsyncStorage.getItem('recentSearches')) || []
    storedRecentSearches.unshift({ id: Crypto.randomUUID(), text: search })
    AsyncStorage.setItem('recentSearches', JSON.stringify(storedRecentSearches))
  }

  const handleRecentSearch = async (recentSearch: {
    id: string
    text: string
  }) => {
    const recentSearches = JSON.parse(
      await AsyncStorage.getItem('recentSearches')
    )
    recentSearches.filter((search) => search.id !== recentSearch.id)
    recentSearches.unshift(recentSearch)
    AsyncStorage.setItem('recentSearches', JSON.stringify(recentSearches))
    setValue('search', searchText)
  }

  const searchText = watch('search')

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
    const storedRecentSearches = JSON.parse(
      await AsyncStorage.getItem('recentSearches')
    )
    storedRecentSearches.filter((search) => search.id === id)
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

  return (
    <Container>
      <SearchInput
        leftIcon={<SearchIcon />}
        name="search"
        placeholder="Search"
        control={control}
        rules={{ required: 'Please enter a search term' }}
        inputProps={{
          placeholderTextColor: theme.greyscale[600],
          onSubmitEditing: handleSubmit(handleSearch),
          onFocus: () => console.log('focus'),
        }}
        rightIcon={
          <TouchableOpacity>
            <Misc />
          </TouchableOpacity>
        }
      />
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
          renderItem={({ item }) => (
            <RecentSearch>
              <RecentSearchText onPress={() => handleRecentSearch(item)}>
                {item.text}
              </RecentSearchText>
              <SquareCross
                onPress={() => {
                  removeRecentSearch(item.id)
                }}
              />
            </RecentSearch>
          )}
        />
      </RecentContainer>
    </Container>
  )
}
