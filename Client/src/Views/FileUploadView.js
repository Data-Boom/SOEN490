import React from 'react';
import DataCell from '../Components/DataCell/DataCell'
import styled from 'styled-components';


const FileUploadView = () => {

    return (
        <> <h2> File Upload Page </h2>
            <div>
                <DataCell />
            </div>
        </>
    )
}

export default FileUploadView;

const FileWrapper = styled.div`
display: flex;
width: 646px;
height: 500px;
margin:0 auto;
padding:0;
`