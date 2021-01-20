import React, { useState } from 'react'

import { Alert } from '@material-ui/lab'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core'
import { Snackbar } from '@material-ui/core'
import Download from '@axetroy/react-download'
import emptyJSFile from "../../Assets/emptyJSFile.json"

/**
 * This component handles receiving the json locally then sending the file for processing
 * to the correct API.
 */
export default function DataCell() {
    const [open, setOpen] = useState(false)
    const [alertSuccess, setAlertSuccess] = useState(false)

    /**
    * Upon submission, the JSON file is extracted from the event and must be appended to formData
    * to be sent with API request.
    */
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const json = e.target.jsonFile.files[0]

        //so if this here is not proper json extension it will catch
        const ext = getExtension(json.name)
        if (ext != '.json') {
            console.error('file extension is not supported')
            setOpen(true)
            return
        }
        
        setAlertSuccess(true)
        

        const formData = new FormData()
        formData.append('file', json)

        const options = {
            method: 'POST',
            body: formData,
        }

        try {
            await fetch('http://localhost:4000/dataupload', options)
                .then(resp => resp.json())
                .then(result => {
                    console.log(result)
                })
        }
        catch (err) {
            console.log('wrong file submitted, only json file accepted')
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }
    //Function to get the extension of a file
    function getExtension(filename) {
        const i = filename.lastIndexOf('.')
        return (i < 0) ? '' : filename.substr(i)
    }
    //to do: refactor into proper txt file
    const readme= "To properly upload a JSON file based on the provided empty sample, \nthe user must fill up the following fields: \n"
    const fields="-reference \n-type \n-publisher \n-author \n-title \n-year \n-dataset/materials \n-variables/points \n"
    const info= "In order to enter the point array values, there should be a minimum of one value per variable: ie. \n[density, temp, pressure, init velocity, shock velocity, particle, velocity, compression, etc.]"
    
    //Snackbar is used to show an error on the screen when a wrong file type is selected for uploading
    return (
        <>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Failed to parse file
                </Alert>
            </Snackbar>

           <Snackbar open={alertSuccess} autoHideDuration={3000} onClose={() => setAlertSuccess(false)}>
                <Alert onClose={() => setAlertSuccess(false)} severity="success">
                    File Successfully uploaded!! 
                </Alert>
            </Snackbar>
          
            <Container>
                <Box border={30} p={4} borderColor="primary">
                    <form onSubmit={handleSubmit}>
                        <img src={require('./uploadimage.png')} alt="Visual of clouds"></img>
                        <div>
                            <input type="file" id="jsonFile" accept="application/json" />
                            <Button type="submit" variant="contained"> Upload this file! </Button>
                        </div>

                    </form>
                </Box>

                <Box  p={4}>
                    <div>
                        {/**for downloading sample empty json file*/}
                         <Download file= "emptyJason.json" content= {JSON.stringify(emptyJSFile,null,2)}>
                            <Button type="submit" variant="contained" onClick={console.log('success fully json downloaded')}> Download Sample JSON file </Button>
                         </Download>                                                               
                    </div>
                    {/**for downnloading instructions readMe for users */}
                    <div>
                        <Download file="readMe.txt" content = {readme + fields + info}>
                             <a href= "http://localhost:3000/#/uploadFile"> ReadME </a>  
                        </Download>
                    </div>
                </Box>
            </Container>
        </>
    )
}
