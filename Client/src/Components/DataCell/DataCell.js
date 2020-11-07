import React, { useRef, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import styled from 'styled-components';

/**
 * This component handles receiving the csvFile locally then sending the file for processing
 * to the correct API.
 */
const DataCell = () => {

    const ref = useRef();
    const [file, setFile] = useState('');

    /**
     * Upon submission, the CSV file is extracted from the event and must be appended to formData
     * to be sent with API request. 
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const json = ref.file.value;
        console.log(json);
        setFile(json);
        console.log(file);


        const formData = new FormData();
        formData.append('file', file);

        const options = {
            method: 'POST',
            body: formData,
        };
        await fetch('http://localhost:4000/dataupload', options)
            .then(resp => resp.json())
            .then(result => {
                alert(result.message)
            })
    }

    return (
        <Box display="flex" flexDirection="column" justify="center" alignItems="center" border={30} borderColor={"#2e3b52"} padding={10}>
            <FormContainer onSubmit={handleSubmit}>
                <img src={require('./uploadimage.png')} alt="Visual of clouds"></img>
                <div>
                    <input type="file" ref={ref} id="jsonFile" accept=".json" />
                </div>
                <Button type="submit" variant="contained" t={0.5}> Upload this file! </Button>
            </FormContainer>
        </Box >
    )
}

export default DataCell;

const FormContainer = styled.form`
display: flex;
flex-direction: column;
& > div {
    padding: 20px;
    margin: 80;
    width: 300px;

}`
