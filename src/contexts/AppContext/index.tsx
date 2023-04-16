import { createContext, useState } from 'react'

export const AppContext = createContext({
  resetPassword: false,
  toggleResetPassword: () => {},
})

export const AppProvider = ({ children }) => {
  const [resetPassword, setResetPassword] = useState(false)

  const toggleResetPassword = () => {
    setResetPassword((prev) => (prev ? false : true))
  }

  return (
    <AppContext.Provider value={{ resetPassword, toggleResetPassword }}>
      {children}
    </AppContext.Provider>
  )
}
