import { Bell } from 'src/assets/svg/Bell'
import { Info } from 'src/assets/svg/Info'
import { Ionicons } from '@expo/vector-icons'
import { Lock } from 'src/assets/svg/Lock'
import { Logout } from 'src/assets/svg/Logout'
import React from 'react'
import { SheildCheckMark } from 'src/assets/svg/SheildCheckMark'
import { User as UserIcon } from 'src/assets/svg/User'
import { Users } from 'src/assets/svg/Users'
import { Wallet } from 'src/assets/svg/Wallet'
import { theme } from 'src/styles/theme'

const iconColor = theme.other.white

export const profileOptions = [
  {
    icon: <UserIcon width={24} height={24} fill={iconColor} />,
    name: 'Edit Profile',
    target: 'EditProfile',
  },
  {
    icon: <Ionicons color={iconColor} size={22} name="location-outline" />,
    name: 'Address',
    target: 'Addresses',
  },
  {
    icon: <Bell width={24} height={24} stroke={iconColor} />,
    name: 'Notification',
    parentName: 'HomeNav',
    target: 'Notificationsy',
  },
  {
    icon: <Wallet width={18} height={16} fill={'none'} stroke={iconColor} />,
    name: 'Payment',
    target: 'Payments',
  },
  {
    icon: (
      <SheildCheckMark
        width={18}
        height={16}
        fill={'none'}
        stroke={iconColor}
      />
    ),
    name: 'Security',
    target: 'Security',
  },
  {
    icon: <Lock width={18} height={16} fill={'none'} stroke={iconColor} />,
    name: 'Privacy Policy',
    target: 'PrivacyPolicy',
  },
  {
    icon: <Info width={18} height={18} fill={'none'} stroke={iconColor} />,
    name: 'Help Center',
    target: 'Edit Profile',
  },
  {
    icon: <Logout width={20} height={18} fill={'none'} stroke={iconColor} />,
    name: 'Logout',
    target: 'Edit Profile',
    color: theme.status.error,
    noArrow: true,
  },
]
