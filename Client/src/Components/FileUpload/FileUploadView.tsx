import { Box, Button } from '@material-ui/core'
import { Link, Redirect, Route, useHistory } from 'react-router-dom'

import { DatasetUploadForm } from '../DatasetUpload/DatasetUploadForm'
import { DatasetUploadView } from '../DatasetUpload/DatasetUploadView'
import Download from '@axetroy/react-download'
import { FileUploadForm } from './FileUploadForm'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React from 'react'
import { datasetUploadRoute } from '../../Common/Consts/Routes'
import SnackbarUtils from '../Utils/SnackbarUtils'
import { extractDatasetFromFile } from '../../Remote/Endpoints/FileUploadEndpoint'
import { rm } from "../../Assets/readMeMessage"
import { toLocalDatasets } from "../../Models/Datasets/IRemoteDatasetModel"

const fileFormat = 'application/json'


export const FileUploadView = () => {
  const history = useHistory()

  const isValidFile = (file: File) => {
    return file && file.type === fileFormat
  }

  const handleSubmit = async (jsonFile: File) => {
    try {
      // const response = await fetch('/api/v1/dataExtract', {
      //   method: 'POST',
      //   body: formData
      // })
      // const extractedDataset = await response.json()
      // console.log(extractedDataset, 'extracted dataset')
      const extractedDataset = await extractDatasetFromFile(jsonFile)

      history.push({//will route the data to the dataset upload view page
        pathname: datasetUploadRoute,
        state: extractedDataset
      })
    }
    catch (error) {
      SnackbarUtils.warning(error)
    }
  }

  return (
    <>
      <FileUploadForm
        acceptFileFormat={fileFormat}
        onSubmit={handleSubmit}
        isValidFile={isValidFile}
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
