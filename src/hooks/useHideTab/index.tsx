import React, { useEffect } from 'react'

import { UserTabBarStyle } from 'src/navigators/UserNavigator'
import { theme } from 'src/styles/theme'
import { useNavigation } from '@react-navigation/native'

interface Props {
  hide?: boolean
}

export const useHideTab = ({ hide }: Props) => {
  const { getParent } = useNavigation()

  useEffect(() => {
    const parent = getParent()

    hide
      ? parent?.setOptions({
          tabBarStyle: {
            ...UserTabBarStyle,
            display: 'none',
          },
        })
      : parent?.setOptions({
          tabBarStyle: {
            ...UserTabBarStyle,
            display: 'flex',
          },
        })

    return () => {
      hide &&
        parent?.setOptions({
          tabBarStyle: {
            ...UserTabBarStyle,
            display: 'flex',
          },
        })
    }
  }, [getParent])

  return {}
}
