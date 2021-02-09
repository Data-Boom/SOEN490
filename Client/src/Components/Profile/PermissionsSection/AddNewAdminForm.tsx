import * as Yup from 'yup'

import { Box, Button, Grid, Typography } from '@material-ui/core'
import { FastField, Form, Formik } from 'formik'
import { INewAdminModel, defaultNewAdminModel } from '../../../Models/Authentication/ISignUpModel'
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

    const handleSubmit = (formValues: INewAdminModel) => {
        onSubmit(formValues.email)
    }

    return (
        <Formik
            initialValues={defaultNewAdminModel}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <Box className={classStyles().defaultBorder}>
                    <Typography variant='h6' align="left">Add new admin by providing admin's email:</Typography>
                    <Grid container spacing={4}>
                        <Grid item sm={6}>
                            <FastField name="email" label='Admin email' type="email" component={MuiTextFieldFormik} />
                        </Grid>
                        <Grid item sm={3}>
                            <Button id="AddNewAdmin" variant="contained" color="secondary" type="submit">+ Add new admin </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Form>
        </Formik>

    )
}