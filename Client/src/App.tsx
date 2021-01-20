import React, { Dispatch, SetStateAction, useState } from 'react'

import { IUserAccountModel } from './Remote/Models/IUserAccountModel'
import NavigationMenu from './Components/NavigationMenu'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from './Components/SnackbarUtils'
import { ThemeProvider } from '@material-ui/core'
import { getUserFromStorage } from './Common/Storage'
import { theme } from './appTheme'

interface IUserContextProps {
  user: IUserAccountModel,
  setUser: Dispatch<SetStateAction<IUserAccountModel>>
}

export const UserContext = React.createContext<Partial<IUserContextProps>>({})

export const App = () => {
  const [user, setUser] = useState<IUserAccountModel>(getUserFromStorage())

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ user, setUser }}>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
            <SnackbarUtilsConfigurator />
            <NavigationMenu />
          </SnackbarProvider>
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  )
}
