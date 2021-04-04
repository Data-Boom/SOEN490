import { AppBar, Container, Snackbar, Tab, Tabs } from "@material-ui/core"
import React, { useEffect, useState } from 'react'
import { TabPanel, a11yProps } from '../Profile/ProfileView'

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
                        <CategoryManagementTab />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <DimensionManagementTab />
                    </TabPanel>
                    <TabPanel value={tab} index={2}>
                        <PermissionsTab />
                    </TabPanel>
                </Container>
            </div>
        </>
    )
}