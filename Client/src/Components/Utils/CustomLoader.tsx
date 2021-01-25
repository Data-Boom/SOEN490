import Loader from "react-loader-spinner"
import React from 'react'
import { useTheme } from "@material-ui/core"

interface IProps {
  visible: boolean
}

export const CustomLoader = (props: IProps) => {

  const { visible } = { ...props }
  const theme = useTheme()
  return (
    <Loader
      type='Bars'
      height={100}
      width={100}
      color={theme.palette.primary.main}
      visible={visible}
    />
  )
}