import { Grid } from "@material-ui/core"
import React from 'react'

import { AdminReviewRow } from './AdminRows'
import { IUserAccountModel } from '../../../Models/Authentication/IUserAccountModel'

interface IProps {
  adminList: IUserAccountModel[],
  handleRemoveAdmin: (accountEmail: string) => void
}


export const AdminList = (props: IProps) => {
  const { adminList, handleRemoveAdmin } = { ...props }
  return (
    <Grid>
      {adminList && adminList.map(adminSet => {
        return (
          < AdminReviewRow
            adminEmail={adminSet.email}
            handleRemoveAdmin={handleRemoveAdmin}
          />
        )
      })}
    </Grid>
  )

}
