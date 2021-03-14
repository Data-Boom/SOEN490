import 'react-data-grid/dist/react-data-grid.css'

import { Box, Button, Grid, Typography } from '@material-ui/core'
import DataGrid, { SelectColumn, TextEditor } from 'react-data-grid'
import { IContent, IData, IVariable, newVariable } from '../../../Models/Datasets/IDatasetModel'
import React, { useState } from 'react'

import { EditVaraibleModal } from './EditVariableModal'
import { VariableHeader } from './VariableHeader'
import { decorateDataErrors } from '../../../Common/Helpers/DatasetErrorDecorator'
import { useDimensions } from '../../Utils/Hooks/useDimensions'
import { useFormikContext } from 'formik'
import { useVariableNames } from '../../Utils/Hooks/useVariableNames'

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
  const { dimensions } = useDimensions()
  const { variableNames } = useVariableNames()
  const { errors } = useFormikContext()

  const handleHeaderClick = (indexOfClickedHeader: number): void => {
    editable && setEditedVariable({ variable: { ...data.variables[indexOfClickedHeader] }, index: indexOfClickedHeader, isNew: false })
  }

  const handleVariableUpdate = (variable: IVariable): void => {
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
    // changedRows is the rows after user input, we need to update the data contents
    copyData.contents.map((row, index) => row.point = Object.values(changedRows[index]))
    onDataChange(copyData)
  }

  const rowKeyGetter = (row: any): number => {
    return data.contents.findIndex(suchRow => suchRow.point == row)
  }

  const renderTopButtons = (): any => {
    return (
      <>
        <Grid container spacing={2}>
          {!!data.variables.length &&
            <>
              <Grid item>
                <Button variant="outlined" color="secondary" onClick={handleRemoveSelectedRows} disabled={!editable}>Remove selected rows</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary" onClick={handleAddRow} disabled={!editable}>Add row</Button>
              </Grid>
            </>
          }
          <Grid item>
            <Button variant="contained" color="primary" onClick={() => setEditedVariable({ index: -1, isNew: true, variable: newVariable })} disabled={!editable}>New variable</Button>
          </Grid>
        </Grid>
      </>
    )
  }

  const displayErrors = () => {
    const dataErrors = (errors as any)?.data as IData
    return decorateDataErrors(dataErrors) || null
  }

  return (
    <>
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant='h6' align="left">Data</Typography>
        </Grid>
        <Grid item>
          {renderTopButtons()}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Typography color="secondary">
            {displayErrors()}
          </Typography>
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
        variableNames={variableNames}
      />}
      <Box width='100%' mt={4}>
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