import * as Styled from './ChooseAmount.styles'

import React, { useEffect } from 'react'

import { Button } from 'src/components/Elements/Button'
import { StackScreenProps } from '@react-navigation/stack'
import { WalletStackParamList } from 'src/navigators/WalletNavigator/WalletNavigator.types'
import { theme } from 'src/styles/theme'
import { topUpAmounts } from 'src/constants/topUpAmounts'
import { useForm } from 'react-hook-form'

export const ChooseAmount = ({
  navigation,
}: StackScreenProps<WalletStackParamList, 'ChooseAmount'>) => {
  const { control, reset, handleSubmit, watch } = useForm()

  const changeCurrentAmount = (amount: number) => {
    reset({ topUpAmount: `${amount}` })
  }

  useEffect(() => {
    reset({ topUpAmount: `0` })
  }, [])

  const handleFormSubmit = ({ topUpAmount }: { topUpAmount: string }) => {
    navigation.navigate('TopUpPaymentMethod', {
      topUpAmount: Number(topUpAmount),
    })
  }

  return (
    <Styled.Container>
      <Styled.Title>Enter the amount of top up</Styled.Title>
      <Styled.AmountInput
        name="topUpAmount"
        mask="$999999999"
        type="number"
        control={control}
        placeholder=""
        inputProps={{
          placeholderTextColor: theme.primary[500],
          style: {
            color: theme.primary[500],
            fontSize: 48,
          },
          textAlign: 'center',
          textAlignVertical: 'center',
          verticalAlign: 'middle',
          keyboardType: 'number-pad',
        }}
        inputWrapProps={{ style: { paddingRight: 0, paddingLeft: 0 } }}
      />
      {topUpAmounts.map((amountArray, index) => (
        <Styled.AmountsContainer key={index}>
          {amountArray.map((amount, index) => (
            <Styled.AmountChip
              key={index}
              onPress={() => changeCurrentAmount(amount)}
              text={`$${amount?.toLocaleString()}`}
              selected={false}
            />
          ))}
        </Styled.AmountsContainer>
      ))}
      <Button
        disabled={
          Number(watch('topUpAmount')) <= 0 || !Number(watch('topUpAmount'))
        }
        onPress={() => handleSubmit(handleFormSubmit)()}
      >
        Continue
      </Button>
    </Styled.Container>
  )
}
