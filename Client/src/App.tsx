import NavigationMenu from './Components/NavigationMenu'
import React from 'react'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from './Components/Utils/SnackbarUtils'
import { ThemeProvider } from '@material-ui/core'
import { UserContext } from './UserContext'
import { theme } from './appTheme'

export const App = () => {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserContext>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
            <SnackbarUtilsConfigurator />
            <NavigationMenu />
          </SnackbarProvider>
        </UserContext>
      </ThemeProvider>
    </div>
  )
}
