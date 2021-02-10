import { Box, Grid } from "@material-ui/core"
import { INewAdminModel, IUserAccountModel } from '../../../Models/Authentication/IUserAccountModel'
import React, { useEffect, useState } from 'react'

import { AdminReviewRow } from './AdminRows'
import { fetchAllAdmins } from "../../../Remote/Endpoints/PermissionsEndpoint"

interface IAdminListProps {
    adminlist: IUserAccountModel[],
}

export const ProfileAdminStateList = (props: IAdminListProps) => {
    const { adminlist } = { ...props }

    const [adminListState, setAdminListState] = useState([])
    const renderAdminListRows = () => {
        return adminlist && adminlist.map(adminSet => {
            return (
                < AdminReviewRow
                    adminEmail={adminSet}
                />
            )
        })
    }
    return (
        <Grid>
            {renderAdminListRows()}
        </Grid>
    )

}
