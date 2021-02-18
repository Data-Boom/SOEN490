import { Box, Button, Grid, Modal, Paper } from '@material-ui/core'
import React, { useState } from 'react'

import CancelIcon from "@material-ui/icons/Cancel"
import { DatasetUploadForm } from './DatasetUploadForm'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import { callGetDatasets } from '../../Remote/Endpoints/DatasetEndpoint'
import { classStyles } from '../../appTheme'
import { fixPartialForform } from './DatasetUploadView'
import { useEffect } from 'react'

interface IProps {
  datasetId: string,
  datasetName: string
}
export const DatasetFormModal = (props: IProps) => {

  const datasetId = props.datasetId
  const [open, setOpen] = useState(false)
  const [dataset, setDataset] = useState<IDatasetModel>()

  useEffect(() => {
    const getDatasetInfo = async (id: number) => {
      const datasetArray = await callGetDatasets({ datasetId: [id] })
      const dataset = datasetArray[0]
      setDataset(fixPartialForform(dataset))
    }

    if (datasetId) {
      getDatasetInfo(parseInt(datasetId))
    }
  }, [])

  const close = () => {
    setOpen(false)
  }
  return (
    <>
      <Grid item>
        <Button size="small" id="view-dataset" onClick={() => setOpen(true)} color="primary" variant="contained">{props.datasetName}</Button>
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
            <DatasetUploadForm
              onSubmit={close}
              initialDataset={dataset}
              editable={false}
              buttonName="Close"
            />
          </Box>
        </Paper>

      </Modal>
    </>
  )
}