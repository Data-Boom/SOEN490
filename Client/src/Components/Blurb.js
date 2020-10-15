import React from 'react';
import './Blurb.css';

function Blurb(){
    return(
        <div className = "Blurb">
            <div className = "FirstBlurb">
                <h1>Graphs</h1>
                <p>Interactive Gaphs! Add/Delete data sets, change axis, zoom in and out, enjoy seeing the database in a whole new way!</p>
            </div>
            <div className = "SecondBlurb">
                <h1>Downloads</h1>
                <p>Downloads have never been so easy. Select the datasets you want, choose the format you need, preview for perfection and DOWNLAOD WITH A CLICK.</p>
            </div>
            <div className = "ThirdBlurb">
                <h1>Personalized Accounts</h1>
                <p>Get ready to have your own account, upload your own data set, save your preferences and collaborate with others on theirs.</p>

            </div>
            <div className = "FourthBlurb"> 
                <h1>Search and Discover</h1>
                <p>Need to find a dataset? Search with filters, by gas, DOI, author, category, fuel, oxidizer, dilutent, temperature, and more!</p>

            </div>
            <div className = "FifthBlurb">
                <h1>Data Cell Analysis</h1>
                <p>Welcome to the future! Bringing computer vision to data cells, upload an image of your experimental data cells and let magic do the rest! Data cell size 
                    in a minute!</p>
            </div>
        </div>
    )
}

export default Blurb;