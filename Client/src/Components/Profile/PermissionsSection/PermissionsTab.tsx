import * as Yup from 'yup'

import { Box, Button, Grid, Typography } from '@material-ui/core'
import { FastField, Form, Formik } from 'formik'
import { fetchAllAdmins, updatePermissions } from '../../../Remote/Endpoints/PermissionsEndpoint'
import { AdminList } from './AdminList'

import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import React, { useEffect } from 'react'
import { classStyles } from '../../../appTheme'
import { useState } from 'react'

export default function PermissionsTab() {

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email().required("Email Address")
  })

  const [adminListState, setAdminListState] = useState([])

  const handleAddAdmin = async (newAdmin: string) => {
    await updatePermissions({
      email: newAdmin,
      operation: "add"
    })
    const adminListState = await fetchAllAdmins()
    setAdminListState(adminListState)
  }

  const handleRemoveAdmin = async (newAdmin: string) => {
    await updatePermissions({
      email: newAdmin,
      operation: "remove"
    })
    const adminListState = await fetchAllAdmins()
    setAdminListState(adminListState)
  }

  useEffect(() => {
    const callListAdminStates = async () => {
      const adminListState = await fetchAllAdmins()
      setAdminListState(adminListState)
    }
    callListAdminStates()
  }, [])


  return (
    <Grid>
      <Formik
        initialValues={{ email: 'dffgd' }}
        validationSchema={validationSchema}
        onSubmit={handleAddAdmin}
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
      <AdminList
        adminList={adminListState}
        handleRemoveAdmin={handleRemoveAdmin}
      />
    </Grid >
  )
}