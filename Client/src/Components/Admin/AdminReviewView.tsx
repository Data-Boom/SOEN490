import { Box, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import { AdminReviewList } from './AdminReviewList'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import { listGraphStates } from '../../Remote/Endpoints/GraphStateEndpoint'
import { toDatasetRows } from '../Graph/GraphFunctions'

export function AdminReviewView() {
    const [datasetState, setDatasetState] = useState([])
    //const completeDataset: IDatasetModel[]
    useEffect(() => {
        const callListDatasetStates = async () => {
            const datasetState = await listGraphStates()
            setDatasetState(datasetState)
        }
        callListDatasetStates()
    }, [])

    const handleDeleteDataset = (datasetId: number) => {

    }
    const handleReviewDataset = (datasetId: number) => {

    }
    const handleFlagDataset = (datasetId: number) => {

    }
    return (

        <Grid container justify="center" spacing={3}>
            <Grid>
                <AdminReviewList
                    datasets={datasetState}
                    onReviewDatasetClick={handleReviewDataset}
                    onDeleteDatasetClick={handleDeleteDataset}
                    onFlagDatasetClick={handleFlagDataset}
                />
            </Grid>
        </Grid>

    )
}