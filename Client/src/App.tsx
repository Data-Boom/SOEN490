import React, { useState } from 'react'

import { IUserAccountModel } from './Remote/Models/IUserAccountModel'
import NavigationMenu from './Components/NavigationMenu'
import { ThemeProvider } from '@material-ui/core'
import { getUserFromStorage } from './Common/LocalStorage'
import { theme } from './appTheme'

export const UserContext = React.createContext({
  user: null,
  setUser: () => { }
})

export const App = () => {
  const [user, setUser] = useState<IUserAccountModel>(getUserFromStorage())

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavigationMenu />
      </ThemeProvider>
    </div>
  )
}
