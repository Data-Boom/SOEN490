import './Blurb.css'

import Box from '@material-ui/core/Box'
import React from 'react'

export default function Blurb() {
  return (
    <Box display="flex" flexDirection="row">
      <Box display="flex" flexDirection="column">
        <h1 className="Header" >Graphs</h1>
        <p className="Paragraph">Interactive Graphs! Add/delete datasets, switch between scales, zoom in and out for clarify, download personal snapshots, and save a graph to revist. Enjoy seeing the database without limits!</p>
      </Box>
      <Box display="flex" flexDirection="column">
        <h1 className="Header">Downloads</h1>
        <p className="Paragraph">Downloads have never been so easy. Select the datasets you want, choose the format you need, preview for perfection and DOWNLOAD WITH A CLICK.</p>
      </Box>
      <Box display="flex" flexDirection="column">
        <h1 className="Header2">Accounts</h1>
        <p className="Paragraph">Get ready to have your own account, ability to upload datasets, save your favourites, and review datasets of others.</p>
      </Box>
      <Box display="flex" flexDirection="column">
        <h1 className="Header2">Search and Discover</h1>
        <p className="Paragraph">Need to find a dataset? Search with filters such as materials, authors, category, temperature, and more!</p>
      </Box>
      <Box display="flex" flexDirection="column">
        <h1 className="Header">Analyses</h1>
        <p className="Paragraph">Welcome to the future! Bringing computer vision to data cells, upload an image of your experimental data cells and let magic do the rest!</p>
      </Box>
    </Box>
  )
}