import { Box, Grid, ThemeProvider, Typography } from '@material-ui/core'
import { FastField, Field, FieldArray, useFormikContext } from 'formik'
import { ICategoryModel, ISubcategoryModel } from '../../../../Remote/Endpoints/CategoryEndpoint'
import { MuiSelectFormik, MuiTextFieldFormik } from '../../../Forms/FormikFields'
import { disabledTheme, shouldComponentUpdate } from '../../../Forms/ComponentUpdate'

import { IMaterial } from '../../../../Models/Datasets/IDatasetModel'
import { MaterialSelectChipArray } from './MaterialSelectChipArray'
import React from 'react'
import { classStyles } from '../../../../appTheme'
import { get } from 'lodash'

interface IProps {
  materials: IMaterial[],
  categories: ICategoryModel[],
  editable: boolean,
}

const getOptions = (options: any[]): any => {
  //todo revert value from id to option.name once backend is able to consume ids for categories
  if (options) {
    return (
      <>
        <option value={null}></option>
        {options.map(option => <option key={option.id} value={option.id}> {option.name} </option>)}
      </>
    )
  }
}

export const MetaForm = (props: IProps) => {
  const { materials, categories, editable } = props
  const { values, setFieldValue } = useFormikContext()

  const getSubCategories = (categoryId: number): ISubcategoryModel[] => {
    const foundCategory = categories.find(category => category.id == categoryId)
    if (!foundCategory) {
      return []
    }
    return foundCategory.subcategories
  }

  const handleCategoryChange = (value: any) => {
    const categoryId = value.target.value
    setFieldValue('meta.category', categoryId)
  }

  const handleSubcategoryChange = (value: any) => {
    const subcategoryId = value.target.value
    if (subcategoryId) {
      setFieldValue('meta.subcategory', subcategoryId)
    }
  }

  return (
    <Box className={classStyles().defaultBorder}>
      <ThemeProvider theme={disabledTheme}>
        <Typography variant='h6' align="left">Meta</Typography>
        <Grid container spacing={2}>
          <Grid item sm={3}>
            <FastField name="meta.dataset_name" label='Dataset Name' shouldUpdate={shouldComponentUpdate} disabled={!editable} component={MuiTextFieldFormik} />
          </Grid>
          <Grid item sm={3}>
            <FastField name="meta.data_type" label='Data Type' shouldUpdate={shouldComponentUpdate} disabled={!editable} component={MuiTextFieldFormik} />
          </Grid>
          <Grid item sm={3}>
            <Field name="meta.category" label='Category' shouldUpdate={shouldComponentUpdate} disabled={!editable} component={MuiSelectFormik} options={getOptions(categories)} onChange={(value) => handleCategoryChange(value)} />
          </Grid>
          <Grid item sm={3}>
            <Field name="meta.subcategory" label='Subcategory' shouldUpdate={shouldComponentUpdate} disabled={!editable || !(values as any).meta.category} component={MuiSelectFormik} options={getOptions(getSubCategories((values as any).meta.category))} onChange={(value) => handleSubcategoryChange(value)} />
          </Grid>
          <Grid item sm={12}>
            <FieldArray name='meta.material' >
              {({ form, ...fieldArrayHelpers }) => {
                return (<MaterialSelectChipArray
                  value={get(form.values, 'meta.material')}
                  fieldArrayHelpers={fieldArrayHelpers}
                  options={materials}
                  editable={editable}
                />)
              }}
            </FieldArray>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Box>
  )
}