import React, { useEffect, useState } from 'react'
import { ColDef, DataGrid, SelectionChangeParams, ValueGetterParams } from '@material-ui/data-grid';
import { Grid } from '@material-ui/core';
import { IDatasetModel } from '../../../Models/Datasets/IDatasetModel';
import { ICategoryModel } from '../../../Models/Profile/ICategoryModel';
import { callGetDatasets, getUploadedDatasets } from '../../../Remote/Endpoints/DatasetEndpoint';
import { listCategories } from '../../../Remote/Endpoints/CategoryEndpoint';

interface IProps {
    datasetResults: IDatasetModel[],
    handleSelectionChanged?: (selection: SelectionChangeParams) => void,
    button?: any,
    categories: ICategoryModel[],
    displayCheckbox: boolean
}

export const UploadedDatasetsTab = () => {

    const [categories, setCategories] = useState<ICategoryModel[]>([])
    //const [datasetIds, setDatasetIds] = useState<number[]>([])
    const [datasetIds, setDatasetIds] = useState<any[]>([])
    const [datasets, setDatasets] = useState<IDatasetModel[]>([])

    const getDatasetInfo = async (ids: number[]) => {
        const datasetArray = await callGetDatasets({ datasetId: ids })
        setDatasets(datasetArray)
        console.log("getDatasetInfo: ", datasetArray)
    }

    const checkdataset = () => {

    }

    useEffect(() => {

        const getDatasetIds = async () => {
            const ids = await getUploadedDatasets()
            setDatasetIds(ids)
            console.log("ids: ", ids)
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
            //console.log("getDatasetInfo: ", getDatasetInfo(datasetIds))
        }
    }, [datasetIds])


    /*const getStatus = () => {

        return null
    }
    const columns: ColDef[] = [
        { field: 'dataset_name', headerName: 'Name', flex: 1 },
        { field: `status`, headerName: 'Status', valueGetter: getStatus, flex: 1 },
    ]*/




    return (

        <Grid container spacing={3}>
            <Grid item container>
                <div style={{ height: 600, width: '100%' }}>
                    {/*<DataGrid rows={rows} rowHeight={120} rowsPerPageOptions={[5, 10, 20, 30, 50]} columns={columns} pageSize={5} />*/}
                </div>
            </Grid>
        </Grid>
    )

}