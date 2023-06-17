import * as Styled from './ChoiceSplit.styles'

import React from 'react'

export const ChoiceSplit = (props) => {
  return (
    <Styled.Container {...props}>
      <Styled.Line />
      <Styled.StyledText>or</Styled.StyledText>
      <Styled.Line />
    </Styled.Container>
  )
}
