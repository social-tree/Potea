import React, { useEffect } from 'react'

import { UserTabBarStyle } from 'src/navigators/UserNavigator'
import { ViewStyle } from 'react-native'
import { theme } from 'src/styles/theme'
import { useNavigation } from '@react-navigation/native'

interface Props {
  hide?: boolean
  customStyles?: ViewStyle
}

export const useHideTab = ({ hide, customStyles }: Props) => {
  const { getParent } = useNavigation()

  useEffect(() => {
    const parent = getParent()

    hide
      ? parent?.setOptions({
          tabBarStyle: {
            ...customStyles,
            ...UserTabBarStyle,
            display: 'none',
          },
        })
      : parent?.setOptions({
          tabBarStyle: {
            ...customStyles,
            ...UserTabBarStyle,
            display: 'flex',
          },
        })

    return () => {
      parent?.setOptions({
        tabBarStyle: {
          ...UserTabBarStyle,
          display: 'flex',
        },
      })
    }
  }, [getParent, hide, customStyles])

  return {}
}
