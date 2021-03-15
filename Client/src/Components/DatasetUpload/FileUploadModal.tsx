import { Box, Modal, Paper } from '@material-ui/core'

import { FileUploadView } from '../FileUpload/FileUploadView'
import React from 'react'
import { classStyles } from '../../appTheme'

interface IProps {
  open: boolean,
  onClose: () => void,
  acceptedFileType: string
}

export const FileUploadModal = (props: IProps) => {
  const { open, onClose, acceptedFileType } = { ...props }
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        className={classStyles().modal}
      >
        <Paper>
          <Box minWidth="1000px">
            <FileUploadView acceptedFileType={acceptedFileType} />
          </Box>
        </Paper>
      </Modal>
    </>
  )
}
