import { Box, Typography } from '@material-ui/core'

import React from 'react'
import cellSizeAnalyzerExecutable from '../../Assets/python-3.9.2-amd64.exe'

export const CellSizeAnalysisView = () => {
  return (
    <>
      <Box p={5}>
        <h1> Cell Size Analysis Tool </h1>
        <h2> Instructions </h2>
        <Typography>To start an analysis, enter the full path of the image and the top to bottom length of the image. Adjust the sigma, low and high threhsold sliders to get the preferred image.</Typography>
        <Typography>Small sigma values allow detect of small sharp lines and fine features. High sigma detects large edges.</Typography>
        <Typography> Low and high thresholds determine which gradient edge pixels are kept. </Typography>
        <h2>Installation</h2>
        <Typography>Download the installer below supported on: Windows, Mac OS, Linux. </Typography>
        <a href={cellSizeAnalyzerExecutable} download="Cell Size Analyzer.exe"> Download Here </a>
      </Box>
    </>
  )
}