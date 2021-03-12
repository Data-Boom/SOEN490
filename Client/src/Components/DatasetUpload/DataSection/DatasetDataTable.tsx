import 'react-data-grid/dist/react-data-grid.css'

import { Box, Button, Grid, Typography } from '@material-ui/core'
import DataGrid, { SelectColumn, TextEditor } from 'react-data-grid'
import { IContent, IData, IVariable, newVariable } from '../../../Models/Datasets/IDatasetModel'
import React, { useState } from 'react'

import { EditVaraibleModal } from './EditVariableModal'
import { IVariableNameModel } from '../../../Models/Variables/IVariableNameModel'
import { VariableHeader } from './VariableHeader'
import { callGetAllDimensions } from '../../../Remote/Endpoints/DimensionsEndpoint'
import { getVariableNames } from '../../../Remote/Endpoints/VariableEndpoint'
import { useEffect } from 'react'
import { useFormikContext } from 'formik'

interface IProps {
  data: IData,
  onDataChange: (newData: IData) => void,
  editable: boolean,
}

interface IEditedVariableModel {
  variable: IVariable
  index: number
  isNew: boolean
}

const noEditedVariable: IEditedVariableModel = { variable: null, index: -1, isNew: false }

export const DatasetDataTable = (props: IProps): any => {
  const { data, onDataChange, editable } = { ...props }

  const [editedVariable, setEditedVariable] = useState<IEditedVariableModel>(noEditedVariable)
  const [selectedRows, setSelectedRows] = useState(new Set<React.Key>())
  const [dimensions, setDimensions] = useState([])
  const [variables, setVariables] = useState<IVariableNameModel[]>([])

  const { errors } = useFormikContext()

  useEffect(() => {
    const callListDimensions = async () => {
      const dimensions = await callGetAllDimensions()
      setDimensions(dimensions)
    }

    const callListVariables = async () => {
      const variableList = await getVariableNames()
      setVariables(variableList)
    }
    callListVariables()
    callListDimensions()
  }, [])

  const handleHeaderClick = (indexOfClickedHeader: number): void => {
    editable && setEditedVariable({ variable: { ...data.variables[indexOfClickedHeader] }, index: indexOfClickedHeader, isNew: false })
  }

  const handleVariableUpdate = (variable: IVariable): void => {
    console.log('got here')
    const copyData = { ...data }
    let index = editedVariable.index

    if (index == -1) {
      index = copyData.variables.length
    }

    copyData.variables[index] = variable
    onDataChange(copyData)

    setEditedVariable(noEditedVariable)
  }

  const handleVariableRemove = (): void => {
    const copyData = { ...data }
    copyData.variables.splice(editedVariable.index, 1)

    const copyContents: IContent[] = [...data.contents]
    removeColumnPoints(copyContents, editedVariable.index)
    copyData.contents = copyContents

    onDataChange(copyData)
    setEditedVariable(noEditedVariable)
  }

  const removeColumnPoints = (copyContents: IContent[], columnIndex: number): void => {
    for (let i = 0; i < copyContents.length; i++) {
      copyContents[i].point = copyContents[i].point.filter((point, index) => {
        return index !== columnIndex
      })
    }
  }

  const handleRemoveSelectedRows = (): void => {
    const copyData = { ...data }
    copyData.contents = copyData.contents.filter((row, index) => !selectedRows.has(index))
    onDataChange(copyData)

    resetSelection()
  }

  const handleAddRow = (): void => {
    const copyData = { ...props.data }
    copyData.contents.push({ point: new Array(props.data.variables.length).fill(0) })
    props.onDataChange(copyData)
  }

  const resetSelection = (): void => {
    setSelectedRows(() => new Set<React.Key>())
  }

  const getColumns = (): any[] => {
    const columns = data.variables.map((variable, index) => {
      return (
        {
          key: `${index}`, name: `${variable.name}`, editable: editable, editor: TextEditor, resizable: true, headerRenderer: (): any =>
            <VariableHeader
              variable={variable}
              index={index}
              onHeaderClick={handleHeaderClick}
              dimensions={dimensions}
            />
        }
      )
    })

    return [SelectColumn, ...columns]
  }

  const getRows = (): number[][] => {
    return data.contents.map(content => content.point)
  }

  const handleRowChange = (changedRows: number[][]): void => {
    const copyData = { ...data }
    // changedRows is the rows after user input, we need to update copyData's contents via a map with an index:
    copyData.contents.map((row, index) => row.point = Object.values(changedRows[index]))
    onDataChange(copyData)
  }

  const rowKeyGetter = (row: any): number => {
    return data.contents.findIndex(suchRow => suchRow.point == row)
  }

  const renderTopButtons = (): any => {
    return (
      <>
        {!!data.variables.length &&
          <>
            <Grid item>
              <Button variant="outlined" color="primary" onClick={handleAddRow} disabled={!editable}>Add row</Button>
            </Grid>

            <Grid item>
              <Button variant="outlined" color="secondary" onClick={handleRemoveSelectedRows} disabled={!editable}>Remove selected rows</Button>
            </Grid>
          </>
        }

        <Grid item>
          <Button variant="contained" color="primary" onClick={() => setEditedVariable({ index: -1, isNew: true, variable: newVariable })} disabled={!editable}>New variable</Button>
        </Grid>
      </>
    )
  }

  const displayError = () => {
    const castedErrors = errors as any
    return (
      <Typography>{castedErrors && JSON.stringify(castedErrors.data)}</ Typography>
    )
  }

  return (
    <>
      <Grid container>
        <Grid item container sm={6}>
          <Grid item>
            <Typography variant='h6' align="left">Data</Typography>
          </Grid>
        </Grid>
        <Grid item container sm={6} spacing={2} justify='flex-end'>
          {renderTopButtons()}
        </Grid>
      </Grid>
      {!!editedVariable.variable && <EditVaraibleModal
        dimensions={dimensions}
        initialValues={editedVariable.variable}
        onCancel={() => setEditedVariable(noEditedVariable)}
        isOpen={!!editedVariable.variable}
        editable={editable}
        onDelete={handleVariableRemove}
        onVariableUpdate={handleVariableUpdate}
        isNewVariable={editedVariable.isNew}
        variables={variables}
      />}
      <Box width='100%' mt={4}>
        {displayError()}
        <DataGrid
          rowKeyGetter={rowKeyGetter}
          headerRowHeight={72}
          columns={getColumns()}
          rows={getRows()}
          onRowsChange={handleRowChange}
          selectedRows={selectedRows}
          onSelectedRowsChange={editable && setSelectedRows}
        />
      </Box>
    </>
  )
}