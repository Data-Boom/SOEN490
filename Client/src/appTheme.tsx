import { createMuiTheme, makeStyles } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  spacing: 4,
  palette: {
    primary: {
      light: '#ccd5e4',
      main: '#7F95BB',
      dark: '#526c9a',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff',
    },
  }
})

export const classStyles = () => {
  return makeStyles({
    defaultBorder: {
      borderColor: theme.palette.primary.main,
      borderRadius: 3,
      borderWidth: '1px',
      border: 'solid',
      padding: '15px',
      margin: '15px 0'
    },
    fitBorder: {
      borderColor: theme.palette.primary.main,
      borderRadius: 3,
      borderWidth: '1px',
      border: 'solid',
      padding: '3px 10px',
      margin: '5px 0'
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalsearch: {
      display: 'grid',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'auto',
    },
    divider: {
      background: theme.palette.primary.light,
    }
  })()
}