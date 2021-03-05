import { Box, Typography, useTheme } from '@material-ui/core'
import React, { useState } from 'react'

import { DatasetView } from '../DatasetUpload/DatasetView'
import { FileUploadForm } from '../FileUpload/FileUploadForm'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import Loader from "react-loader-spinner"
import { exampleExportDatasetModel } from '../../Models/Datasets/IDatasetModel'

interface IProps {

}

const fileFormat = 'image/ppm'

export const CellSizeAnalysisView = (props: IProps) => {

  const [analyzedDataset, setAnalyzedDataset] = useState<IDatasetModel>(null)
  const [isProcessingCellSize, setIsProcessingCellSize] = useState(false)

  const handleSubmit = async (cell: File): Promise<void> => {
    console.log("handle submit")
    analyzeCellSize(cell)
  }

  const analyzeCellSize = async (cell: File): Promise<void> => {
    console.log("analyze cell size")
    setIsProcessingCellSize(true)
    const fetchedDataset = await fetchDataset()
    setIsProcessingCellSize(false)
    setAnalyzedDataset(fetchedDataset)
  }

  const fetchDataset = (): Promise<IDatasetModel> => {
    console.log("Fetch dataset")
    //todo make an actual API call providing a cell
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(exampleExportDatasetModel)
      }, 2000)
    })
  }
  const validatePPM = (file: File) => {
    console.log(file.type)
    return file && file.type === fileFormat
  }
  const theme = useTheme()

  const cellUploadSection = (): any => {
    return (
      <>
        <Box pt={5}>
          <Typography>Cell Size Analysis</Typography>
          <FileUploadForm
            onSubmit={handleSubmit}
            isValidFile={validatePPM}
            acceptFileFormat={fileFormat}
          />
        </Box>
      </>
    )
  }

  return (
    <>
      {!analyzedDataset ?
        cellUploadSection() :
        <DatasetView initialDataset={analyzedDataset} />
      }
      <Loader
        type='Bars'
        color={theme.palette.secondary.main}
        height={100}
        width={100}
        visible={isProcessingCellSize}
      />
    </>
  )
}