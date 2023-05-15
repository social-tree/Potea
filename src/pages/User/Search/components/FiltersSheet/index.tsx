import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import {
  ButtonText,
  FilterContainer,
  FilterTitle,
  FiltersTitle,
  PriceRangeDesc,
  RatingChipContent,
  RatingText,
  ResetFiltersButton,
  StyledSlider,
  SubmitButton,
  SubmitContainer,
} from './Filters.styles'
import { ScrollView, View } from 'react-native'

import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { Chip } from 'src/components/Form/Elements/Chip'
import { RatingStar } from 'src/assets/svg/RatingStar'
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
      containerStyle={{ zIndex: 1 }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      backgroundStyle={{ backgroundColor: theme.darkColors.dark2, zIndex: 0 }}
      snapPoints={['95%']}
    >
      <FilterContainer>
        <FiltersTitle>Sort & Filter</FiltersTitle>
        <FilterTitle>Categories</FilterTitle>
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
          {allFilters?.map((filterValue, index) => (
            <Chip
              key={index}
              onPress={() => handleFilterChange('category', filterValue)}
              selected={filters['category'] === filterValue}
              text={filterValue}
            />
          ))}
        </ScrollView>
        <FilterTitle>Price Range</FilterTitle>
        <StyledSlider
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
            <PriceRangeDesc value={value}>${value}</PriceRangeDesc>
          )}
        />
        <FilterTitle>Sort by</FilterTitle>
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
        <FilterTitle>Rating</FilterTitle>
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
                <RatingChipContent>
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
                  <RatingText>
                    {filterValue == 0 ? 'All' : filterValue}
                  </RatingText>
                </RatingChipContent>
              }
            />
          ))}
        </ScrollView>
        <SubmitContainer>
          <ResetFiltersButton
            onPress={() => {
              handleReset()
              setReseting(true)
            }}
          >
            <ButtonText>Reset</ButtonText>
          </ResetFiltersButton>
          <SubmitButton onPress={() => handleSearch()}>
            <ButtonText>Apply</ButtonText>
          </SubmitButton>
        </SubmitContainer>
      </FilterContainer>
    </BottomSheet>
  )
}
