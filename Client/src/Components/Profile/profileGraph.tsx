import { useEffect, useState } from 'react'

import { listGraphStates } from '../../Remote/Endpoints/GraphStateEndpoint'

export const ProfileGraph = () => {
  const [savedGraphState, setSavedGraphState] = useState([])

  useEffect(() => {

    const callListSavedGraphStates = async () => {
      const savedGraphState = await listGraphStates()
      setSavedGraphState(savedGraphState)
    }
    callListSavedGraphStates()
  }, [])


}
