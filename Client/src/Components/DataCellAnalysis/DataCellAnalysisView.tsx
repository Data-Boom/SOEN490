import { Box, Typography, useTheme } from '@material-ui/core'
import React, { useState } from 'react'

import { DatasetView } from '../DatasetUpload/DatasetView'
import { FileUploadForm } from '../FileUpload/FileUploadForm'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import Loader from "react-loader-spinner"
import { exampleExportDatasetModel } from '../../Models/Datasets/IDatasetModel'

interface IProps {

}

const fileFormat = 'image/png'

export const DataCellAnalysisView = (props: IProps) => {

  const [analyzedDataset, setAnalyzedDataset] = useState<IDatasetModel>(null)
  const [isProcessingDataCell, setIsProcessingDataCell] = useState(false)

  const handleSubmit = async (dataCell: File): Promise<void> => {
    analyzeDataCell(dataCell)
  }

  const analyzeDataCell = async (dataCell: File): Promise<void> => {
    setIsProcessingDataCell(true)
    const fetchedDataset = await fetchDataset()
    setIsProcessingDataCell(false)
    setAnalyzedDataset(fetchedDataset)
  }

  const fetchDataset = (): Promise<IDatasetModel> => {
    //todo make an actual API call providing a data cell 
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(exampleExportDatasetModel)
      }, 2000)
    })
  }
  const validatePNG = (file: File) => {
    return file && file.type === fileFormat
  }
  const theme = useTheme()

  const dataCellUploadSection = (): any => {
    return (
      <>
        <Box pt={5}>
          <Typography>Data Cell Analysis Upload Page</Typography>
          <FileUploadForm
            onSubmit={handleSubmit}
            isValidFile={validatePNG}
            acceptFileFormat={fileFormat}
          />
        </Box>
        <image >test </image>
      </>
    )
  }

  return (
    <>
      {!analyzedDataset ?
        dataCellUploadSection() :
        <DatasetView initialDataset={analyzedDataset} />
      }
      <Loader
        type='Bars'
        color={theme.palette.secondary.main}
        height={100}
        width={100}
        visible={isProcessingDataCell}
      />
    </>
  )
}