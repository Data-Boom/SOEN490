import { Box, Grid, Modal, Paper } from '@material-ui/core'
import React from 'react'
import { classStyles } from '../../appTheme'
import { FileUploadView } from '../FileUpload/FileUploadView'

interface IProps {
    open: boolean,
    onClose: () => void,
    // onSubmit: () => void
}

export const JsonUploadModal = (props: IProps) => {
    const { open, onClose } = { ...props }
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                className={classStyles().modal}
            >
                <Paper>
                    <Box minWidth="1000px">
                        <FileUploadView />
                    </Box>
                </Paper>
            </Modal>
        </>
    )
}
