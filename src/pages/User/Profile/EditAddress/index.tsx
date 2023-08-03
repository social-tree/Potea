import * as PaymentMethodsStyled from 'src/pages/User/Cart/PaymentMethods/PaymentMethods.styles'
import * as Styled from './EditAddress.styles'

import { LatLng, Marker } from 'react-native-maps'
import React, { useContext, useEffect, useState } from 'react'
import {
  addShippingAddress,
  getShippingAddress,
  updateShippingAddress,
} from 'src/api/shippingAddresses'

import { AppContext } from 'src/contexts/AppContext'
import BottomSheet from '@gorhom/bottom-sheet'
import { Button } from 'src/components/Elements/Button'
import { Input } from 'src/components/Form/Elements/Inputs'
import { Ionicons } from '@expo/vector-icons'
import { Keyboard } from 'react-native'
import { Modal } from 'src/components/Elements/Modal'
import { ProfileStackParamList } from 'src/navigators/ProfileNavigator/ProfileNavigator.types'
import { StackScreenProps } from '@react-navigation/stack'
import { SuccessShield } from 'src/assets/svg/SuccessShield'
import { theme } from 'src/styles/theme'
import { useForm } from 'react-hook-form'

export const EditAddress = ({
  navigation,
  route,
}: StackScreenProps<ProfileStackParamList, 'EditAddress'>) => {
  const [coordinates, setCoordinates] = useState<LatLng>()
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false)

  const { control, reset, handleSubmit } = useForm()

  const { user } = useContext(AppContext)

  const { id, type } = route.params

  const getUserShippingAddress = async () => {
    const { data, error } = await getShippingAddress({ id })
    setCoordinates({ latitude: data.latitude, longitude: data.longitude })
    reset({ address: data.address, title: data.title })
  }

  useEffect(() => {
    if ((type === 'edit' && !id) || (!id && !type)) navigation.goBack()

    if (type === 'edit') getUserShippingAddress()
  }, [id])

  const handleNewAddress = async ({
    title,
    address,
  }: {
    title: string
    address: string
  }) => {
    const formatedAddress = {
      id,
      addressInfo: {
        address,
        title,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        user_id: user.id,
      },
    }
    if (type === 'edit') {
      await updateShippingAddress(formatedAddress).then((data) => {
        setSuccessModalIsOpen(true)
        return data
      })
      console.log(formatedAddress.addressInfo)
      setSuccessModalIsOpen(true)
    } else if (type === 'add') {
      addShippingAddress(formatedAddress).then(() =>
        setSuccessModalIsOpen(true)
      )
    }
  }

  return (
    <>
      <Modal open={successModalIsOpen}>
        <PaymentMethodsStyled.ModalContainer>
          <SuccessShield />
          <PaymentMethodsStyled.ModalInfo>
            <PaymentMethodsStyled.ModalTitle>
              Top Up Successful!
            </PaymentMethodsStyled.ModalTitle>
            <PaymentMethodsStyled.ModalDesc>
              You have successfully {type === 'add' ? 'added' : 'edited'} your
              address
            </PaymentMethodsStyled.ModalDesc>
          </PaymentMethodsStyled.ModalInfo>
          <PaymentMethodsStyled.ModalButtons>
            <PaymentMethodsStyled.ModalViewOrderButton
              onPress={() => {
                navigation.goBack()
              }}
            >
              Return
            </PaymentMethodsStyled.ModalViewOrderButton>
          </PaymentMethodsStyled.ModalButtons>
        </PaymentMethodsStyled.ModalContainer>
      </Modal>
      <Styled.ShippingMapView
        region={{
          latitude: coordinates?.latitude,
          longitude: coordinates?.longitude,
          latitudeDelta: 20.0043,
          longitudeDelta: 0.0034,
        }}
        onPress={({ nativeEvent: { coordinate } }) => {
          setCoordinates(coordinate)
          Keyboard.dismiss()
        }}
      >
        {coordinates && <Marker coordinate={coordinates} />}
      </Styled.ShippingMapView>
      <BottomSheet
        snapPoints={[446]}
        backgroundStyle={{
          backgroundColor: theme.darkColors.dark1,
          borderRadius: 40,
          borderWidth: 1,
          borderColor: theme.darkColors.dark3,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.darkColors.dark3,
          width: 38,
        }}
      >
        <Styled.BottomSheetContainer>
          <Styled.Title>Address Details</Styled.Title>
          <Styled.Line />
          <Styled.InputContainer>
            <Styled.InputLabel>Name Address</Styled.InputLabel>
            <Input placeholder="" name="title" control={control} />
          </Styled.InputContainer>
          <Styled.InputContainer>
            <Styled.InputLabel>Address Details</Styled.InputLabel>

            <Input
              placeholder=""
              name="address"
              control={control}
              rightIcon={
                <Ionicons color="white" name="location-sharp" size={24} />
              }
            />
          </Styled.InputContainer>
          <Button onPress={() => handleSubmit(handleNewAddress)()} enableShadow>
            {type === 'add' ? 'Add' : 'Update'}
          </Button>
        </Styled.BottomSheetContainer>
      </BottomSheet>
    </>
  )
}
