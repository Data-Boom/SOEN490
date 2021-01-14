import React, { Dispatch, SetStateAction, useState } from 'react'

import { IUserAccountModel } from './Remote/Models/IUserAccountModel'
import NavigationMenu from './Components/NavigationMenu'
import { ThemeProvider } from '@material-ui/core'
import { getUserFromStorage } from './Common/LocalStorage'
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
          <NavigationMenu />
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  )
}
