import React, { useEffect, useState } from 'react'
import { getUnapprovedDatasets } from "../../Remote/Endpoints/DatasetEndpoints"

import { AdminReviewRow } from "./AdminReviewRow"
import { Grid } from "@material-ui/core"
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel'
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { getDatasets } from "../../Remote/Endpoints/DatasetEndpoint"

interface IAdminListprops {
    datasets: IApprovedDatasetModel[]
    onChange(formDataset: IApprovedDatasetModel): void
}

export const AdminReviewList = (props: IAdminListprops) => {

    const [datasets, setDatasets] = useState(props.datasets)

    useEffect(() => {
        const callListDatasetStates = async () => {
            const datasetState = await getUnapprovedDatasets()
            setDatasets(datasetState)
        }
        callListDatasetStates()
    }, [])


    const renderAdminDatasetRows = () => {
        return datasets && datasets.map(datasets => {
            return (
                <AdminReviewRow
                    dataset={datasets}
                    key={datasets.id}
                    onChange={props.onChange}
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