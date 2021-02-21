import { Grid, Paper, Table, TableContainer, TableRow, Typography } from "@material-ui/core"
import React, { useEffect, useState } from 'react'

import { IApprovedDatasetModel } from "../../Models/Datasets/IApprovedDatasetModel"
import { UserReviewList } from "./UserReviewList"
import { getUserFlaggedDatasets } from "../../Remote/Endpoints/UserEndpoint"

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
    <TableContainer component={Paper} style={{ width: "100%" }} >
      <Table aria-label="collapsible table" >
        <Typography variant='h5'>
          Datasets to be reviewed
                </Typography>
        <TableRow>
          <Grid container justify="center" spacing={3}>
            < UserReviewList
              userDatasets={datasets}
            />
          </Grid>
        </TableRow>
      </Table>
    </TableContainer>
  )
}




