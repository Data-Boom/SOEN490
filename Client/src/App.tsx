import NavigationMenu from './Components/Navigation/NavigationMenu'
import { Provider } from 'react-redux'
import React from 'react'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from './Components/Utils/SnackbarUtils'
import { StoreContextWrapper } from './Context/StoreContext'
import { ThemeProvider } from '@material-ui/core'
import { UserContextWrapper } from './Context/UserContext'
import { rootStore } from './Stores/RootStore'
import { theme } from './appTheme'

export const App = () => {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserContextWrapper>
          <StoreContextWrapper>
            <Provider store={rootStore}>
              <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
                <SnackbarUtilsConfigurator />
                <NavigationMenu />
              </SnackbarProvider>
            </Provider>
          </StoreContextWrapper>
        </UserContextWrapper>
      </ThemeProvider>
    </div>
  )
}
