import * as Yup from 'yup'

import { Box, Button, Grid } from "@material-ui/core"
import { Field, Form, Formik } from "formik"
import React, { useState } from 'react'
import { callCreateGraphState, callUpdateGraphState } from '../../../Remote/Endpoints/GraphStateEndpoint'

import { IGraphStateModel } from "../../../Models/Graph/IGraphStateModel"
import { MuiTextFieldFormik } from "../../Forms/FormikFields"
import SnackbarUtils from '../../Utils/SnackbarUtils'
import { classStyles } from '../../../appTheme'

interface IProps {
  graphState: IGraphStateModel
}

interface IFormikProps {
  name: string
}

export const SaveGraphStateControl = (props: IProps) => {
  const { graphState } = { ...props }
  const [id, setId] = useState(graphState.id)
  const [isNewGraphState, setIsNewGraphState] = useState(!graphState.id)

  const saveGraphState = async (form: IFormikProps) => {
    const graphStateCopy = { ...graphState }
    graphStateCopy.name = form.name
    graphStateCopy.id = id
    if (isNewGraphState) {
      setIsNewGraphState(false)
      const createdId: string = await callCreateGraphState(graphStateCopy)
      setId(createdId)
      SnackbarUtils.success('Graph successfully created')
    }
    else {
      await callUpdateGraphState(graphStateCopy)
      SnackbarUtils.success('Graph successfully updated')
    }
  }

  return (
    <Formik
      initialValues={{ name: graphState.name }}
      validationSchema={Yup.object().shape({ name: Yup.string().required() })}
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