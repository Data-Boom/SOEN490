import { Box, Button, Container } from '@material-ui/core'
import React, { useEffect } from 'react'

import Download from '@axetroy/react-download'
import { FileUploadForm } from './FileUploadForm'
import SnackbarUtils from '../Utils/SnackbarUtils'
import { datasetRoute } from '../../Common/Consts/Routes'
import { parseFromFile } from '../../Remote/Endpoints/FileParserEndpoint'
import { rm } from "../../Assets/readMeMessage"
import { useHistory } from 'react-router-dom'

const defaultFileFormat = 'application/json'

interface IProps {
  acceptedFileType?: string
}

export const FileUploadView = (props: IProps) => {
  const { acceptedFileType } = { ...props }
  const history = useHistory()

  useEffect(() => { document.title = "File Upload" })

  const handleSubmit = async (jsonFile: File) => {
    try {
      const extractedDataset = await parseFromFile(jsonFile)

      if (!extractedDataset) {
        SnackbarUtils.warning('Server failed to parse dataset')
        return
      }

      history.push({
        pathname: datasetRoute,
        state: extractedDataset
      })
    }
    catch (error) {
      SnackbarUtils.warning(JSON.parse(error))
    }
  }

  return (
    <Container>
      <FileUploadForm
        acceptFileFormat={acceptedFileType || defaultFileFormat}
        onSubmit={handleSubmit}
      />
      <Box p={4}>
        <Download file="emptyJsonDataset.json" content={JSON.stringify("../../Assets/emptyJSFile.json", null, 2)}>
          <Button type="submit" variant="contained"> Download Sample JSON file </Button>
        </Download>
        <Download file="readMe.txt" content={rm}>
          <a href="http://localhost:3000/#/uploadFile"> Download JSON file submission instructions </a>
        </Download>
      </Box>
    </Container>
  )
}
