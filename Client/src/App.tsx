import React, { useState } from 'react'
import { getUserFromStorage, putUserInStorage } from './Common/Storage'

import { IUserAccountModel, IUserSessionModel } from './Models/Authentication/IUserAccountModel'
import NavigationMenu from './Components/NavigationMenu'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from './Components/Utils/SnackbarUtils'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './appTheme'

interface IUserContextProps {
  user: IUserSessionModel
  setUser: (user: IUserSessionModel) => void
}

export const UserContext = React.createContext<Partial<IUserContextProps>>({})

export const App = () => {
  const [user, setUser] = useState<IUserSessionModel>(getUserFromStorage())

  const setStateAndStorage = (user: IUserSessionModel): void => {
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
