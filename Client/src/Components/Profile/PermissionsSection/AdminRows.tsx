import { Box, Button, Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import { INewAdminModel, IUserAccountModel } from '../../../Models/Authentication/IUserAccountModel'
import React, { useState } from 'react'

import { ConfirmationModal } from '../../Authentication/ConfirmationModal'
import { classStyles } from '../../../appTheme'
import { updatePermissions } from '../../../Remote/Endpoints/PermissionsEndpoint'

interface IAdminRowModel {
    adminEmail: IUserAccountModel,
}

export const AdminReviewRow = (props: IAdminRowModel) => {
    const { adminEmail } = { ...props }
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)
    const handleRemoveAdmin = async (removeAdmin: string) => {
        await updatePermissions({
            email: removeAdmin,
            operation: "remove"
        })
        setConfirmModalOpen(false)
    }

    return (
        <Grid item xs={12}>
            <TableContainer component={Paper} style={{ width: "100%" }}>
                <Table aria-label="collapsabile table">
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            {adminEmail.email}
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="outlined" color="secondary" onClick={() => setConfirmModalOpen(true)}>
                                X
                </Button>
                            <ConfirmationModal
                                title="Are you sure you want to remove this Admin?"
                                description="By clicking the Remove button the user will no longer have admin rights"
                                acceptButton="Remove"
                                cancelButton="Cancel"
                                open={confirmModalOpen}
                                onClose={() => setConfirmModalOpen(false)}
                                onSubmit={() => handleRemoveAdmin(adminEmail.email)}
                            />
                        </Grid>
                    </Grid>
                </Table>
            </TableContainer>
        </Grid>
    )
}