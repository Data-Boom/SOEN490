import React, { useState } from 'react'
import { getUserFromStorage, putUserInStorage } from './Common/Storage'

import { IUserAccountModel } from './Models/Authentication/IUserAccountModel'
import NavigationMenu from './Components/NavigationMenu'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from './Components/SnackbarUtils'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './appTheme'

interface IUserContextProps {
  user: IUserAccountModel,
  setUser: (user: IUserAccountModel) => void
}

export const UserContext = React.createContext<Partial<IUserContextProps>>({})

export const App = () => {
  const [user, setUser] = useState<IUserAccountModel>(getUserFromStorage())

  const setStateAndStorage = (user: IUserAccountModel): void => {
    setUser(user)
    putUserInStorage(user)
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ user, setUser: setStateAndStorage }}>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
            <SnackbarUtilsConfigurator />
            <NavigationMenu />
          </SnackbarProvider>
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  )
}
