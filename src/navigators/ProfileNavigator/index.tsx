import { Addresses } from 'src/pages/User/Profile/Addresses'
import { EditAddress } from 'src/pages/User/Profile/EditAddress'
import { FillProfile } from 'src/pages/User/FillProfile'
import { Logo } from 'src/assets/svg/Leaf'
import { Payments } from 'src/pages/User/Profile/Payments'
import { PrivacyPolicy } from 'src/pages/User/Profile/PrivacyPolicy'
import { Profile } from 'src/pages/User/Profile'
import { ProfileStackParamList } from './ProfileNavigator.types'
import React from 'react'
import { Security } from 'src/pages/User/Profile/Security'
import { createStackNavigator } from '@react-navigation/stack'
import { useHideTab } from 'src/hooks/useHideTab'

const { Navigator, Screen } = createStackNavigator<ProfileStackParamList>()
const routesWithoutTabs = []
const ProfileNavigator = () => {
  useHideTab({ routesToHideTab: routesWithoutTabs })
  return (
    <Navigator initialRouteName="Profile">
      <Screen
        options={{
          headerLeft: () => <Logo width={20} height={24} />,
          headerLeftContainerStyle: {
            maxWidth: 43,
            width: '100%',
            alignItems: 'flex-end',
          },
        }}
        name="Profile"
        component={Profile}
      />
      <Screen
        options={{
          title: 'Edit Profile',
        }}
        name="EditProfile"
        component={FillProfile}
      />
      <Screen
        options={{
          title: 'Address',
        }}
        name="Addresses"
        component={Addresses}
      />
      <Screen
        options={{
          title: 'Add New Address',
        }}
        name="EditAddress"
        component={EditAddress}
      />
      <Screen
        options={{
          title: 'Payment',
        }}
        name="Payments"
        component={Payments}
      />
      <Screen
        options={{
          title: 'Security',
        }}
        name="Security"
        component={Security}
      />
      <Screen
        options={{
          title: 'Privac yPolicy',
        }}
        name="PrivacyPolicy"
        component={PrivacyPolicy}
      />
    </Navigator>
  )
}
export default ProfileNavigator
