import { FileUploadForm } from './FileUploadForm'
import React from 'react'

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
      await fetch('http://localhost:4000/dataupload', options)
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
    </>
  )
}
