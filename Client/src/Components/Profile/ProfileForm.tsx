import * as Yup from 'yup'

import { Button, Container } from '@material-ui/core'
import { Form, Formik } from 'formik'

import { IUser } from '../../Models/Profile/IProfileModel'
import React from 'react'
import { UserForm } from './UserDetailSection/UserForm'

interface IProps {
  user: IUser,
  onSubmit: (user: IUser) => void
}

export default function ProfileForm(props: IProps) {

  const { user, onSubmit } = props

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email').required(),
    organization: Yup.string().required()
  })

  return (
    <Container>
      <Formik
        initialValues={user}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <UserForm />
          <Button id="update-user" variant="contained" color="primary" type="submit">Update User</Button>
        </Form>
      </Formik>
    </Container>
  )
}