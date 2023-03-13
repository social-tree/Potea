import React, { useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { defaultTheme } from 'src/utils/defaultTheme'

export const useTheme = () => {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    (async () => {
        await AsyncStorage.setItem("theme",  await theme)
    })()
  }, [theme])

  return { theme, setTheme }
}

