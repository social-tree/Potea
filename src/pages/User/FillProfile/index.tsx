import * as ImagePicker from 'expo-image-picker'

import {
  Container,
  ProfilePictureContainer,
  StyledEditPen,
  StyledEmptyProfile,
} from './FillProfile.styles'
import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import { Button } from 'src/components/Elements/Button'
import { Calendar } from 'src/assets/svg/Calendar'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Image } from 'react-native'
import { Input } from 'src/components/Form/Elements/Inputs'
import { Select } from 'src/components/Form/Elements/Select'
import { TouchableOpacity } from 'react-native'
import { decode } from 'base64-arraybuffer'
import { supabase } from 'src/utils/supabase'
import { theme } from 'src/styles/theme'
import { useForm } from 'react-hook-form'
import { useHideTab } from 'src/hooks/useHideTab'

export const FillProfile = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    reset,
  } = useForm()

  const { user, setModalErrorText } = useContext(AppContext)
  useHideTab({ hide: true })
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false)
  const [datepickerValue, setDatepickerValue] = useState<Date>(
    new Date(new Date().toDateString())
  )

  const onFillProfileSubmit = async (formData) => {
    try {
      if (formData?.avatar?.base64) {
        const { error } = await supabase.storage
          .from('avatars')
          .upload(`${user.id}.png`, decode(formData?.avatar?.base64), {
            cacheControl: '3600',
            upsert: true,
            contentType: 'image/png',
          })
          .then((res) => {
            formData.avatar = res.data?.path
            return res
          })
        if (error && error?.['statusCode']) {
          return setModalErrorText(
            `there was an error with uploading your avatar ${
              error?.['statusCode'] && `error code: ${error?.['statusCode']}`
            }`
          )
        }
      }
      const { error } = await supabase
        .from('users')
        .update(formData)
        .eq('id', user.id)
      if (error && error.code) {
        return setModalErrorText(
          `there was an error with updating your information ${
            error.code && `error code: ${error?.code}`
          }`
        )
      }
      navigation.navigate('Home')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const checkUserMetaData = async () => {
      if (!!user.user_metadata) {
        const { id, avatar, created_at, date_of_birth, gender, ...otherdata } =
          user.user_metadata
        console.log(user.user_metadata)
        reset({
          ...otherdata,
          date_of_birth: new Date(date_of_birth),
          gender: Number(gender?.id) ? `${gender.id}` : null,
        })
      }
    }
    checkUserMetaData()
  }, [user])

  return (
    <Container
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      <TouchableOpacity
        onPress={async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            selectionLimit: 1,
            base64: true,
          })
          setValue('avatar', {
            uri: result.assets[0].uri,
            base64: result.assets[0].base64,
          })
        }}
      >
        <ProfilePictureContainer>
          {watch('avatar') ? (
            <Image
              source={{ uri: watch('avatar').uri, width: 140, height: 140 }}
              borderRadius={100}
            />
          ) : (
            <StyledEmptyProfile />
          )}
          <StyledEditPen />
        </ProfilePictureContainer>
      </TouchableOpacity>
      <Input
        name={'full_name'}
        control={control}
        placeholder="Full Name"
        rules={{ required: 'Enter a Full Name' }}
        errors={errors}
      />
      <Input
        name={'nickname'}
        control={control}
        placeholder="Nickname"
        rules={{ required: 'Enter a Nickname' }}
        errors={errors}
      />
      {isDatepickerOpen && (
        <DateTimePicker
          testID="dateTimePicker"
          value={datepickerValue}
          mode={'date'}
          is24Hour={true}
          onChange={(event, selectedDate) => {
            setDatepickerValue(new Date(selectedDate.toDateString()))
            setIsDatepickerOpen(false)
            setValue('date_of_birth', new Date(selectedDate.toDateString()))
          }}
        />
      )}
      <TouchableOpacity
        style={{ width: '100%' }}
        onPress={() => setIsDatepickerOpen(true)}
      >
        <Input
          name={'date_of_birth'}
          rightIcon={<Calendar />}
          control={control}
          placeholder="Date of Birth"
          rules={{ required: 'Enter a Date of Birth' }}
          errors={errors}
          inputProps={{
            editable: false,
            focusable: false,
          }}
        />
      </TouchableOpacity>
      <Input
        name={'phone_number'}
        control={control}
        placeholder="Phone Number"
        rules={{ required: 'Enter a Phone Number' }}
        errors={errors}
        mask="+9 (999) 999-99-99"
      />
      <Select
        errors={errors}
        placeholder="Gender"
        options={[
          { name: 'Male', value: '1' },
          { name: 'Female', value: '2' },
          { name: 'Other', value: '3' },
        ]}
        name="gender"
        control={control}
      />
      <Button
        style={{
          shadowColor: `${theme.primary[500]}90`,
          shadowOpacity: 1,
          elevation: 40,
        }}
        onPress={() => handleSubmit(onFillProfileSubmit)()}
      >
        Continue
      </Button>
    </Container>
  )
}
