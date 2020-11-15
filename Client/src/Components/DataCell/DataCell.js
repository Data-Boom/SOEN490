import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import React from 'react';
import styled from 'styled-components';

/**
 * This component handles receiving the json locally then sending the file for processing
 * to the correct API.
 */
const DataCell = () => {

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
        <MaterialUiBox border={30}>
            <FormContainer onSubmit={handleSubmit}>
                <img src={require('./uploadimage.png')} alt="Visual of clouds"></img>
                <div>
                    <input type="file" id="jsonFile" accept=".json" />
                    <MaterialUiButton type="submit" variant="contained"> Upload this file! </MaterialUiButton>
                </div>
            </FormContainer>
        </MaterialUiBox >
    )
}

export default DataCell;

const FormContainer = styled.form`
display: flex;
flex-direction: column;
height: 400px;
width: 60%;


img {
    margin-top: 25px;
}
div {
    margin-top: 80px;
}

`

const MaterialUiBox = styled(Box)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-color: #2e3b52;
padding: 10;
width: 50%;
margin: 0 auto;
`
const MaterialUiButton = styled(Button)`
width: 100%;
margin-top: 15px;
`