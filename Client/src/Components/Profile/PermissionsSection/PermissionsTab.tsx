import * as Yup from 'yup'

import { AdminRow, IAdminRowProps } from './AdminRows'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { FastField, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { fetchAllAdmins, updatePermissions } from '../../../Remote/Endpoints/PermissionsEndpoint'

import { IUserAccountModel } from '../../../Models/Authentication/IUserAccountModel'
import { List } from '../../Utils/List'
import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import { classStyles } from '../../../appTheme'
import { useState } from 'react'

export default function PermissionsTab() {

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email().required("Email Address")
  })

  const [adminListState, setAdminListState] = useState<IUserAccountModel[]>([])

  const handleAddAdmin = async (newAdmin: any) => {
    await updatePermissions({
      email: newAdmin.email,
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
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleAddAdmin}
      >
        <Form>
          <Box className={classStyles().defaultBorder} style={{ width: "100%" }} >
            <Typography variant='h6' align="left">Add a new admin by providing admin's email:</Typography>
            <Grid container spacing={4}>
              <Grid item sm={6}>
                <FastField name="email" label='New Admin Email' type="email" component={MuiTextFieldFormik} />
              </Grid>
              <Grid sm={1} />
              <Grid item sm={3}>
                <Button id="AddNewAdmin" variant="contained" color="primary" type="submit">+ Add new admin </Button>
              </Grid>
            </Grid>
          </Box>
        </Form>
      </Formik>
      <List
        RowComponent={AdminRow}
        models={adminListState}
        rowProps={{ handleRemoveAdmin: handleRemoveAdmin } as IAdminRowProps}
        withPagination
        modelType='Accounts'
      />
    </Grid >
  )
}