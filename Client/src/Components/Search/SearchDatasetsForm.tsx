import { Button, FormControl, FormControlLabel, Grid, InputLabel, Select, Switch, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

interface IProps {
  handleSubmit()
}

export const SearchDatasetsForm = (props: IProps) => {
  const [formValues, setFormValues] = useState({
    oxidizer: '',
    year: '',
    outputFormat: '',
    categories: '',
    subcategories: '',
    fuel: '',
    author: '',
    dilutent: '',
  })

  const [isCaseSensitive, setIsCaseSensitive] = useState(false)
  const [categories, setCategories] = useState([])
  useEffect(() => {
    //useEffect with [] will run once component renders the first time ever. Now we are passing mocked values but we need to create endpoint to get those categories
    //todo create categories endpoint
    setCategories([{ value: 1, text: "test1" }, { value: 2, text: "test2" }, { value: 3, text: "test3" }, { value: 4, text: "new value" }])
  }, [])

  const toggleIsCaseSensitive = () => {
    setIsCaseSensitive(!isCaseSensitive)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <>
      <Typography variant='h4' align="left">Search</Typography>
      <Grid container spacing={4} >
        <Grid item sm={3} >
          <TextField fullWidth label="Oxidizer" variant="outlined" name="oxidizer" value={formValues.oxidizer} onChange={handleInputChange} />
        </Grid>

        <Grid item sm={3} >
          <TextField fullWidth label="Year" variant="outlined" name="year" value={formValues.year} onChange={handleInputChange} />
        </Grid>

        <Grid item sm={2} >
          <FormControl variant="outlined" fullWidth >
            <InputLabel htmlFor="outlined-outFormat-native-simple" > Output format </InputLabel>
            <Select
              native
              label="categories"
              name="outputFormat" value={formValues.outputFormat} onChange={handleInputChange}
            >
              <option aria-label="None" value="" />
              {categories.map(option => <option key={option.value} value={option.value} > {option.text} </option>)}
            </Select>
          </FormControl>
        </Grid>

        <Grid item sm={2} >
          <FormControl variant="outlined" fullWidth >
            <InputLabel htmlFor="outlined-outFormat-native-simple" > Categories </InputLabel>
            <Select
              native
              label="categories"
              name="categories" value={formValues.categories} onChange={handleInputChange}
            >
              <option aria-label="None" value="" />
              {categories.map(option => <option key={option.value} value={option.value} > {option.text} </option>)}
            </Select>
          </FormControl>
        </Grid>

        <Grid item sm={2} >
          <Button variant="contained" color="primary" onClick={props.handleSubmit} > Search Database </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4} >
        <Grid item sm={3} >
          <TextField label="Subcategories" variant="outlined" fullWidth name="subcategories" value={formValues.subcategories} onChange={handleInputChange} />
        </Grid>

        <Grid item sm={3} >
          <TextField label="Fuel" variant="outlined" fullWidth name="fuel" value={formValues.fuel} onChange={handleInputChange} />
        </Grid>
      </Grid>

      <Grid container spacing={4} >
        <Grid item sm={3} >
          <TextField label="Author" variant="outlined" fullWidth name="author" value={formValues.author} onChange={handleInputChange} />
        </Grid>

        <Grid item sm={3} >
          <TextField label="Diluent" variant="outlined" fullWidth name="dilutent" value={formValues.dilutent} onChange={handleInputChange} />
        </Grid>
      </Grid>

      <Grid container spacing={4} >
        <Grid item >
          <FormControl>
            <FormControlLabel
              label="Case Sensitive"
              labelPlacement="start"
              control={
                <Switch
                  name="isCaseSensitive"
                  checked={isCaseSensitive}
                  onChange={toggleIsCaseSensitive}
                />}
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}