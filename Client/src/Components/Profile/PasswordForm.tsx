import * as Yup from 'yup'

import { Button, Container } from '@material-ui/core'
import { Form, Formik } from 'formik'

import { EditPassword } from './PasswordSection/EditPassword'
import { IPasswordSettings } from '../../Models/Profile/IProfileModel'
import React from 'react'

interface IProps {
  password: IPasswordSettings,
  onSubmit: (password: IPasswordSettings) => void
}

export default function ProfileForm(props: IProps) {

  const { password, onSubmit } = props

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required').min(8, 'Password should have a minimum of 8 characters'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  return (
    <Container>
      <Formik
        initialValues={password}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <EditPassword />
          <Button variant="contained" color="primary" type="submit">Confirm Password</Button>
        </Form>
      </Formik>
    </Container>
  )
}