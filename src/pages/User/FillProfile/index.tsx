import {
  Container,
  ProfilePictureContainer,
  StyledEditPen,
  StyledEmptyProfile,
} from './FillProfile.styles'

import { Button } from 'src/components/Elements/Button'
import { Calendar } from 'src/assets/svg/Calendar'
import { EditPen } from 'src/assets/svg/EditPen'
import { EmptyProfile } from 'src/assets/svg/EmptyProfile'
import { Input } from 'src/components/Form/Elements/Inputs'
import React from 'react'
import { Select } from 'src/components/Form/Elements/Select'
import { View } from 'react-native'
import { theme } from 'src/styles/theme'
import { useForm } from 'react-hook-form'

export const FillProfile = ({ navigation }) => {
  const {
    control,
    formState: { errors },
  } = useForm()

  return (
    <Container
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      <ProfilePictureContainer>
        <StyledEmptyProfile />
        <StyledEditPen />
      </ProfilePictureContainer>
      <Input
        name={'fullname'}
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
      <Input
        name={'dateOfBirth'}
        rightIcon={<Calendar />}
        control={control}
        placeholder="Date of Birth"
        rules={{ required: 'Enter a Date of Birth' }}
        errors={errors}
      />
      <Input
        name={'phoneNumber'}
        control={control}
        placeholder="Phone Number"
        rules={{ required: 'Enter a Phone Number' }}
        errors={errors}
      />
      <Select
        errors={errors}
        placeholder="Gender"
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' },
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
        onPress={() => navigation.navigate('AuthMethod')}
      >
        Continue
      </Button>
    </Container>
  )
}
