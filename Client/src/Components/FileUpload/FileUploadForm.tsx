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
  acceptFileFormat?: string,
  onSubmit: (uploadedFile: File) => void,
}

const fileInputId = 'fileInput'

export const FileUploadForm = (props: IProps) => {
  const { onSubmit, acceptFileFormat } = props

  const [alertOpen, setAlertOpen] = useState(false)
  const [alertSuccess, setAlertSuccess] = useState(false)

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement, Event>) => {
    event.preventDefault()
    event.stopPropagation()
    const input: HTMLInputElement = event.target[fileInputId]
    const file: File = input.files[0]

    onSubmit(file)
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
              <Button id="uploadFileButton" variant="contained" type='submit' color='primary'> Upload </Button>
            </div>
          </form>
        </Box>
      </Container>
    </>
  )
}