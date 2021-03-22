import { Box, Grid, Typography } from '@material-ui/core'

import { IAdmindReviewRowModel } from '../../Models/Datasets/IDatasetRowModel'
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import { IRowProps } from "../Utils/List"
import React from 'react'
import { classStyles } from '../../appTheme'

export interface IAdminReviewRowProps {
  onChange: (formDataset: IDatasetModel) => void
}

export const AdminReviewRow = (props: IAdminReviewRowProps | IRowProps<IApprovedDatasetModel>) => {
  const { row: dataset, onChange } = { ...props }

  const setDataset = () => {
    onChange(dataset)
  }

  return (
    <Grid item xs={12}>
      <Box className={classStyles().fitBorder}>
        <Grid container alignItems='center' justify='space-between'>
          <Grid item container justify='flex-start' xs={10}>
            <Typography variant="body2" noWrap>
              <div>
                <input type="radio" value={dataset.dataset_name} onClick={setDataset} name="dataset" />{dataset.dataset_name}
              </div>
            </Typography>
          </Grid>

        </Grid>
      </Box>
    </Grid>
  )
}