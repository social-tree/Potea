import * as FillProfileStyled from '../FillProfile/FillProfile.styles'
import * as ImagePicker from 'expo-image-picker'
import * as Styled from './Profile.styles'

import { Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { storageSupabaseURL, supabase } from 'src/utils/supabase'

import { AppContext } from 'src/contexts/AppContext'
import { EmptyProfile } from 'src/assets/svg/EmptyProfile'
import { ProfileStackParamList } from 'src/navigators/ProfileNavigator/ProfileNavigator.types'
import { ScrollView } from 'react-native-gesture-handler'
import { StackScreenProps } from '@react-navigation/stack'
import { profileOptions } from 'src/constants/profileOptions'
import { uploadUserProfileImage } from 'src/api/avatar'
import { useForm } from 'react-hook-form'

export const Profile = ({
  navigation,
}: StackScreenProps<ProfileStackParamList, 'Profile'>) => {
  const { user, setModalErrorText } = useContext(AppContext)
  const { setValue, watch, handleSubmit } = useForm()

  useEffect(() => {
    setValue('avatar', {
      uri: `${storageSupabaseURL}${user.user_metadata.avatar}`,
    })
  }, [user?.user_metadata?.avatar])

  const onProfileImageChange = async (formData) => {
    try {
      if (formData?.avatar?.base64) {
        const { data, error } = await uploadUserProfileImage({
          avatarBase64: formData?.avatar?.base64,
          userId: user.id,
        })

        formData.avatar = data?.path
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
      setValue('avatar', {
        uri: `${storageSupabaseURL}${
          formData.avatar
        }?time=${new Date().getTime()}`,
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 24, gap: 30 }}>
      <Styled.ProfilePreview>
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
            if (!result.assets[0].uri) return
            setValue('avatar', {
              uri: result.assets[0].uri,
              base64: result.assets[0].base64,
            })
            handleSubmit(onProfileImageChange)()
          }}
        >
          <FillProfileStyled.ProfilePictureContainer>
            {watch('avatar')?.uri ? (
              <Image
                key={`${user.user_metadata.avatar}`}
                source={{
                  uri: watch('avatar').uri,
                  width: 140,
                  height: 140,
                }}
                onError={(err) => console.log(err.nativeEvent, 'w')}
                borderRadius={100}
              />
            ) : (
              <EmptyProfile />
            )}
            <FillProfileStyled.EditPen />
          </FillProfileStyled.ProfilePictureContainer>
        </TouchableOpacity>
        <Styled.FullName ellipsizeMode="tail" numberOfLines={1}>
          {user.user_metadata.full_name}
        </Styled.FullName>
        <Styled.Email ellipsizeMode="tail" numberOfLines={1}>
          {user.user_metadata.email}
        </Styled.Email>
      </Styled.ProfilePreview>
      <Styled.Line />
      {profileOptions.map(
        ({ icon, name, target, color, noArrow, parentName }) => (
          <Styled.ProfileOption
            onPress={() => {
              if (name.toLowerCase().includes('logout'))
                return supabase.auth.signOut()
              const parent = navigation.getParent()
              parentName
                ? parent.navigate(parentName, { screen: target })
                : navigation.navigate(target as any)
            }}
          >
            <>
              <Styled.ProfileOptionIcon>{icon}</Styled.ProfileOptionIcon>
              <Styled.ProfileOptionLabel color={color}>
                {name}
              </Styled.ProfileOptionLabel>
              {!noArrow && (
                <Styled.ChevArrow
                  name="md-chevron-forward"
                  size={20}
                  color="white"
                />
              )}
            </>
          </Styled.ProfileOption>
        )
      )}
    </ScrollView>
  )
}
