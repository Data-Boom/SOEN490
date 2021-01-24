import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Download from '@axetroy/react-download'
import { FileUploadForm } from './FileUploadForm'
import React from 'react'
import { rm } from "../../Assets/readMeMessage"

const fileFormat = 'application/json'
export default function DataCell() {

  const validateJson = (file: File) => {
    return file && file.type !== fileFormat
  }

  /**
     * Upon submission, the JSON file is extracted from the event and must be appended to formData
     * to be sent with API request.
     */
  const handleSubmit = async (jsonFile: File) => {
    const formData = new FormData()
    formData.append('file', jsonFile)

    const options = {
      method: 'POST',
      body: formData,
    }

    try {
      await fetch('http://localhost:4000/api/v1/dataExtract', options)
        .then(resp => resp.json())
        .then(result => {
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
        validateFile={validateJson}
        acceptFileFormat={fileFormat}
      />
      <Box p={4}>
        <div>
          {/**for downloading sample empty json file*/}
          <Download file="emptyJsonDataset.json" content={JSON.stringify("../../Assets/emptyJSFile.json", null, 2)}>
            <Button type="submit" variant="contained"> Download Sample JSON file </Button>
          </Download>
        </div>
        {/**for downnloading instructions readMe for users */}
        <div>
          <Download file="readMe.txt" content={rm}>
            <a href="http://localhost:3000/#/uploadFile"> Download JSON file submission instructions </a>
          </Download>
        </div>
      </Box>
    </>
  )
}
