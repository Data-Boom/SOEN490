import React, { useState } from 'react'

import { Alert } from '@material-ui/lab'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core'
import { Snackbar } from '@material-ui/core'
import { SyntheticEvent } from 'react'
import { classStyles } from '../../appTheme'
import uploadimage from './uploadimage.png'

interface IProps {
  acceptFileFormat: string,
  onSubmit: (uploadedFile: File) => void,
  //return true if file isValid
  validateFile?: (uploadedFile: File) => boolean,
}

const fileInputId = 'fileInput'

export const FileUploadForm = (props: IProps) => {
  const { onSubmit, validateFile, acceptFileFormat } = props

  const [alertOpen, setAlertOpen] = useState(false)
  const [alertSuccess, setAlertSuccess] = useState(false)


  const handleSubmit = (event: SyntheticEvent<HTMLFormElement, Event>) => {
    const input: HTMLInputElement = event.target[fileInputId]
    const file: File = input.files[0]
    //if validate file was not provided will isValidFile = true
    const isValidFile = validateFile(file) //|| true
    console.log("vF is " + validateFile + "  and vF() is " + validateFile(file))
    if (isValidFile) {
      onSubmit(file)
      console.log('File successfully uploaded')
      setAlertSuccess(true)
    }
    else {
      setAlertOpen(true)
    }
  }

  return (
    <>
      {/* Snackbar is used to show an error on the screen when a wrong file type is selected for uploading */}
      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => setAlertOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity="error">
          Failed to parse file
        </Alert>
      </Snackbar>

      <Snackbar open={alertSuccess} autoHideDuration={3000} onClose={() => setAlertSuccess(false)}>
        <Alert onClose={() => setAlertSuccess(false)} severity="success">
          File Successfully updated!!
        </Alert>
      </Snackbar>

      <Container>
        <Box className={classStyles().defaultBorder}>
          <img src={uploadimage} alt="Visual of clouds"></img>
          <form onSubmit={handleSubmit}>
            <div>
              <input type="file" accept={acceptFileFormat} id={fileInputId} />
              <Button variant="contained" type='submit' color='primary'> Upload this file! </Button>
            </div>
          </form>
        </Box>
      </Container>
    </>
  )
}