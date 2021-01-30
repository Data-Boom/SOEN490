import React, { useState } from 'react'

import { Alert } from '@material-ui/lab'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core'
import { Snackbar } from '@material-ui/core'
import { SyntheticEvent } from 'react'
import { classStyles } from '../../appTheme'
import uploadimage from './uploadimage.png'
import { Link } from 'react-router-dom'
import { datasetUploadRoute } from '../../Common/Consts/Routes'

interface IProps {
  acceptFileFormat?: string,
  onSubmit: (uploadedFile: File) => void,
  isValidFile?: (uploadedFile: File) => boolean,
}

const fileInputId = 'fileInput'

export const FileUploadForm = (props: IProps) => {
  const { onSubmit, isValidFile, acceptFileFormat } = props

  const [alertOpen, setAlertOpen] = useState(false)
  const [alertSuccess, setAlertSuccess] = useState(false)

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement, Event>) => {
    const input: HTMLInputElement = event.target[fileInputId]
    const file: File = input.files[0]
    //if validate file was not provided will isValidFile = true
    const isValid = isValidFile ? isValidFile(file) : true
    if (isValid) {
      onSubmit(file)
      setAlertSuccess(true)
      //window.location.href = datasetUploadRoute
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
          Failed to parse file.
        </Alert>
      </Snackbar>

      <Snackbar open={alertSuccess} autoHideDuration={3000} onClose={() => setAlertSuccess(false)}>
        <Alert onClose={() => setAlertSuccess(false)} severity="success">
          File successfully uploaded.
        </Alert>
      </Snackbar>

      <Container>
        <Box className={classStyles().defaultBorder}>
          <img src={uploadimage} alt="Visual of clouds"></img>
          <form onSubmit={handleSubmit}>
            <div>
              <input type="file" accept={acceptFileFormat} id={fileInputId} />
              <Button variant="contained" type='submit' color='primary'> Upload </Button>
            </div>
          </form>
        </Box>
      </Container>
    </>
  )
}