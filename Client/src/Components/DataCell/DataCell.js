import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import React from 'react'
import uploadimage from './uploadimage.png'

export default function DataCell() {
  const callAPI = () => {
    fetch("http://localhost:4000/dataupload")
  }

  return (
    <Box display="flex" marginLeft={"25%"} flexDirection="column" justify="center" alignItems="center" border={30} borderColor={"#2e3b52"} width={720} height={300} padding={10}>
      <img src={uploadimage} />
      <p>Choose a File or Drag/Drop here</p>
      <Button onClick={callAPI} variant="contained" t={0.5}>Browse</Button>
    </Box>
  )
}