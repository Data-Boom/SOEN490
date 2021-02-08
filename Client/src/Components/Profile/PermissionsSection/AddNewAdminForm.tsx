import * as Yup from 'yup'

import { Box, Button, Grid, Typography } from '@material-ui/core'
import { FastField, Form, Formik } from 'formik'

import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import React from 'react'
import { classStyles } from '../../../appTheme'
import { defaultNewAdminModel } from '../../../Models/Authentication/ISignUpModel'

interface NewAdminProps {
    onSubmit: (newEmail: string) => void
    onReset: () => void
}
export default function AddNewAdminForm(props: NewAdminProps) {

    const { onSubmit } = props
    const { onReset } = props
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email().required("Email Address")
    })

    const handleSubmit = () => {

    }

    return (
        <Formik
            initialValues={defaultNewAdminModel}
            onSubmit={handleSubmit}
        >
            <Form>
                <Box className={classStyles().defaultBorder}>
                    <Typography variant='h6' align="left">Change Password</Typography>
                    <Grid container spacing={4}>
                        <Grid item sm={6}>
                            <FastField name="email" label='Admin email' type="email" component={MuiTextFieldFormik} />
                        </Grid>
                        <Grid item sm={3}>
                            <Button id="AddNewAdmin" variant="contained" color="secondary" type="submit">Add new admin </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Form>
        </Formik>

    )
}