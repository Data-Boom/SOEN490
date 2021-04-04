import { AppBar, Container, Tab, Tabs } from "@material-ui/core"
import { TabPanel, a11yProps } from '../Profile/ProfileView'

import { CategoryManagementTab } from '../Profile/CategoryManagementSection/CategoryManagementTab';
import { DimensionManagementTab } from '../Profile/UnitManagementSection/DimensionManagementTab'
import PermissionsTab from '../Profile/PermissionsSection/PermissionsTab'
import React from 'react'

export const AdminPageView = () => {
    const [tab, setTab] = React.useState(0)

    const handleChange = (event: React.ChangeEvent<{}>, newTab: number) => {
        setTab(newTab)
    }

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