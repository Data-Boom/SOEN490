import { Box, Button, Grid } from "@material-ui/core"
import { Field, Form, Formik } from "formik"

import { MuiTextFieldFormik } from "../../Forms/FormikFields"
import React from 'react'
import { classStyles } from '../../../appTheme'

interface IProps {
  onSaveClick: (name: string) => void
}

interface IFormikProps {
  name: string
}

export const SaveGraphStateControl = (props: IProps) => {
  const { onSaveClick } = { ...props }

  const saveGraphState = (form: IFormikProps) => {
    onSaveClick(form.name)
  }

  return (
    <Formik
      initialValues={{ name: 'New Graph' }}
      onSubmit={saveGraphState}
    >
      <Form>
        <Box className={classStyles().defaultBorder}>
          <Grid container spacing={4} alignItems="center">
            <Grid item sm={4}>
              <Field name="name" label='Graph Name' component={MuiTextFieldFormik} />
            </Grid>
            <Grid item sm={4}>
              <Button type="submit" variant="contained" color="primary">Save Graph</Button>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Formik >
  )
}