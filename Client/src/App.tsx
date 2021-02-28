import React, { useState } from 'react'
import { getUserFromStorage, putUserInStorage } from './Common/Storage'

import { IUserAccountModel, IUserSessionModel } from './Models/Authentication/IUserAccountModel'
import NavigationMenu from './Components/NavigationMenu';
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from './Components/Utils/SnackbarUtils'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './appTheme'
import { SessionTimeOut } from './Components/SessionTimeout';
import { SessionWrapper } from './Components/SessionWrapper';

interface IUserContextProps {
  user: IUserSessionModel
  setUser: (user: IUserSessionModel) => void
}

export const UserContext = React.createContext<Partial<IUserContextProps>>({})


export const App = () => {
  const [user, setUser] = useState<IUserSessionModel>(getUserFromStorage())

  const WrappedApp = SessionWrapper(NavigationMenu)

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
            <WrappedApp
            />
          </SnackbarProvider>
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  )
}
