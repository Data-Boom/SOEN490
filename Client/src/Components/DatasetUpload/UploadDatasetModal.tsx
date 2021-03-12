import { Box, Button, Grid, Modal, Paper, Typography } from "@material-ui/core"
import React from 'react'
import { classStyles } from "../../appTheme"

interface IProps {
    open: boolean,
    onClose: () => void,
    onSubmitCT: () => void,
    onSubmitJS: () => void
}
export const UploadDatasetModal = (props: IProps) => {
    const { open, onClose, onSubmitCT, onSubmitJS } = { ...props }
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
                                <Button id="submitConfirmation" onClick={onSubmitCT} variant='contained' color="primary" type="submit">Upload CSV/TXT</Button>
                            </Grid>
                            <Grid item >
                                <Typography>Upload dataset points data represented in CSV/TXT format. For an example, click here.</Typography>
                            </Grid>
                        </Grid>
                        <Box mt={2}>
                            <Grid item container spacing={4} >
                                <Grid item>
                                    <Button id="submitConfirmation" onClick={onSubmitJS} variant='contained' color="primary" type="submit">Upload JSON</Button>
                                </Grid>
                                <Grid item>
                                    <Typography>Upload a dataset represented in JSON format, for the example of the dataset structure download any existing dataset.</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Paper>
            </Modal>
        </>
    )
}
