import { createMuiTheme, makeStyles } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  spacing: 4,
  palette: {
    primary: {
      light: '#757ce8',
      //main: '#455A64',
      // main: '#2196F3',
      //main: '#587389',
      //main: '#779CBB',
      //main: '#61686E',
      //main: '#675A7E',
      //main: '#421410',
      //main: '#7C524E',
      //main: '#677967',
      main: '#3f50b5', //CURRENT ONE
      //main: '#1C7E4D', //greenish
      //main: '#673AB7', //purple
      //main: '#FF9800', //orangish
      //main: '#EC7D5A',//coral
      //main: '#F44336',//reddish
      //main: '#AB149E', //pinkish purple
      //main: '#4FC3F7', //sky blue
      //main: '#1273DE', //blue
      //main: '#80AA50',
      //main: '#AA507A', //dark pinkish
      //main: '#7B64FF',//lavender
      //main: '#9C84B1',
      //main: '#7F95BB',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  }
})

export const classStyles = () => {
  return makeStyles({
    defaultBorder: {
      borderColor: theme.palette.primary.light,
      borderRadius: 3,
      borderWidth: '1px',
      border: 'solid',
      padding: '15px',
      margin: '15px 0'
    },
    fitBorder: {
      borderColor: theme.palette.primary.light,
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
    },
  })()
}