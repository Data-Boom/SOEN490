import { Box, Container, Divider, FormControl, FormControlLabel, Grid, InputLabel, Radio, RadioGroup, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Search2() {

  const rows = [
    { title: "test" },
    { title: "test3" },
    { title: "test4" },
    { title: "test2" }
  ]

  const renderSelect = (title, options) => {
    return (
      <>
        <InputLabel htmlFor="outlined-outFormat-native-simple" >{title}</InputLabel>
        <Select
          native
          label="categories"
          inputProps={{
            name: 'outFormat',
            id: 'outlined-outFormat-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          {options.map(option => <option value={option.value}>{option.text}</option>)}
        </Select>
      </>
    )
  }

  const renderSearch = () => {
    return (
      <>
        <Typography variant='h4' align="left">Search</Typography>
        <Grid container spacing={4}>
          <Grid item sm={3}>
            <TextField fullWidth id="outlined-basic" label="Oxidizer" variant="outlined"/>
          </Grid>

          <Grid item sm={3}>
            <TextField fullWidth id="outlined-basic" label="Year" variant="outlined"/>
          </Grid>

          <Grid item sm={2}>
            <FormControl variant="outlined" fullWidth >
              {renderSelect("Oxidizer", [{ value: 1, text: "test1" }, { value: 2, text: "test2" }, { value: 3, text: "test3" }])}
            </FormControl>
          </Grid>

          <Grid item sm={2}>
            <FormControl variant="outlined" fullWidth>
              {renderSelect("Categories", [{ value: 1, text: "test1" }, { value: 2, text: "test2" }, { value: 3, text: "test3" }])}
            </FormControl>
          </Grid>

          <Grid item sm={2}>
            <Button variant="contained" color="primary" onClick={() => { alert('Incoming db search') }}>Search Database</Button>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item sm={3}>
            <TextField id="outlined-basic" label="Subcategories" variant="outlined" fullWidth/>
          </Grid>

          <Grid item sm={3}>
            <TextField id="outlined-basic" label="Fuel" variant="outlined" fullWidth/>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item sm={3}>
            <TextField id="outlined-basic" label="Author" variant="outlined" fullWidth/>
          </Grid>

          <Grid item sm={3}>
            <TextField id="outlined-basic" label="Diluent" variant="outlined" fullWidth/>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item>
            <FormControl component="fieldset">
              <FormControlLabel
                label="Case Sensitive"
                labelPlacement="start"
                control={<Switch />}
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

  return (
    <Container>
      <Box pt={4}>
        {renderSearch()}
      </Box>
      <Box pt={4}>
        {renderResults()}
      </Box>
    </Container>
  );
}