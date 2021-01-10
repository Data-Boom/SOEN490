import * as Yup from 'yup'

import { Button, Container } from '@material-ui/core'
import { Form, Formik } from 'formik'

import { ISignInUser } from '../../Models/Profile/IProfileModel'
import React from 'react'
import SignIn from '../../Views/SignIn'


interface IProps {
    user: ISignInUser,
    onSubmit: (user: ISignInUser) => void
  }
export default function ProfileForm(props: IProps) {

    const { user, onSubmit } = props
  
    const validationSchema = Yup.object().shape({
      email: Yup.string().email('Please enter a valid email').required(),
      password: Yup.string().required()
    })
  
    return (
      <Container>
        <Formik
          initialValues={user}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <SignIn />
            <Button variant="contained" color="primary" type="submit">Update User</Button>
          </Form>
        </Formik>
      </Container>
    )
  }