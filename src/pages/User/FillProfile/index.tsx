import * as ImagePicker from 'expo-image-picker'
import * as Styled from './FillProfile.styles'

import React, { useContext, useEffect, useState } from 'react'
import { storageSupabaseURL, supabase } from 'src/utils/supabase'

import { AppContext } from 'src/contexts/AppContext'
import { Button } from 'src/components/Elements/Button'
import { Calendar } from 'src/assets/svg/Calendar'
import DateTimePicker from '@react-native-community/datetimepicker'
import { EmptyProfile } from 'src/assets/svg/EmptyProfile'
import { FontAwesome } from '@expo/vector-icons'
import { Image } from 'react-native'
import { Input } from 'src/components/Form/Elements/Inputs'
import { Select } from 'src/components/Form/Elements/Select'
import { StackScreenProps } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native'
import { UserBottomStackParamList } from 'src/navigators/UserNavigator/UserNavigator.types'
import { decode } from 'base64-arraybuffer'
import { theme } from 'src/styles/theme'
import { useForm } from 'react-hook-form'

export const FillProfile = ({
  navigation,
  route,
}: StackScreenProps<UserBottomStackParamList, 'FillProfile'>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    reset,
  } = useForm()

  const Params = route.params

  const { user, setModalErrorText } = useContext(AppContext)
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false)
  const [datepickerValue, setDatepickerValue] = useState<Date>(
    new Date(new Date().toDateString())
  )

  const onFillProfileSubmit = async (formData) => {
    if (!!isOverEighteen(formData.date_of_birth))
      return setError('date_of_birth', {
        type: 'custom',
        message: 'You must be 18 years or older to continue',
      })
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
        .update({ avatar: formData?.avatar?.uri, ...formData })
        .eq('id', user.id)
      if (error && error.code) {
        return setModalErrorText(
          `there was an error with updating your information ${
            error.code && `error code: ${error?.code}`
          }`
        )
      }
      navigation.navigate('HomeNav')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    Params?.title && navigation.setOptions({ title: Params.title })
  }, [Params])

  useEffect(() => {
    const checkUserMetaData = async () => {
      if (!!user.user_metadata) {
        const { id, avatar, created_at, date_of_birth, gender, ...otherdata } =
          user.user_metadata
        reset({
          ...otherdata,
          avatar: {
            uri: `${storageSupabaseURL}${avatar}?time=${new Date().getTime()}`,
          },
          date_of_birth: new Date(date_of_birth),
          gender: Number(gender) ? `${gender}` : null,
        })
      }
    }
    checkUserMetaData()
  }, [user])

  const isOverEighteen = (date: Date) => {
    var now = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''))
    var dateOfBirth =
      date.getUTCFullYear() * 10000 +
      date.getUTCMonth() * 100 +
      date.getUTCDate() * 1 // date of birth of the user
    return now - dateOfBirth < 180000
  }

  return (
    <Styled.Container
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
        <Styled.ProfilePictureContainer>
          {watch('avatar')?.uri ? (
            <Image
              source={{
                uri: `${watch('avatar').uri}?time=${new Date().getTime()}`,
                width: 140,
                height: 140,
              }}
              borderRadius={100}
            />
          ) : (
            <FontAwesome name="user-circle" size={150} color="black" />
          )}
          <Styled.EditPen />
        </Styled.ProfilePictureContainer>
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
          maximumDate={new Date()}
          mode={'date'}
          is24Hour={true}
          onChange={(event, selectedDate) => {
            setDatepickerValue(new Date(selectedDate.toDateString()))
            setIsDatepickerOpen(false)

            setValue('date_of_birth', new Date(selectedDate.toDateString()))
            if (!!isOverEighteen(selectedDate))
              setError('date_of_birth', {
                type: 'custom',
                message: 'You must be 18 years or older to continue',
              })
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
      <Select
        errors={errors}
        placeholder="Gender"
        options={[
          { name: 'Male', value: '1' },
          { name: 'Female', value: '2' },
          { name: 'Other', value: '3' },
        ]}
        rules={{ required: 'Please select a gender' }}
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
    </Styled.Container>
  )
}
