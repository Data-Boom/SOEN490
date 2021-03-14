import React, { useState } from 'react'
import { getUserFromStorage, putUserInStorage } from './Common/Storage'

import { IUserAccountModel } from './Models/Authentication/IUserAccountModel'
import NavigationMenu from './Components/NavigationMenu'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from './Components/Utils/SnackbarUtils'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './appTheme'

interface IUserContextProps {
  user: IUserAccountModel
  setUserContext: (user: IUserAccountModel) => void
}

export const UserContext = React.createContext<Partial<IUserContextProps>>({})

export const App = () => {
  const [userState, setUserState] = useState<IUserAccountModel>(getUserFromStorage())

  const setUserContext = (user: IUserAccountModel): void => {
    setUserState(user)
    putUserInStorage(user)
  }

  const userContext: IUserContextProps = {
    user: userState,
    setUserContext: setUserContext
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={userContext}>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
            <SnackbarUtilsConfigurator />
            <NavigationMenu />
          </SnackbarProvider>
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  )
}
