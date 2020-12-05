import { DatasetRow } from "./DatasetRow"
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import React from 'react'

interface IProps {
  datasets: IDatasetModel[]
}

export const DatasetsList = (props: IProps) => {
  const renderDatasetRows = () => {
    props && props.datasets && props.datasets.map(dataset => <DatasetRow dataset={dataset} key={dataset.id} />)
  }

  return (
    renderDatasetRows()
  )
}