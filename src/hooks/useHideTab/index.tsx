import React, { useEffect } from 'react'

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
          tabBarStyle: { display: 'none' },
        })
      : parent?.setOptions({
          tabBarStyle: {
            display: 'flex',
            backgroundColor: theme.darkColors.dark2,
            height: 55,
            paddingBottom: 5,
          },
        })

    return () => {
      hide
        ? parent?.setOptions({
            tabBarStyle: {
              display: 'flex',
              backgroundColor: theme.darkColors.dark2,
              height: 55,
              paddingBottom: 5,
            },
          })
        : parent?.setOptions({
            tabBarStyle: {
              display: 'flex',
              backgroundColor: theme.darkColors.dark2,
              height: 55,
              paddingBottom: 5,
            },
          })
    }
  }, [getParent])

  return {}
}
