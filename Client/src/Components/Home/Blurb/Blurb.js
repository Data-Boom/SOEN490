import './Blurb.css'

import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import React from 'react'

export default function Blurb() {
  return (
    <>
      <Grid container item direction="row" justify="space-evenly" alignItems="center">
        <Grid item sm={2}>
          <Link to={"graph"}><h1 className="Header">Graphs</h1></Link>
        </Grid>
        <Grid item sm={2}>
          <Link to={"uploadDataset"}><h1 className="Header">Uploads</h1></Link>
        </Grid>
        <Grid item sm={2}>
          <Link to={"log-in"}><h1 className="Header">Accounts</h1></Link>
        </Grid>
        <Grid item sm={2}>
          <Link to={"search"}><h1 className="Header">Discover</h1></Link>
        </Grid>
        <Grid item sm={2} >
          <Link to={"dataCellAnalysis"}><h1 className="Header">Cell Size Analysis</h1></Link>
        </Grid>
      </Grid>
      <Grid container item direction="row" justify="space-evenly" alignItems="top center">
        <Grid item sm={2}>
          <p className="Paragraph">Interactive Graphs! Add/delete datasets, switch between scales, zoom in and out for clarify, download personal snapshots, and save a graph to revist. Enjoy seeing the database without limits!</p>
        </Grid>
        <Grid item top={1} sm={2}>
          <p className="Paragraph">Want to see a specific dataset in our database? Simple upload a dataset via JSON file, excel, or just filling out our easy to use form.</p>
        </Grid>
        <Grid item sm={2}>
          <p className="Paragraph">Get ready to have your own account, ability to upload datasets, save your favourites, and review datasets of others.</p>
        </Grid>
        <Grid item sm={2}>
          <p className="Paragraph">Need to find a dataset? Search with filters such as materials, authors, category, temperature, and more!</p>
        </Grid>
        <Grid item sm={2}>
          <p className="Paragraph">Welcome to the future! Bringing computer vision to your cells, upload an image of your experimental cells and let magic do the rest!</p>
        </Grid>
      </Grid>
    </>
  )
}