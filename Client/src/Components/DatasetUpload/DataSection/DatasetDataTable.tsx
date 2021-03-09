import 'react-data-grid/dist/react-data-grid.css'

import { Box, Button, Grid, Typography } from '@material-ui/core'
import DataGrid, { SelectColumn, TextEditor } from 'react-data-grid'
import { IContent, IData, IVariable, newVariable } from '../../../Models/Datasets/IDatasetModel'
import React, { useState } from 'react'

import { EditVariableHeader } from './EditVariableHeader'
import { callGetAllDimensions } from '../../../Remote/Endpoints/DimensionsEndpoint'
import { useEffect } from 'react'
import { getVariableNames } from '../../../Remote/Endpoints/VariableEndpoint'
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array'
import { IVariableNameModel } from '../../../Models/IVariableNameModel'

interface IProps {
  data: IData,
  onDataChange: (newData: IData) => void,
  editable: boolean,
}

export const DatasetDataTable = (props: IProps): any => {
  const { data, onDataChange, editable } = { ...props }

  const [editedVariableIndex, setEditedVariableIndex] = useState(-1)
  const [selectedRows, setSelectedRows] = useState(new Set<React.Key>())
  const [dimensions, setDimensions] = useState([])
  const [variables, setVariables] = useState([])

  useEffect(() => {
    const callListDimensions = async () => {
      const dimensions = await callGetAllDimensions()
      setDimensions(dimensions)
    }

    const callListVariables = async () => {
      const variables = await getVariableNames()
      setVariables(variables)
      console.log("variables ", variables)
      console.log("length " + variables.length)
    }
    callListVariables()
    callListDimensions()
  }, [])

  const handleHeaderClick = (indexOfClickedHeader: number): void => {
    setEditedVariableIndex(indexOfClickedHeader)
  }

  const closeEditVariableModal = (): any => {
    setEditedVariableIndex(-1)
  }

  const handleVariableUpdate = (variable: IVariable, index: number): void => {
    const copyData = { ...data }
    copyData.variables[index] = variable
    onDataChange(copyData)

    closeEditVariableModal()
  }

  const handleVariableRemove = (index: number): void => {
    const copyData = { ...data }
    copyData.variables.splice(index, 1)

    const copyContents: IContent[] = [...data.contents]
    removeColumnPoints(copyContents, index)
    copyData.contents = copyContents

    onDataChange(copyData)
    closeEditVariableModal()
  }

  const removeColumnPoints = (copyContents: IContent[], columnIndex: number): void => {
    for (let i = 0; i < copyContents.length; i++) {
      copyContents[i].point = copyContents[i].point.filter((point, index) => {
        return index !== columnIndex
      })
    }
  }

  const handleAddColumn = (): void => {
    const copyData = { ...data }
    copyData.variables.push(newVariable)
    onDataChange(copyData)

    setEditedVariableIndex(copyData.variables.length - 1)
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
          key: `${index}`, name: variable.name, editable: editable, editor: TextEditor, headerRenderer: (): any =>
            <EditVariableHeader
              variable={variable}
              index={index}
              editMode={editedVariableIndex === index}
              editable={editable}
              onHeaderClick={handleHeaderClick}
              onEditModalClose={closeEditVariableModal}
              onVariableUpdate={handleVariableUpdate}
              onVariableRemove={handleVariableRemove}
              dimensions={dimensions}
              variableOption={variables}
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
    // and then callback with updated data
    onDataChange(copyData)
  }

  const rowKeyGetter = (row: any): number => {
    return data.contents.findIndex(suchRow => suchRow.point == row)
  }

  const renderTopButtons = (): any => {
    return (
      <>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleAddRow} disabled={!editable}>Add row</Button>
        </Grid>

        <Grid item>
          <Button variant="contained" color="primary" onClick={handleAddColumn} disabled={!editable}>New variable</Button>
        </Grid>

        <Grid item>
          <Button variant="contained" color="secondary" onClick={handleRemoveSelectedRows} disabled={!editable}>Remove selected</Button>
        </Grid>
      </>
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

      <Box width='100%' mt={4}>
        <DataGrid
          rowKeyGetter={rowKeyGetter}
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