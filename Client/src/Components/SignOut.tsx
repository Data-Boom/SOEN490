import { useHistory, withRouter } from 'react-router-dom';
import React, { Component, useContext, useState } from 'react'
import { AppBar, Box, Button, Divider, Drawer, Grid, IconButton, Toolbar, Typography, makeStyles } from "@material-ui/core"


export default function Logout() {

    const history = useHistory();

    const routeChange = () => {
        let path = '/sign-in';
        history.push(path);
    }

    return (
        <h1>hi</h1>
    );
}
