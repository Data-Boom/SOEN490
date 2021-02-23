import { Box, Button, Container, Typography } from "@material-ui/core"
import React, { useContext, useEffect, useState } from 'react'

import { IApprovedDatasetModel } from "../../Models/Datasets/IApprovedDatasetModel"
import { UserReviewList } from "./UserReviewList"
import { getUserFlaggedDatasets } from "../../Remote/Endpoints/UserEndpoint"
import { UserContext } from "../../App"
import { Grid } from "@material-ui/core"
import { SessionTimeOut } from "../SessionTimeout"

interface IProps {
  userDatasets: IApprovedDatasetModel[],
}

export const UserReviewView = (props: IProps) => {
  const [datasets, setDatasets] = useState<IApprovedDatasetModel[]>([])

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
        <Grid>
          {SessionTimeOut()}
        </Grid>
        <UserReviewList
          userDatasets={datasets}
        />
      </Box>
    </Container>
  )
}




