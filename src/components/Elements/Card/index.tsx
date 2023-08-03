import * as Styled from './Card.styles'

import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { View } from 'react-native'
import { WalletStackParamList } from 'src/navigators/WalletNavigator/WalletNavigator.types'
import { theme } from 'src/styles/theme'

interface Props {
  username: string
  balance: number
  navigation: StackNavigationProp<WalletStackParamList, 'MyWallet', undefined>
}

export const Card = ({ username, balance, navigation }: Props) => {
  return (
    <Styled.Container
      resizeMode={'cover'}
      imageStyle={{ borderRadius: 40 }}
      source={{ uri: 'https://i.imgur.com/zgVZrHK.png' }}
    >
      <Styled.Top>
        <Styled.TopCardDetails>
          <Styled.CardName>{username}</Styled.CardName>
          <Styled.CardNumber>●●●● ●●●● ●●●● 3629</Styled.CardNumber>
        </Styled.TopCardDetails>
        <Styled.CardLogos>
          <FontAwesome name="cc-visa" size={40} color="white" />
        </Styled.CardLogos>
      </Styled.Top>
      <Styled.Bottom>
        <Styled.BalanceContainer>
          <Styled.BalanceTitle>Your balance</Styled.BalanceTitle>
          <Styled.BalanceNumber>
            ${balance?.toLocaleString()}
          </Styled.BalanceNumber>
        </Styled.BalanceContainer>
        <Styled.TopUpButton
          textProps={{ style: { color: theme.primary[500] } }}
          onPress={() => navigation.navigate('ChooseAmount')}
        >
          Top Up
        </Styled.TopUpButton>
      </Styled.Bottom>
    </Styled.Container>
  )
}
