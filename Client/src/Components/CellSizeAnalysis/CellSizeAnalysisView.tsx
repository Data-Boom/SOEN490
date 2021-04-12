import { Box, Typography } from '@material-ui/core'

import React from 'react'
import cellSizeAnalyzerExecutableWindows from '../../Assets/CellSizeAnalyzer-Windows.exe'
import cellSizeDemoGif from '../../Assets/cell-size-analysis-demo.gif'
import { useTitle } from '../../Common/Hooks/useTitle'

export const CellSizeAnalysisView = () => {
  useTitle("Cell Size Analysis")

  return (
    <>
      <Box p={5}>
        <h1> Cell Size Analysis Tool </h1>
        <h2>Installers</h2>
        <Typography>Windows executable </Typography>
        <a href={cellSizeAnalyzerExecutableWindows} download="Cell Size Analyzer.exe"> CellSizeAnalyzer.exe </a>
        <Typography>Mac executable </Typography>
        <a href={cellSizeAnalyzerExecutableWindows} download="Cell Size Analyzer.exe"> To Be Added Soon </a>
        <Typography>Linux executable </Typography>
        <a href={cellSizeAnalyzerExecutableWindows} download="Cell Size Analyzer.exe"> To Be Added Soon </a>
        <h2> Instructions </h2>
        <Typography>Enter the full path of the image and the length of the image. Adjust the sigma, low and high threhsold sliders to get the preferred image.</Typography>
        <Typography>Once the preferred image is obtained, start an analyis on the Canny image by pressing the Start Measurements button on the desired image</Typography>
        <h2> Analysis Buttons </h2>
        <Typography>Undo Action: Removes the last line or dot placed.</Typography>
        <Typography>Calculate length: Places lines between last two dots, ID of the line, and calculates the length measurement.</Typography>
        <Typography>Preview measurements: Displays a dialogue box with the IDs of the lines and their measurements</Typography>
        <Typography>Download measurements: Displays a dialogue box prompting a name for the .txt file to be downloaded in the same path of the installer </Typography>
        <Typography>Key binds to execute buttons: U (Undo), C (Calculate), P (Preview), D (Download) </Typography>
        <h2> Tips </h2>
        <Typography>Small sigma values allow detect of small sharp lines and fine features. High sigma detects large edges.</Typography>
        <Typography> Low and high thresholds determine which gradient edge pixels are kept. </Typography>
        <Typography> The program window is resizable at all times. </Typography>
        <Typography> To start analysis on a new picture, press on the Menu button (New Picture) on the top left. </Typography>
        <h2>Demo</h2>
        <img src={cellSizeDemoGif} alt="Cell size analysis demo"></img>
      </Box>
    </>
  )
}