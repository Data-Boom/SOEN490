import { Button } from '@material-ui/core'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React from 'react'

interface IProps {
  dataset: IDatasetModel,
  handleApproveDataset(datasetId: number): void,
  handleDeleteDataset: () => void,
  handleEditDataset(): void
}

export const ModalFooter = (props: IProps) => {
  const { handleApproveDataset, handleDeleteDataset, handleEditDataset } = { ...props }

  return (
    <>
      <Button id="edit-dataset" onClick={handleEditDataset} color="primary" variant="contained">Edit Dataset</Button>
      <Button id="approve-dataset" onClick={() => handleApproveDataset(props.dataset.id)} color="primary" variant="contained">Approve Dataset</Button>
      <Button id="delete-dataset" onClick={handleDeleteDataset} color="secondary" variant="contained">Delete Dataset</Button>
    </>
  )
}