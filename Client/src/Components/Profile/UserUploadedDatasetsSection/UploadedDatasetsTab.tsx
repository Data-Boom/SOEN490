import { Box, Container, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import { ColDef, DataGrid, SelectionChangeParams, ValueGetterParams } from '@material-ui/data-grid';
import { IData, IDatasetModel, IDatasetStatus, IReference } from '../../../Models/Datasets/IDatasetModel';
import React, { useEffect, useState } from 'react'
import { callGetDatasets, getUploadedDatasets } from '../../../Remote/Endpoints/DatasetEndpoint';

import { DatasetFormModal } from '../../DatasetUpload/DatasetViewModal';
import { ICategoryModel } from '../../../Models/Profile/ICategoryModel';
import { SearchResults } from '../../Search/SearchResults';
import { listCategories } from '../../../Remote/Endpoints/CategoryEndpoint';

interface IProps {
    datasetResults?: IDatasetModel[],
    handleSelectionChanged?: (selection: SelectionChangeParams) => void,
    button?: any,
    categories: ICategoryModel[],
    displayCheckbox?: boolean
}

export const UploadedDatasetsTab = () => {

    const [categories, setCategories] = useState<ICategoryModel[]>([])
    const [datasetStatus, setDatasetStatus] = useState<IDatasetStatus[]>([])
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

            setDatasetStatus(uploaded_datasets)
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

    return (
        <Container>
            <Box pt={4}>
                <SearchResults
                    datasetResults={datasets}
                    categories={categories}
                    displayCheckbox={false}
                    datasetStatus={datasetStatus}
                />
            </Box>
        </Container>
    )

}