import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel'
import React from 'react'
import { UserReviewRow } from './UserReviewRow'

interface IProps {
  userDatasets: IApprovedDatasetModel[],
}

export const UserReviewList = (props: IProps) => {
  const { userDatasets } = { ...props }

  return (
    <>
      {userDatasets && userDatasets.map((dataset, index) => {
        return (
          <UserReviewRow
            key={index}
            dataset={dataset}
          />
        )
      })}
    </>
  )
}
