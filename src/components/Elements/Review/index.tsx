import {
  Avatar,
  Container,
  CreatedDate,
  Description,
  InfoContainer,
  RatingValue,
  ReviewRating,
  Username,
} from './Review.styles'

import { RatingStar } from 'src/assets/svg/RatingStar'
import React from 'react'
import { getDateDifference } from 'src/helpers/getDateDifference'
import { storageSupabaseURL } from 'src/utils/supabase'

interface Props {
  rating: number
  description: string
  createdDate: string
  userInfo: {
    avatar: string
    nickname: string
  }
}

export const Review = ({
  userInfo,
  rating,
  description,
  createdDate,
}: Props) => {
  return (
    <Container>
      <InfoContainer>
        <Avatar source={{ uri: `${storageSupabaseURL}${userInfo.avatar}` }} />
        <Username>{userInfo.nickname}</Username>
        <ReviewRating>
          <RatingStar width={10} height={9.5} halfStar={false} />
          <RatingValue>{rating}</RatingValue>
        </ReviewRating>
      </InfoContainer>
      {description && <Description>{description}</Description>}
      <CreatedDate>{getDateDifference(new Date(createdDate))}</CreatedDate>
    </Container>
  )
}
