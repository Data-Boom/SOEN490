import { Box, Button, Grid, Typography } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'

import AddNewAdminForm from './AddNewAdminForm'
import { IUserAccountModel } from '../../../Models/Authentication/IUserAccountModel'
import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import { Redirect } from 'react-router-dom'
import { classStyles } from '../../../appTheme'
import { loginRoute } from '../../../Common/Consts/Routes'
import { updateUserDetails } from '../../../Remote/Endpoints/UserEndpoint'

interface IProps {
    user: IUserAccountModel
}

interface IFooterProps {
    handleReset: () => void,
    handleSubmit: () => void
}

export default function AddingAdminsTab() {

    const [readOnly, setReadOnly] = useState(true)
    const handleAddNewAdmin = (newAdmin: string) => {
        //updateUserDetails({ ...user, password: newPassword })
    }

    const Footer = (props: IFooterProps) => {
        const handleSubmit = () => {
            setReadOnly(true)
            props.handleSubmit()
        }

        const handleReset = () => {
            setReadOnly(true)
            props.handleReset()
        }

        return (
            <>
            </>
        )
    }
}