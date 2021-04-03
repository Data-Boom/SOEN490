import { AppBar, Box, Container, Snackbar, Tab, Tabs, Typography } from "@material-ui/core"
import React, { useEffect, useState } from 'react'

import { Alert } from '@material-ui/lab'
import { CategoryManagementTab } from '../Profile/CategoryManagementSection/CategoryManagementTab';
import { DimensionManagementTab } from '../Profile/UnitManagementSection/DimensionManagementTab'
import PermissionsTab from '../Profile/PermissionsSection/PermissionsTab'
import { useUserSelector } from "../../Stores/Slices/UserSlice"

// Tab code taken from: https://material-ui.com/components/tabs/
interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}


export const AdminPageView = () => {
    const [tab, setTab] = React.useState(0)
    const user = useUserSelector()
    const [superAdmin, setSuperAdmin] = useState(false)
    const [alertOpen, setAlertOpen] = useState(true)

    const handleChange = (event: React.ChangeEvent<{}>, newTab: number) => {
        setTab(newTab)
    }

    useEffect(() => {
        if (user.account_permissions == 2) {
            setSuperAdmin(true)
        }
    })

    return (
        <>
            <div>
                <AppBar position="static">
                    <Tabs value={tab} onChange={handleChange}>
                        <Tab label="Categories Management" {...a11yProps(0)} />
                        <Tab label="Dimension Management" {...a11yProps(1)} />
                        <Tab label="Admin Management" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <Container>
                    <TabPanel value={tab} index={0}>
                        {superAdmin ? <CategoryManagementTab /> :
                            <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => setAlertOpen(false)}>
                                <Alert onClose={() => setAlertOpen(false)} severity="error">
                                    You do not have access to this page
                                </Alert>
                            </Snackbar>}
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        {superAdmin ? <DimensionManagementTab /> :
                            <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => setAlertOpen(false)}>
                                <Alert onClose={() => setAlertOpen(false)} severity="error">
                                    You do not have access to this page
                         </Alert>
                            </Snackbar>}
                    </TabPanel>
                    <TabPanel value={tab} index={2}>
                        {superAdmin ? <PermissionsTab /> :
                            <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => setAlertOpen(false)}>
                                <Alert onClose={() => setAlertOpen(false)} severity="error">
                                    You do not have access to this page
                                </Alert>
                            </Snackbar>}
                    </TabPanel>
                </Container>
            </div>
        </>
    )
}