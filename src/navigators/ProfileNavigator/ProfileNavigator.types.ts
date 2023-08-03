export type ProfileStackParamList = {
  Profile: undefined
  EditProfile: undefined
  Addresses: undefined
  EditAddress: {
    id?: number
    type: 'add' | 'edit'
  }
  Notifications: undefined
  Payments: undefined
  Security: undefined
  PrivacyPolicy: undefined
  HelpCenter: undefined
}
