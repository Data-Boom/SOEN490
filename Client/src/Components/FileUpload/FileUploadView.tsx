import { Box, Button } from '@material-ui/core'

import Download from '@axetroy/react-download'
import { FileUploadForm } from './FileUploadForm'
import React from 'react'
import { rm } from "../../Assets/readMeMessage"

const fileFormat = 'application/json'

export const FileUploadView = () => {
  const isValidFile = (file: File) => {
    return file && file.type === fileFormat
    console.log('file is valid')
  }

  const handleSubmit = async (jsonFile: File) => {
    const formData = new FormData()
    formData.append('file', jsonFile)
    console.log('handling data extraction')

    try {
      const response = await fetch('/api/v1/dataExtract', {
        body: formData
      })
      const extractedDataset = await response.json()
      console.log(extractedDataset, 'extracted dataset')

    }
    catch (err) {
      //todo add error handling
      console.log(err)
    }
  }

  return (
    <>
      <FileUploadForm
        onSubmit={handleSubmit}
      // validateFile={isValidFile}
      />
      <Box p={4}>
        <Download file="emptyJsonDataset.json" content={JSON.stringify("../../Assets/emptyJSFile.json", null, 2)}>
          <Button type="submit" variant="contained"> Download Sample JSON file </Button>
        </Download>
        <Download file="readMe.txt" content={rm}>
          <a href="http://localhost:3000/#/uploadFile"> Download JSON file submission instructions </a>
        </Download>
      </Box>
    </>
  )
}
