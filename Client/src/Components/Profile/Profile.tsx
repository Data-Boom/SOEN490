import * as Yup from 'yup'

import { Button, Container } from '@material-ui/core'
import { Form, Formik } from 'formik'

import { ProfileSection } from './ProfileSection/ProfileSection'
import React from 'react'

export interface IUser {
  name: string,
  email: string,
  dateOfBirth: string,
  organization: string,
  password: string
}

export interface IPasswordSettings {
  password: string,
  passwordConfirmation: string
}
interface IProps {
  user: IUser,
  onSubmit: (user: IUser) => void
}

export default function Profile(props: IProps) {

  const { user, onSubmit } = props

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email('Please enter a valid email').required(),
    dateOfBirth: Yup.string().required(),
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
          <ProfileSection />
          <Button variant="contained" color="primary" type="submit">Update User</Button>
        </Form>
      </Formik>
    </Container>
  )
}