import NavigationMenu from './Components/NavigationMenu'
import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './appTheme'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavigationMenu />
      </ThemeProvider>
    </div>
  )
}

export default App