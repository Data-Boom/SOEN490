import { Box, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';

import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel';
import { UserReviewRow } from './UserReviewRow';
import { classStyles } from '../../appTheme';

interface IProps {
  userDatasets: IApprovedDatasetModel[],
}

export const UserReviewList = (props: IProps) => {

  const { userDatasets } = { ...props }
  return (
    <Grid container justify="center" spacing={3}>
      <Grid item xs={3}>
        <Box style={{ padding: '3px 10px', margin: '5px 0' }}>
          {userDatasets && userDatasets.map(dataset => {
            return (
              <UserReviewRow
                dataset={dataset}
              />
            )
          })}
        </Box>
      </Grid>
    </Grid>
  )
}
