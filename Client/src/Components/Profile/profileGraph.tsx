import React, { useState, useEffect } from 'react'
import { listSavedGraphStates } from '../../Remote/Endpoints/graphEndpoint'

export const ProfileGraph = () => {
    const [savedGraphState, setSavedGraphState] = useState([])

    useEffect(() => {

        const callListSavedGraphStates = async () => {
            const savedGraphState = await listSavedGraphStates()
            setSavedGraphState(savedGraphState)
        }
        callListSavedGraphStates()
    }, [])


}
