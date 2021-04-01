import { Box, Button, Grid, Modal, Paper, Typography } from "@material-ui/core"

import React from 'react'
import { classStyles } from "../../appTheme"

interface IProps {
    open: boolean,
    onClose: () => void,
    onSubmitTxt: () => void
}
export const DownloadFileTypeModal = (props: IProps) => {
    const { open, onClose, onSubmitTxt } = { ...props }
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
                                    <Button id="submitConfirmation" onClick={onSubmitTxt} variant='contained' color="primary" type="submit"> TXT</Button>
                                </Grid>
                                <Grid item>
                                    <Button id="submitConfirmation" onClick={() => alert("download JSON")} variant='contained' color="primary" type="submit"> JSON</Button>
                                </Grid>
                                <Grid item>
                                    <Button id="submitConfirmation" onClick={() => alert("download CSV")} variant='contained' color="primary" type="submit"> CSV</Button>
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
