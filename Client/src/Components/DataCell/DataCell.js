import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core'
import { Snackbar } from '@material-ui/core'
import React, {useState} from 'react'
import { Alert } from '@material-ui/lab'



/**
 * This component handles receiving the json locally then sending the file for processing
 * to the correct API.
 */
export default function DataCell() {
    const [open, setOpen] = useState(false);

    /**
     * Upon submission, the JSON file is extracted from the event and must be appended to formData
     * to be sent with API request.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //so if this here is not proper json it will catch
            JSON.parse(json);
        } catch (e) {
            console.log("was not able to validate json of uploaded file")
            setOpen(true)
            return;
        }

        const json = e.target.jsonFile.files[0];
        
        const formData = new FormData();
        formData.append('jsonFile', json);

        const options = {
            method: 'POST',
            body: formData,
        };
        try{
             await fetch('http://localhost:4000/dataupload', options)
            .then(resp => resp.json())
            .then(result => {
                console.log(result[0])
            })
        }catch(err){
            console.log('wrong file bro')
        }
       
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };


    return (
        <>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Failed to parse json
                </Alert>
        </Snackbar>
        <Container>
            <Box border={30} p={4} borderColor="primary">
                <form onSubmit={handleSubmit}>
                    <img src={require('./uploadimage.png')} alt="Visual of clouds"></img>
                    <div>
                        <input type="file" id="jsonFile" accept="application/JSON" />
                        <Button type="submit" variant="contained"> Upload this file! </Button>
                    </div>
                </form>
            </Box>
        </Container>
        </>
    )
}
