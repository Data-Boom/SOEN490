import React, { useEffect, useState } from 'react'
import { ColDef, DataGrid, SelectionChangeParams, ValueGetterParams } from '@material-ui/data-grid';
import { Box, Container, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import { IData, IDatasetModel, IDatasetStatus, IReference } from '../../../Models/Datasets/IDatasetModel';
import { ICategoryModel } from '../../../Models/Profile/ICategoryModel';
import { callGetDatasets, getUploadedDatasets } from '../../../Remote/Endpoints/DatasetEndpoint';
import { listCategories } from '../../../Remote/Endpoints/CategoryEndpoint';
import { SearchResults } from '../../Search/SearchResults';
import { DatasetFormModal } from '../../DatasetUpload/DatasetViewModal';

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

            const status_array = uploaded_datasets.map(x => x.approved)
            setDatasetStatus(uploaded_datasets)
            console.log("datasetStatus: ", status_array)
        }

        const getDatasetStatus = async () => {
            const uploaded_datasets = await getUploadedDatasets()
            const status_array = uploaded_datasets.map(x => x.approved)
            //setDatasetStatus(status_array)
            //console.log("status: ", status_array)
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


    const getTitle = (params: ValueGetterParams) => {
        const reference = params.getValue('reference') as IReference
        return `${reference.title}`
    }


    const getCategoryId = (params: ValueGetterParams) => {
        const categoryId = params.row.category
        const foundCategory = categories.find(category => category.id == categoryId)
        return `${foundCategory.name}`
    }


    const getDatasetStatus = async () => {
        const uploaded_datasets = await getUploadedDatasets()
        const status_array = uploaded_datasets.map(x => x.approved)
        //setDatasetStatus(status_array)
        return status_array

    }


    const getStatus = (params: ValueGetterParams) => {

        //const status = params.row.status
        //const dataset_id = params.row.status
        //console.log("datasets ", datasets)
        //console.log("datasetStatus ", datasetStatus)

        for (var i = 0; i < datasetStatus.length; i++) {

            console.log(datasetStatus[i].approved)
            return `${datasetStatus[i].approved}`
        }






        //return `True`
        //return `${foundDataset}`

    }

    const getSubcategoryId = (params: ValueGetterParams) => {
        const subcategoryId = params.row.subcategory
        const categoryId = params.row.category
        const foundCategory = categories.find(category => category.id == categoryId)
        const foundSubcategory = foundCategory.subcategories.find(subcategory => subcategory.id == subcategoryId)
        return `${foundSubcategory.name}`
    }

    const getAuthor = (params: ValueGetterParams) => {
        const reference = params.getValue('reference') as IReference
        if (!reference.authors[0]) {
            return 'N/A'
        }
        return `${reference.authors[0].firstName} ${reference.authors[0].lastName}`
    }

    const getYear = (params: ValueGetterParams) => {
        const reference = params.getValue('reference') as IReference
        return `${reference.year}`
    }

    const getVariableList = (params: ValueGetterParams) => {
        const data = params.getValue('data') as IData

        return (
            <List dense disablePadding style={{ maxHeight: '100%', overflow: 'auto', width: '100%' }}>
                {data.variables.map(variable =>
                    <ListItem key={variable.name} dense disableGutters style={{ paddingTop: '0', paddingBottom: '0' }}>
                        <ListItemText primary={variable.name} style={{ paddingTop: '0', paddingBottom: '0', marginTop: '0', marginBottom: '0' }} />
                    </ListItem>
                )}
            </List>
        )
    }
    const linkToDataset = (params: ValueGetterParams) => {
        const datasetId = params.getValue('id')

        return (<DatasetFormModal datasetId={datasetId.toString()} />)
    }


    const columns: ColDef[] = [
        { field: 'dataset_name', headerName: 'Name', flex: 1 },
        { field: `title`, headerName: 'Title', valueGetter: getTitle, flex: 1 },
        { field: 'category', headerName: 'Category', flex: 1, valueGetter: getCategoryId },
        { field: 'subcategory', headerName: 'SubCategory', flex: 1, valueGetter: getSubcategoryId },
        { field: 'author', headerName: 'Author', flex: 1, valueGetter: getAuthor },
        { field: 'year', headerName: 'Year', flex: 1, valueGetter: getYear },
        { field: 'variables', headerName: 'List Of Variables', flex: 2, renderCell: getVariableList },
        { field: 'dataset_button', headerName: 'View', flex: 1, renderCell: linkToDataset },
        { field: 'status', headerName: 'Status', flex: 1, valueGetter: getStatus },
    ]

    return (
        <Container>
            <Box pt={4}>
                <SearchResults
                    datasetResults={datasets}
                    categories={categories}
                    displayCheckbox={false}
                    columns={columns}
                />
            </Box>
        </Container>
    )

}