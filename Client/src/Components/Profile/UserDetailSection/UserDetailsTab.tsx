import { Box, Button, Grid, Typography } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'

import { IUserAccountModel } from '../../../Models/Authentication/IUserAccountModel'
import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import PasswordChangeForm from './PasswordSection/PasswordChangeForm'
import { Redirect } from 'react-router-dom'
import { classStyles } from '../../../appTheme'
import { routes } from '../../../Common/Consts/Routes'
import { updateUserDetails } from '../../../Remote/Endpoints/UserEndpoint'

interface IProps {
  user: IUserAccountModel
}

interface IFooterProps {
  handleReset: () => void,
  handleSubmit: () => void
}

export default function UserDetailsTab(props: IProps) {

  const { user } = props
  const [readOnly, setReadOnly] = useState(true)

  const Footer = (props: IFooterProps) => {
    const handleSubmit = () => {
      setReadOnly(true)
      props.handleSubmit()
    }

    const handleReset = () => {
      setReadOnly(true)
      props.handleReset()
    }

    return (
      <Grid container spacing={4}>
        {readOnly ?
          (
            <Grid item>
              <Button id="EditProfile" variant="contained" color="primary" onClick={() => setReadOnly(false)}>Edit Profile</Button>
            </Grid>
          ) : (
            <>
              <Grid item>
                <Button id="CancelEdit" variant="contained" color="primary" onClick={handleReset}>Cancel</Button>
              </Grid>
              <Grid item>
                <Button id="SaveEdit" variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
              </Grid>
            </>
          )}
      </Grid>
    )
  }

  const handlePasswordChange = (newPassword: string) => {
    updateUserDetails({ ...user, password: newPassword })
  }

  return (
    <>
      { user && user.firstName ?
        (<>
          <Box className={classStyles().defaultBorder}>
            <Typography variant='h6' align="left">{`Profile of ${user.firstName} ${user.lastName}`}</Typography>
            <Formik
              initialValues={user}
              enableReinitialize={true}
              onSubmit={async (user: IUserAccountModel) => {
                await updateUserDetails({ ...user })
                window.location.reload()
              }}
            >
              {formProps =>
                <Form>
                  <Grid container spacing={4} direction='column'>
                    <Grid item>
                      <Typography variant="body1" align="left">{`Email: ${user.email}`}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" align="left">{`OrcID: ${user.orcID}`}</Typography>
                    </Grid>
                    <Grid item>
                      {readOnly ?
                        (<Typography variant="body1" align="left">{`Organization: ${user.organizationName}`}</Typography>)
                        :
                        (<Field name="organizationName" label='Organization' InputProps={{ readOnly: readOnly }} variant="filled" component={MuiTextFieldFormik} />)}
                    </Grid>
                  </Grid>
                  <Footer handleReset={formProps.resetForm} handleSubmit={formProps.submitForm} />
                </Form>
              }
            </Formik>
          </Box>
          <PasswordChangeForm
            onSubmit={handlePasswordChange}
          />
        </>
        ) : (<Redirect to={routes.loginRoute.route} />)
      }
    </>
  )
}