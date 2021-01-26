import { AdminReviewRow } from "./AdminReviewRow"
import { Grid } from "@material-ui/core"
import { IDatasetRowModel } from "../../Models/Datasets/IDatasetRowModel"
import React from 'react'

interface IAdminListprops {
    datasets: IDatasetRowModel[],
    onDeleteDatasetClick: (datasetId: number) => void,
    onReviewDatasetClick: (datasetId: number) => void,
    onFlagDatasetClick: (datasetId: number) => void
}

export const AdminReviewList = (props: IAdminListprops) => {
    const { datasets, onDeleteDatasetClick, onReviewDatasetClick, onFlagDatasetClick } = { ...props }

    const renderAdminDatasetRows = () => {
        return datasets && datasets.map(datasets => {
            return (
                <AdminReviewRow
                    dataset={datasets}
                    key={datasets.id}
                    onDeleteDatasetClick={onDeleteDatasetClick}
                    onReviewDatasetClick={onReviewDatasetClick}
                    onFlagDatasetClick={onFlagDatasetClick}
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