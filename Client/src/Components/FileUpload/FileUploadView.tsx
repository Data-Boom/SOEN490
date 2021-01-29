import { Box, Button } from '@material-ui/core'

import Download from '@axetroy/react-download'
import { FileUploadForm } from './FileUploadForm'
import React from 'react'
import { rm } from "../../Assets/readMeMessage"

const fileFormat = 'application/json'

export const FileUploadView = () => {
  const isValidFile = (file: File) => {
    return file && file.type === fileFormat
  }

  const handleSubmit = async (jsonFile: File) => {
    const formData = new FormData()
    formData.append('file', jsonFile)

    try {
      console.log(formData, 'formData')
      // const extractedDataset = await callDataExtract(formData)
      console.log('got gere')
      await fetch('/api/v1/dataExtract', {
        method: 'POST',
        body: formData
      })
    }
    catch (err) {
      //todo add error handling
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
