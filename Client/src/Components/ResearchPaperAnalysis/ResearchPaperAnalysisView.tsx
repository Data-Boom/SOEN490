import { Box, Typography, useTheme } from '@material-ui/core'
import React, { useState } from 'react'

import { DatasetUploadView } from '../DatasetUpload/DatasetUploadView'
import { FileUploadForm } from '../DataCell/FileUploadForm'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import Loader from "react-loader-spinner"
import { exampleExportDatasetModel } from '../../Models/Datasets/IDatasetModel'

interface IProps {

}

const fileFormat = '*'

export const ResearchPaperAnalysisView = (props: IProps) => {

  const [analyzedDataset, setAnalyzedDataset] = useState<IDatasetModel>(null)
  const [isProcessingPaper, setIsProcessingPaper] = useState(false)

  const handleSubmit = async (researchPaper: File): Promise<void> => {
    analyzePaper(researchPaper)
  }

  const analyzePaper = async (researchPaper: File): Promise<void> => {
    setIsProcessingPaper(true)
    const fetchedDataset = await fetchDataset()
    setIsProcessingPaper(false)
    setAnalyzedDataset(fetchedDataset)
  }

  const fetchDataset = (): Promise<IDatasetModel> => {
    //todo make an actual API call providing a research paper and then resolve with an actual parsed dataset
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(exampleExportDatasetModel)
      }, 2000)
    })
  }

  const theme = useTheme()

  const paperUploadSection = (): any => {
    return (
      <>
        <Box pt={5}>
          <Typography>Page description pretty much</Typography>
          <FileUploadForm
            onSubmit={handleSubmit}
            acceptFileFormat={fileFormat}
          />
        </Box>
      </>
    )
  }

  return (
    <>
      {!analyzedDataset ?
        paperUploadSection() :
        <DatasetUploadView initialDataset={analyzedDataset} />
      }
      <Loader
        type='Bars'
        color={theme.palette.primary.main}
        height={100}
        width={100}
        visible={isProcessingPaper}
      />
    </>
  )
}