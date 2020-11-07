import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Container,Grid,InputLabel,TextField, FormControl,Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function App(){
  const classes = useStyles();

  const [state, setState] = React.useState({
    outFormat: '',
    name: 'rz'
   
  });
  const [state2, setState2]=React.useState({
    categories:'',
    n2:'nnn'
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  const handleChange2=(event)=>{
    const n2= event.target.n2;
    setState2({
      ...state,
      [n2]:event.target.value,
    });
  }


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} >
            Detonation Database
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container >
        <h1>
          Search
        </h1>  

        <div >{/**for columns */}
        
            <Grid container spacing={1}>

                <Grid container item xs={12} spacing={1} >

                  <Grid item xs={2}>
                    <form >      
                    <TextField id="outlined-basic" label="Oxidizer" variant="outlined" />
                    </form>
                  </Grid>

                  <Grid item xs={2}>
                    <form >      
                    <TextField id="outlined-basic" label="Year" variant="outlined" />
                    </form>
                  </Grid>

                  <Grid item xs={1}>
                  <FormControl variant="outlined" >
                      <InputLabel htmlFor="outlined-outFormat-native-simple">Output Format</InputLabel>
                      <Select
                        native
                        value={state.outFormat}
                        onChange={handleChange}
                        label="outFormat"
                        inputProps={{
                          name: 'outFormat',
                          id: 'outlined-outFormat-native-simple',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={10}>AAAAAAA</option>
                        <option value={20}>BBBBBBBB</option>
                        <option value={30}>CCCCCCCC</option>
                      </Select>
                  </FormControl>
                  </Grid>

                  <Grid item xs={1}>
                  <FormControl variant="outlined" >
                      <InputLabel htmlFor="outlined-outFormat-native-simple">Categories</InputLabel>
                      <Select
                        native
                        value={state.categories}
                        onChange={handleChange2}
                        label="categories"
                        inputProps={{
                          name: 'outFormat',
                          id: 'outlined-outFormat-native-simple',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={10}>qqqqqqq</option>
                        <option value={20}>rrrrrrrr</option>
                        <option value={30}>ttttttttt</option>
                      </Select>
                  </FormControl>              
                  </Grid>
                  <Grid item xs={1}>
                      <Button variant="contained" color="primary" onClick={() => { alert('Incoming db search') }}>
                        Search Database
                      </Button>
                  </Grid>
                </Grid>

                <Grid container item xs={12} spacing={1} >

                  <Grid item xs={2}>
                    <form >      
                    <TextField id="outlined-basic" label="Subcategories" variant="outlined" />
                    </form>
                  </Grid>

                  <Grid item xs={2}>
                    <form >      
                    <TextField id="outlined-basic" label="Fuel" variant="outlined" />
                    </form>
                  </Grid>

                </Grid>

                <Grid container item xs={12} spacing={1}>
                    <Grid container item xs={12} spacing={1} >

                      <Grid item xs={2}>
                        <form >      
                        <TextField id="outlined-basic" label="Author" variant="outlined" />
                        </form>
                      </Grid>

                      <Grid item xs={2}>
                        <form >      
                        <TextField id="outlined-basic" label="Diluent" variant="outlined" />
                        </form>
                      </Grid>

                    </Grid>
                </Grid>

                
            </Grid>
        </div>
      </Container>
      
    </div>
  );
}