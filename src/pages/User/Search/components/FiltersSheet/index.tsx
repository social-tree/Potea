import * as Styled from './Filters.styles'

import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'

import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Chip } from 'src/components/Form/Elements/Chip'
import { RatingStar } from 'src/assets/svg/RatingStar'
import React from 'react'
import { ScrollView } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { allFilters } from 'src/constants/filters'
import { allRatings } from 'src/constants/ratings'
import { sortByTypes } from 'src/constants/sortByTypes'
import { theme } from 'src/styles/theme'
import { useState } from 'react'

interface Props {
  sheetRef: React.Ref<BottomSheetMethods>
  handleFilterChange: (filterName: string, filterValue: any) => void
  filters: {
    [filter: string]: any
  }
  handleSearch: () => void
  handleReset: () => void
  priceRange: number[]
  handlePriceRange: (value: number[]) => void
}

export const FiltersSheet = ({
  sheetRef,
  handleFilterChange,
  filters,
  handleSearch,
  priceRange,
  handlePriceRange,
  handleReset,
}: Props) => {
  const [reseting, setReseting] = useState(false)

  return (
    <BottomSheet
      enablePanDownToClose
      ref={sheetRef}
      index={-1}
      containerStyle={{
        zIndex: 1,
      }}
      backgroundStyle={{
        backgroundColor: theme.darkColors.dark2,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24,
      }}
      snapPoints={['95%']}
    >
      <Styled.FilterContainer>
        <Styled.FiltersTitle>Sort & Filter</Styled.FiltersTitle>
        <Styled.FilterTitle>Categories</Styled.FilterTitle>
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
              key={filter.id}
              onPress={() => handleFilterChange('category', filter.filter)}
              selected={filters['category'] === filter.filter}
              text={filter.filter}
            />
          ))}
        </ScrollView>
        <Styled.FilterTitle>Price Range</Styled.FilterTitle>
        <Styled.StyledSlider
          key={`${reseting}`}
          containerStyle={{ marginHorizontal: 24 }}
          maximumTrackTintColor={theme.other.white}
          maximumValue={100}
          minimumTrackTintColor={theme.primary[500]}
          minimumValue={1}
          value={priceRange}
          thumbStyle={{
            backgroundColor: theme.other.white,
            borderWidth: 5,
            width: 20,
            height: 20,
            borderColor: theme.primary[500],
          }}
          step={1}
          onValueChange={(filterValue) => handlePriceRange(filterValue)}
          thumbTintColor={theme.other.white}
          renderBelowThumbComponent={(index, value) => (
            <Styled.PriceRangeDesc value={value}>
              ${value}
            </Styled.PriceRangeDesc>
          )}
        />
        <Styled.FilterTitle>Sort by</Styled.FilterTitle>
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
          {sortByTypes?.map((filterValue, index) => (
            <Chip
              key={index}
              onPress={() => handleFilterChange('sortBy', filterValue)}
              selected={filters['sortBy'] === filterValue}
              text={filterValue}
            />
          ))}
        </ScrollView>
        <Styled.FilterTitle>Rating</Styled.FilterTitle>
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
          {allRatings?.map((filterValue, index) => (
            <Chip
              key={index}
              onPress={() => handleFilterChange('rating', filterValue)}
              selected={filters['rating'] === filterValue}
              text={
                <Styled.RatingChipContent>
                  <RatingStar
                    fill={
                      filters['rating'] === filterValue
                        ? 'white'
                        : theme.primary[500]
                    }
                    width={13.34}
                    height={12.67}
                    halfStar={false}
                  />
                  <Styled.RatingText>
                    {filterValue == 0 ? 'All' : filterValue}
                  </Styled.RatingText>
                </Styled.RatingChipContent>
              }
            />
          ))}
        </ScrollView>
        <Styled.SubmitContainer>
          <Styled.ResetFiltersButton
            onPress={() => {
              handleReset()
              setReseting(true)
            }}
          >
            <Styled.ButtonText>Reset</Styled.ButtonText>
          </Styled.ResetFiltersButton>
          <Styled.SubmitButton onPress={() => handleSearch()}>
            <Styled.ButtonText>Apply</Styled.ButtonText>
          </Styled.SubmitButton>
        </Styled.SubmitContainer>
      </Styled.FilterContainer>
    </BottomSheet>
  )
}
