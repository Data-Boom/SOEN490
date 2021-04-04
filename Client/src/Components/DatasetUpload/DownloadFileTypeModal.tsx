import { Box, Button, Grid, Modal, Paper, Typography } from "@material-ui/core"
import { TXTdatasetDownloadButton } from './TXTdatasetDownloadButton'
import { JSONdatasetDownloadButton } from './JSONdatasetDownloadButton'
import React from 'react'
import { classStyles } from "../../appTheme"
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { CSVdatasetDownloadButton } from "./CSVdatasetDownloadButton"

interface IProps {
    dataset: IDatasetModel
    open: boolean,
    onClose: () => void,
    // onSubmitTxt: () => void
}
export const DownloadFileTypeModal = (props: IProps) => {
    const { open, dataset, onClose } = { ...props }
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                className={classStyles().modal}
            >
                <Paper elevation={3}>
                    <Box m={5}>
                        <Grid item container spacing={4} >
                            <Grid item >
                                <Typography>Choose your prefered file format to commence download </Typography>
                            </Grid>
                            <Grid item container spacing={4} >
                                <Grid item>
                                    <TXTdatasetDownloadButton datasets={dataset} />
                                </Grid>
                                <Grid item>
                                    <JSONdatasetDownloadButton datasets={dataset} />
                                </Grid>
                                <Grid item>
                                    <CSVdatasetDownloadButton datasets={dataset} />
                                </Grid>
                                <Grid item>
                                    <Button id="submitConfirmation" onClick={() => alert("download XLS")} variant='contained' color="primary" type="submit"> XLS</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Modal>
        </>
    )
}
