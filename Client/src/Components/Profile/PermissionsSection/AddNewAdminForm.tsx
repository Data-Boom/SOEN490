import * as Yup from 'yup'

import { Box, Button, Grid, Typography } from '@material-ui/core'
import { FastField, Form, Formik } from 'formik'

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

    const handleSubmit = (formValues: IResetPasswordModel) => {
        onSubmit(formValues.password)
    }

    return (
        <Formik
            initialValues={defaultResetPasswordModel}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <Box className={classStyles().defaultBorder}>
                    <Typography variant='h6' align="left">Change Password</Typography>
                    <Grid container spacing={4}>
                        <Grid item sm={6}>
                            <FastField name="password" label='New password' type="password" component={MuiTextFieldFormik} />
                        </Grid>
                        <Grid item sm={6}>
                            <FastField name="passwordConfirmation" label='Confirm password' type="password" component={MuiTextFieldFormik} />
                        </Grid>
                    </Grid>
                </Box>
                <Button id="ConfirmPasswordButton" variant="contained" color="primary" type="submit">Confirm Password</Button>
            </Form>
        </Formik>
    )
}