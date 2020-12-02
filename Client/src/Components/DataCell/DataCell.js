import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core'
import React from 'react'


/**
 * This component handles receiving the json locally then sending the file for processing
 * to the correct API.
 */
export default function DataCell() {
    /**
     * Upon submission, the JSON file is extracted from the event and must be appended to formData
     * to be sent with API request.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const json = e.target.jsonFile.files[0];
        const formData = new FormData();
        formData.append('jsonFile', json);
        const options = {
            method: 'POST',
            body: formData,
        };

        await fetch('http://localhost:4000/dataupload', options)
            .then(resp => resp.json())
            .then(result => {
                console.log(result[0])
            })
    }

    return (
        <Container>
            <Box border={30} p={4} borderColor="primary">
                <form id="formSubmit" onSubmit={handleSubmit}>
                    <img src={require('./uploadimage.png')} alt="Visual of clouds"></img>
                    <div>
                        <input type="file" id="jsonFile" accept=".json" />
                        <Button type="submit" variant="contained"> Upload this file! </Button>
                    </div>
                </form>
            </Box>
        </Container>
    )
}
