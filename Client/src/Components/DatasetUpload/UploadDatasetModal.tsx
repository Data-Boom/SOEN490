import { Box, Button, Grid, Modal, Paper } from "@material-ui/core"
import React from 'react'
import { classStyles } from "../../appTheme"

interface IProps {
    csvTxtButton: string,
    jsonButton: string,
    open: boolean,
    onClose: () => void,
    onSubmitCT: () => void,
    onSubmitJS: () => void
}
export const UploadDatasetModal = (props: IProps) => {
    const { csvTxtButton, jsonButton, open, onClose, onSubmitCT, onSubmitJS } = { ...props }
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                className={classStyles().modalsearch}
            >
                <Paper elevation={3}>
                    <Box m={8}>
                        <Grid container justify="flex-start" spacing={10} >
                            <Grid>
                                <Button id="submitConfirmation" onClick={onSubmitCT} variant='contained' color="primary" type="submit">{csvTxtButton}</Button>
                            </Grid>
                            <Grid>
                                <Button id="submitConfirmation" onClick={onSubmitJS} variant='contained' color="primary" type="submit">{jsonButton}</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Modal>
        </>
    )
}
