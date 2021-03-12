import { useEffect, useState } from "react"

import { callGetAllDimensions } from "../../../Remote/Endpoints/DimensionsEndpoint"

export const useDimensions = () => {
  const [dimensions, setDimensions] = useState([])

  useEffect(() => {
    const callListDimensions = async () => {
      const dimensions = await callGetAllDimensions()
      setDimensions(dimensions)
    }

    callListDimensions()
  }, [])

  return { dimensions }
}