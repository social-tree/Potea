import React, { useCallback, useEffect } from 'react'
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from '@react-navigation/native'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'

import { UserTabBarStyle } from 'src/navigators/UserNavigator'
import { ViewStyle } from 'react-native'

interface Props {
  hide?: boolean
  customStyles?: ViewStyle
  navigation?: any
  key?: any
  routesToHideTab?: string[]
}

export const useHideTab = ({ hide, customStyles, routesToHideTab }: Props) => {
  const navigation = useNavigation()
  const route = useRoute()

  useFocusEffect(() => {
    console.log('ran')
    const parent = navigation
    if (routesToHideTab.includes(getFocusedRouteNameFromRoute(route))) {
      parent?.setOptions({
        tabBarStyle: { ...customStyles, ...UserTabBarStyle, display: 'none' },
      })
    } else {
      parent?.setOptions({
        tabBarStyle: { ...customStyles, ...UserTabBarStyle, display: 'flex' },
      })
    }
    return () => {
      parent?.setOptions({
        tabBarStyle: { ...customStyles, ...UserTabBarStyle, display: 'flex' },
      })
    }
  })

  return {}
}
