//todo maybe extract to reusable and test this bad boi
//todo move views into their corresponding feature folders

import { Chip } from '@material-ui/core'
import React from 'react'

interface IProps {
  value: string[],
  name: string,
  label: string,
  onChange: (selectedValues: string[]) => void
}

export const SelectChipArray = (props: IProps) => {
  return (
    <>
      {props.value.map(value => <Chip label={value} key={value} variant="outlined" />)}
    </>
  )
}