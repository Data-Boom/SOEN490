import { Box, Container, Typography } from "@material-ui/core"
import React, { useEffect, useState } from 'react'

import { IApprovedDatasetModel } from "../../Models/Datasets/IApprovedDatasetModel"
import { UserReviewList } from "./UserReviewList"
import { getUserFlaggedDatasets } from "../../Remote/Endpoints/UserEndpoint"

interface IProps {
  userDatasets: IApprovedDatasetModel[],
}

export const UserReviewView = (props: IProps) => {
  const [datasets, setDatasets] = useState<IApprovedDatasetModel[]>([])

  useEffect(() => { document.title = "Flagged Datasets" })

  useEffect(() => {
    const fetchUserDatasets = async () => {
      const userDatasets: IApprovedDatasetModel[] = await getUserFlaggedDatasets()
      setDatasets(userDatasets)
    }
    fetchUserDatasets()
  }, [])

  return (
    <Container>
      <Box py={4}>
        <Typography variant='h6' align="left">
          Datasets to be reviewed:
        </Typography>
        <UserReviewList
          userDatasets={datasets}
        />
      </Box>
    </Container>
  )
}




