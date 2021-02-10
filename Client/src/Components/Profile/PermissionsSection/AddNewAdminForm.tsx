import * as Yup from 'yup'

import { Box, Button, Grid, Typography } from '@material-ui/core'
import { FastField, Form, Formik } from 'formik'
import { IUserAccountModel, defaultUserAccountModel } from '../../../Models/Authentication/IUserAccountModel'
import { fetchAllAdmins, updatePermissions } from '../../../Remote/Endpoints/PermissionsEndpoint'

import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import React from 'react'
import { classStyles } from '../../../appTheme'

interface IProps {

    onSubmit: (newEmail: string) => void
}
export default function AddNewAdminForm(props: IProps) {

    const { onSubmit } = props
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email().required("Email Address")
    })

    const handleSubmit = (formValues: IUserAccountModel) => {
        onSubmit(formValues.email)
    }


    return (
        <Formik
            initialValues={defaultUserAccountModel}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <Box className={classStyles().defaultBorder}>
                    <Typography variant='h6' align="left">Add a new admin by providing admin's email:</Typography>
                    <Grid container spacing={4}>
                        <Grid item sm={6}>
                            <FastField name="email" label='New Admin Email' type="email" component={MuiTextFieldFormik} />
                        </Grid>
                        <Grid item sm={3}>
                            <Button id="AddNewAdmin" variant="contained" color="primary" type="submit">+ Add new admin </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Form>
        </Formik>

    )
}