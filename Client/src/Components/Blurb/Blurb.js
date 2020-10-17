import React from 'react';
import './Blurb.css';
import Box from '@material-ui/core/Box';
import { createMuiTheme } from '@material-ui/core';

function Blurb(){
    return(
        <Box display ="flex" flexDirection="row">
            <Box display = "flex" flexDirection = "column">
                <h1 className = "Header">Graphs</h1>
                <p className = "Paragraph">Interactive Gaphs! Add/Delete data sets, change axis, zoom in and out, enjoy seeing the database in a whole new way!</p>
            </Box>
            <Box display = "flex" flexDirection = "column">
                <h1 className = "Header">Downloads</h1>
                <p className = "Paragraph">Downloads have never been so easy. Select the datasets you want, choose the format you need, preview for perfection and DOWNLOAD WITH A CLICK.</p>
            </Box>
            <Box display = "flex" flexDirection = "column">
                <h1 className = "Header2">Personalized Accounts</h1>
                <p className = "Paragraph">Get ready to have your own account, upload your own data set, save your preferences and collaborate with others on theirs.</p>
            </Box>
            <Box display = "flex" flexDirection = "column">
                <h1 className = "Header2">Search and Discover</h1>
                <p className = "Paragraph">Need to find a dataset? Search with filters, by gas, DOI, author, category, fuel, oxidizer, dilutent, temperature, and more!</p>
            </Box>
            <Box display = "flex" flexDirection = "column">
                <h1 className = "Header">Data Cell Analysis</h1>
                <p className = "Paragraph">Welcome to the future! Bringing computer vision to data cells, upload an image of your experimental data cells and let magic do the rest! Data cell size 
                    in a minute!</p>
            </Box>
        </Box>
    )
}

export default Blurb;