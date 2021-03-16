import { Box, Grid, IconButton, Modal, Paper } from '@material-ui/core'
import React, { useRef, useState } from 'react'

import CancelIcon from "@material-ui/icons/Cancel"
import { DatasetForm } from './DatasetForm'
import { FormikProps } from 'formik'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import PageviewIcon from '@material-ui/icons/Pageview';
import { callGetDatasets } from '../../Remote/Endpoints/DatasetEndpoint'
import { classStyles } from '../../appTheme'
import { useEffect } from 'react'

interface IProps {
  datasetId: string
}
export const DatasetFormModal = (props: IProps) => {
  const formikReference = useRef<FormikProps<unknown>>()
  const { datasetId } = { ...props }
  const [open, setOpen] = useState(false)
  const [dataset, setDataset] = useState<IDatasetModel>()

  useEffect(() => {
    const getDatasetInfo = async (id: number) => {
      const datasetArray = await callGetDatasets({ datasetId: [id] })
      const dataset = datasetArray[0]
      setDataset(dataset)
    }

    if (datasetId) {
      getDatasetInfo(parseInt(datasetId))
    }
  }, [])

  return (
    <>
      <Grid item>
        <IconButton>
          <PageviewIcon id="view-dataset" onClick={() => setOpen(true)} />
        </IconButton>
      </Grid>
      <Modal open={open}
        onClose={() => setOpen(false)}
        className={classStyles().modalsearch}
      >
        <Paper elevation={3}>
          <Box m={5}>
            <Grid container justify="flex-end">
              <Grid item>
                <CancelIcon color="primary" onClick={() => setOpen(false)} />
              </Grid>
            </Grid>
            <DatasetForm
              onSubmit={null}
              initialDataset={dataset}
              editable={false}
              formikReference={formikReference}
            />
          </Box>
        </Paper>

      </Modal>
    </>
  )
}