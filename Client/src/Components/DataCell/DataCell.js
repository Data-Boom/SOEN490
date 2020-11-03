import React from 'react';
import Box from '@material-ui/core/Box';

/**
 * This component handles receiving the csvFile locally then sending the file for processing
 * to the correct API.
 */
const DataCell = () => {
 
/**
 * Upon submission, the CSV file is extracted from the event and must be appended to formData
 * to be sent with API request. 
 */
const handleSubmit = async (e) => {
    e.preventDefault();

    const csv = e.target.csvFile.files[0];

    const formData = new FormData();
    formData.append('csvFile', csv);

    const options = {
        method: 'POST',
        body: formData,
    };
    await fetch('http://localhost:4000/dataupload', options)
}

    return (
        <Box display="flex" marginLeft={"25%"} flexDirection="column" justify="center" alignItems="center" border={30} borderColor={"#2e3b52"} width={720} height={300} padding={10}>
            <form onSubmit={handleSubmit}>
                <img src={require('./uploadimage.png')} alt="Visual of clouds"></img>
                    <input type="file" id="csvFile"/>
                <button type="submit"> Upload this file! </button>
            </form>
        </Box>
    )
}

export default DataCell;