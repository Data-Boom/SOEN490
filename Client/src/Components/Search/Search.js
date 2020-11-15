import { Box, Container, Divider, FormControl, FormControlLabel, Grid, InputLabel, Radio, RadioGroup, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function Search() {

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
  const [categories, setCategories] = useState([{ value: 1, text: "test1" }, { value: 2, text: "test2" }, { value: 3, text: "test3" }, { value: 4, text: "new value"}])
  const [rows, setRows] = useState([
    { title: "test" },
    { title: "test3" },
    { title: "test4" },
    { title: "test5" },
    { title: "test2" }
  ])

  const toggleIsCaseSensitive = () => {
    setIsCaseSensitive(!isCaseSensitive)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value})
  }

  const handleSubmit = () => {
    alert(JSON.stringify(formValues, null, 2) + `\n  ${isCaseSensitive}`)
  }

  const renderSearch = () => {
    console.log(JSON.stringify(formValues, null, 2))
    return (
      <>
        <Typography variant='h4' align="left">Search</Typography>
        <Grid container spacing={4}>
          <Grid item sm={3}>
            <TextField fullWidth label="Oxidizer" variant="outlined" name="oxidizer" value={formValues.oxidizer} onChange={handleInputChange} />
          </Grid>

          <Grid item sm={3}>
            <TextField fullWidth label="Year" variant="outlined" name="year" value={formValues.year} onChange={handleInputChange} />
          </Grid>

          <Grid item sm={2}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-outFormat-native-simple" >Output format</InputLabel>
              <Select
                native
                label="categories"
                name="outputFormat" value={formValues.outputFormat} onChange={handleInputChange}
              >
                <option aria-label="None" value="" />
                {categories.map(option => <option value={option.value}>{option.text}</option>)}
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={2}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-outFormat-native-simple" >Categories</InputLabel>
              <Select
                native
                label="categories"
                name="categories" value={formValues.categories} onChange={handleInputChange}
              >
                <option aria-label="None" value="" />
                {categories.map(option => <option value={option.value}>{option.text}</option>)}
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Search Database</Button>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item sm={3}>
            <TextField label="Subcategories" variant="outlined" fullWidth name="subcategories" value={formValues.subcategories} onChange={handleInputChange} />
          </Grid>

          <Grid item sm={3}>
            <TextField label="Fuel" variant="outlined" fullWidth name="fuel" value={formValues.fuel} onChange={handleInputChange} />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item sm={3}>
            <TextField label="Author" variant="outlined" fullWidth name="author" value={formValues.author} onChange={handleInputChange} />
          </Grid>

          <Grid item sm={3}>
            <TextField label="Diluent" variant="outlined" fullWidth name="dilutent" value={formValues.dilutent} onChange={handleInputChange} />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item>
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

  const renderResults = () => {
    return (
      <>
        <Typography variant='h4' align="left">Results</Typography>
        <TableContainer>
          <Table size={"small"}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Oxidizer</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Subcategory</TableCell>
                <TableCell align="right">Fuel</TableCell>
                <TableCell align="right">Diluent</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Year</TableCell>
                <TableCell align="right">Output Format</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderRows(rows)}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  }

  const renderRows = (rows) => {
    return rows.map((row) => (
      <TableRow key={row.name}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.title}</TableCell>
        <TableCell align="right">{row.oxidizer}</TableCell>
        <TableCell align="right">{row.category}</TableCell>
        <TableCell align="right">{row.subcategory}</TableCell>
        <TableCell align="right">{row.fuel}</TableCell>
        <TableCell align="right">{row.diluent}</TableCell>
        <TableCell align="right">{row.author}</TableCell>
        <TableCell align="right">{row.year}</TableCell>
        <TableCell align="right">{row.outputFormat}</TableCell>
      </TableRow>
    ))
  }

  console.log("rendered form")

  return (
    <Container>
      <Box pt={4}>
        {renderSearch()}
      </Box>
      <Box pt={4}>
        {renderResults()}
      </Box>
    </Container>
  )
}