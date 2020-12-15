import 'react-data-grid/dist/react-data-grid.css'

import { IContent, IData, IVariable, defaultVariable } from '../../../Models/Datasets/IDatasetModel'
import React, { useState } from 'react'

import { Button } from '@material-ui/core'
import { EditVariableHeader } from './EditVariableHeader'
import ReactDataGrid from 'react-data-grid'

interface IProps {
  data: IData,
  onDataChange: (newData: IData) => void
}

export const DatasetDataTable = (props: IProps) => {
  const [editedVariableIndex, setEditedVariableIndex] = useState(-1)
  const [selectedIndeces, setSelectedIndeces] = useState([1])

  const handleClick = (indexOfClickedHeader: number) => {
    setEditedVariableIndex(indexOfClickedHeader)
  }

  const handleClose = () => {
    setEditedVariableIndex(-1)
  }

  const handleVariableUpdate = (variable: IVariable, index: number) => {
    //todo if this works, remove the SJON.stringify
    const copyData = { ...props.data }
    copyData.variables[index] = variable
    props.onDataChange(copyData)
    handleClose()
  }

  const handleVariableRemove = (index: number) => {
    const copyData = { ...props.data }
    copyData.variables.splice(index, 1)

    let copyContents: IContent[] = [...props.data.contents]
    removeColumnPoints(copyContents, index)
    copyData.contents = copyContents

    props.onDataChange(copyData)
    handleClose()
  }

  const removeColumnPoints = (copyContents: IContent[], columnIndex: number) => {
    for (let i = 0; i < copyContents.length; i++) {
      copyContents[i].point = copyContents[i].point.filter((point, index) => {
        return index !== columnIndex
      })
    }
  }

  const handleAddColumn = () => {
    const copyData = { ...props.data }
    copyData.variables.push(defaultVariable)
    props.onDataChange(copyData)
  }

  const handleRemoveSelectedRows = () => {
    const copyData = { ...props.data }
    copyData.contents.filter((row, index) => selectedIndeces.find((element) => element === index) !== -1)
    props.onDataChange(copyData)
  }

  const handleAddRow = () => {
    const copyData = { ...props.data }
    copyData.contents.push({ comments: '', point: new Array(props.data.variables.length).fill(0) })
    props.onDataChange(copyData)
  }

  const getColumns = () => {
    return props.data.variables.map((variable, index) => {
      return (
        {
          key: `${index}`, name: variable.name, editable: true, headerRenderer: <EditVariableHeader
            variable={variable}
            index={index}
            editMode={editedVariableIndex === index}
            onClick={handleClick}
            onEditModalClose={handleClose}
            onVariableUpdate={handleVariableUpdate}
            onVariableRemove={handleVariableRemove}
          />
        }
      )
    })
  }

  const getRow = (index: number) => {
    //todo
    const test = props.data.contents[index] && props.data.contents[index].point
    return test
  }

  const getRowCount = () => {
    return (props && props.data.contents && props.data.contents[0] && props.data.contents.length)
  }

  // source: https://adazzle.github.io/react-data-grid/docs/examples/default-editor
  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const copyData = { ...props.data }
    for (let i = fromRow; i <= toRow; i++) {
      copyData.contents[i].point = { ...copyData.contents[i].point, ...updated }
    }
    props.onDataChange(copyData)
  }

  const onRowsSelected = rows => {
    const copySelectedRows = [...selectedIndeces]

    copySelectedRows.concat(
      rows.map(r => r.rowIdx)
    )

    setSelectedIndeces(copySelectedRows)
  }

  const onRowsDeselected = rows => {
    const copySelectedRows = [...selectedIndeces]

    let rowIndexes = rows.map(r => r.rowIdx)
    copySelectedRows.filter(
      i => rowIndexes.indexOf(i) === -1
    )

    setSelectedIndeces(copySelectedRows)
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleAddRow}>Add row</Button>
      <Button variant="contained" color="primary" onClick={handleAddColumn}>Add column</Button>
      <Button variant="contained" color="secondary" onClick={handleRemoveSelectedRows}>Remove selected</Button>
      <ReactDataGrid
        columns={getColumns()}
        rowGetter={i => getRow(i)}
        rowsCount={getRowCount()}
        onGridRowsUpdated={onGridRowsUpdated}
        enableCellSelect={true}
        rowSelection={{
          showCheckbox: true,
        }}
      />
    </>
  )
}