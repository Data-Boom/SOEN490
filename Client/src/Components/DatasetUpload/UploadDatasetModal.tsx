import { Box, Button, Grid, Modal, Paper, Typography } from "@material-ui/core"
import React from 'react'
import { classStyles } from "../../appTheme"

interface IProps {
    csvTxtButton: string,
    ctDescription: string,
    jsDescription: string,
    jsonButton: string,
    open: boolean,
    onClose: () => void,
    onSubmitCT: () => void,
    onSubmitJS: () => void
}
export const UploadDatasetModal = (props: IProps) => {
    const { csvTxtButton, jsonButton, open, ctDescription, jsDescription, onClose, onSubmitCT, onSubmitJS } = { ...props }
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
                            <Grid item>
                                <Button id="submitConfirmation" onClick={onSubmitCT} variant='contained' color="primary" type="submit">{csvTxtButton}</Button>
                            </Grid>
                            <Grid item >
                                <Typography>{ctDescription}</Typography>
                            </Grid>
                        </Grid>
                        <Box mt={2}>
                            <Grid item container spacing={4} >
                                <Grid item>
                                    <Button id="submitConfirmation" onClick={onSubmitJS} variant='contained' color="primary" type="submit">{jsonButton}</Button>
                                </Grid>
                                <Grid item>
                                    <Typography>{jsDescription}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Paper>
            </Modal>
        </>
    )
}
