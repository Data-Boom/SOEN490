import { persistor, rootStore } from './Stores/RootStore'

import NavigationMenu from './Components/Navigation/NavigationMenu'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import React from 'react'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from './Components/Utils/SnackbarUtils'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './appTheme'

export const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Provider store={rootStore}>
          <PersistGate loading={null} persistor={persistor}>
            <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
              <SnackbarUtilsConfigurator />
              <NavigationMenu />
            </SnackbarProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </div>
  )
}
