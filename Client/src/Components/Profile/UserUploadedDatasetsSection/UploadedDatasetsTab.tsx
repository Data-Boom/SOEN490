import React, { useEffect, useState } from 'react'
import { ColDef, DataGrid, SelectionChangeParams, ValueGetterParams } from '@material-ui/data-grid';
import { Box, Container, Grid } from '@material-ui/core';
import { IDatasetModel } from '../../../Models/Datasets/IDatasetModel';
import { ICategoryModel } from '../../../Models/Profile/ICategoryModel';
import { callGetDatasets, getUploadedDatasets } from '../../../Remote/Endpoints/DatasetEndpoint';
import { listCategories } from '../../../Remote/Endpoints/CategoryEndpoint';
import { SearchResults } from '../../Search/SearchResults';

interface IProps {
    datasetResults?: IDatasetModel[],
    handleSelectionChanged?: (selection: SelectionChangeParams) => void,
    button?: any,
    categories: ICategoryModel[],
    displayCheckbox?: boolean
}

export const UploadedDatasetsTab = () => {

    const [categories, setCategories] = useState<ICategoryModel[]>([])
    //const [datasetIds, setDatasetIds] = useState<number[]>([])
    const [datasetIds, setDatasetIds] = useState<any[]>([])
    const [datasets, setDatasets] = useState<IDatasetModel[]>([])

    const getDatasetInfo = async (ids: number[]) => {
        const datasetArray = await callGetDatasets({ datasetId: ids })
        setDatasets(datasetArray)
    }

    useEffect(() => {

        const getDatasetIds = async () => {
            const uploaded_datasets = await getUploadedDatasets()
            const id_array = uploaded_datasets.map(x => x.datasetId)
            setDatasetIds(id_array)

            //const status_array = uploaded_datasets.map(x => x.approved)
            //console.log("status: ", status_array)
        }

        const getDatasetStatus = async () => {
            const uploaded_datasets = await getUploadedDatasets()
            const status_array = uploaded_datasets.map(x => x.approved)
            console.log("status: ", status_array)
            return status_array
        }

        const callListCategories = async () => {
            const getCategories = await listCategories()
            setCategories(getCategories || [])
        }

        getDatasetIds()
        callListCategories()
    }, [])

    useEffect(() => {
        if (datasetIds.length > 0) {
            getDatasetInfo(datasetIds)
        }

    }, [datasetIds])


    const getStatus = () => {

        return null
    }

    const column: ColDef[] = [
        { field: `status`, headerName: 'Status', valueGetter: getStatus, flex: 1 },
    ]

    return (
        <Container>
            <Box pt={4}>
                <SearchResults
                    datasetResults={datasets}
                    categories={categories}
                    displayCheckbox={false}
                />
            </Box>
        </Container>
    )

}