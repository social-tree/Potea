import * as Styled from './Reviews.styles'

import React, { useContext, useEffect, useState } from 'react'
import { reviewType, reviewWithUserType } from 'src/types/review'

import { AppContext } from 'src/contexts/AppContext'
import { Chip } from 'src/components/Form/Elements/Chip'
import { FlatList } from 'react-native-gesture-handler'
import { HomeStackParamList } from 'src/navigators/HomeNavigator/HomeNavigator.types'
import { RatingChipContent } from '../Search/components/FiltersSheet/Filters.styles'
import { RatingStar } from 'src/assets/svg/RatingStar'
import { Review } from 'src/components/Elements/Review'
import { ScrollView } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { allRatings } from 'src/constants/ratings'
import { getReviews } from 'src/api/reviews'
import { theme } from 'src/styles/theme'

export const Reviews = ({
  route,
}: StackScreenProps<HomeStackParamList, 'Reviews'>) => {
  const [ratingFilter, setRatingFilter] = useState(0)
  const [reviews, setReviews] = useState<reviewWithUserType[] | []>([])

  const { setModalErrorText } = useContext(AppContext)

  const { productId, reviewsAmount } = route.params

  useEffect(() => {
    if (!reviewsAmount) return
    const getAllReviews = async () => {
      const { data, error } = await getReviews({
        productId,
        filterByRating: ratingFilter,
      })

      if (data) setReviews(data as reviewWithUserType[])
      if (error)
        setModalErrorText(
          `An error occurred while trying to get product reviews. error code: ${error.code}`
        )
    }
    getAllReviews()
  }, [ratingFilter, productId])

  return (
    <Styled.Container>
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          flexDirection: 'row',
          padding: 24,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {allRatings?.map((filterValue, index) => (
          <Chip
            key={index}
            onPress={() => setRatingFilter(filterValue)}
            selected={ratingFilter === filterValue}
            text={
              <RatingChipContent>
                <RatingStar
                  fill={
                    ratingFilter === filterValue ? 'white' : theme.primary[500]
                  }
                  width={13.34}
                  height={12.67}
                  halfStar={false}
                />
                <Styled.RatingText>
                  {filterValue == 0 ? 'All' : filterValue}
                </Styled.RatingText>
              </RatingChipContent>
            }
          />
        ))}
      </ScrollView>
      {!reviewsAmount && (
        <Styled.NothingFoundContainer>
          <Styled.NothingFoundText>
            There are no reviews about this product
          </Styled.NothingFoundText>
        </Styled.NothingFoundContainer>
      )}
      <FlatList
        contentContainerStyle={{ gap: 24 }}
        renderItem={({ item }: { item: reviewWithUserType }) => (
          <Review
            userInfo={item.userInfo}
            createdDate={item.created_at}
            description={item.description}
            rating={item.rating}
          />
        )}
        data={reviews}
      />
    </Styled.Container>
  )
}
