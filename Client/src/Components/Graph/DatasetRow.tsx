import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import React from 'react'

interface IProps {
  dataset: IDatasetModel
}

export const DatasetRow = (props: IProps) => {
  return (
    <>
      {props && props.dataset && props.dataset.id}
    </>
  )
}
