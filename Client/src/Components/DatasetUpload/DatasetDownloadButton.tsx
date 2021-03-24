import { Button } from '@material-ui/core'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React from 'react'

interface IProps {
    datasets: IDatasetModel
}
export const DatasetDownloadButton = (props: IProps) => {
    const { datasets } = { ...props }

    const handleJsonDownload = () => {
        download("dataset.txt", JSON.stringify(datasets, null, 4))
    }
    //stolen from https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
    function download(filename: string, text: string) {
        const element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
        element.setAttribute('download', filename)

        element.style.display = 'none'
        document.body.appendChild(element)

        element.click()

        document.body.removeChild(element)
    }
    return (
        <Button id="download-txt" onClick={handleJsonDownload} color="primary" variant="contained"> Download </Button>
    )

}
