import { AdminReviewRow } from "./AdminReviewRow"
import { Grid } from "@material-ui/core"
import { IDatasetRowModel } from "../../Models/Datasets/IDatasetRowModel"
import React from 'react'

interface IAdminListprops {
    datasets: IDatasetRowModel[]
}

export const AdminReviewList = (props: IAdminListprops) => {
    const { datasets } = { ...props }

    const renderAdminDatasetRows = () => {
        return datasets && datasets.map(datasets => {
            return (
                <AdminReviewRow
                    dataset={datasets}
                    key={datasets.id}
                />
            )
        })
    }

    return (
        <Grid container direction='column' spacing={1}>
            {renderAdminDatasetRows()}
        </Grid>
    )
}