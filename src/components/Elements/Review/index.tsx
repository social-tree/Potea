import * as Styled from './Review.styles'

import { RatingStar } from 'src/assets/svg/RatingStar'
import React from 'react'
import { getDateDifference } from 'src/helpers/getDateDifference'
import { reviewWithUserType } from 'src/types/review'
import { storageSupabaseURL } from 'src/utils/supabase'

interface Props {
  rating: number
  description: string
  createdDate: string
  userInfo: reviewWithUserType['userInfo']
}

export const Review = ({
  userInfo,
  rating,
  description,
  createdDate,
}: Props) => {
  return (
    <Styled.Container>
      <Styled.InfoContainer>
        <Styled.Avatar
          source={{ uri: `${storageSupabaseURL}${userInfo.avatar}` }}
        />
        <Styled.Username>{userInfo.nickname}</Styled.Username>
        <Styled.ReviewRating>
          <RatingStar width={10} height={9.5} halfStar={false} />
          <Styled.RatingValue>{rating}</Styled.RatingValue>
        </Styled.ReviewRating>
      </Styled.InfoContainer>
      {description && <Styled.Description>{description}</Styled.Description>}
      <Styled.CreatedDate>
        {getDateDifference(new Date(createdDate))}
      </Styled.CreatedDate>
    </Styled.Container>
  )
}
