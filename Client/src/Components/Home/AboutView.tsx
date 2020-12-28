import { Box, Container, Grid } from '@material-ui/core'

import React from 'react'
import { classStyles } from '../../appTheme'
import profPic from '../../Assets/universitylogo.png'

export const AboutView = () => {
  return (
    <Container>
      <Grid container>
        <Grid item sm={12}>
          <Box className={classStyles().defaultBorder}>
            This database is brought to you by a team of 10 undergraduate students from Concordia University as the final project to graduate from Software Engineering.
            It was a joy to work on this project because of the dedication and commitment from this amazing team.
            The stakeholder`s passion for his work made it possible to create this opportunity for all of you.
          </Box>
        </Grid>
        <Grid item sm={12}>
          <Box className={classStyles().defaultBorder}>
            Ahmadi, Mehrdad Allaire, Jessica Dheer, Gurinder Howard, Sean Poso, Leslie Prasad, Vatika Tiongson, Jeremiah Zaman, Rahimuz Awad, MHD Laith, Dmytro Semenov
          </Box>
        </Grid>
        <Grid item sm={12}>
          <Box className={classStyles().defaultBorder}>
            <Grid container>
              <Grid item sm={12}>
                Small text about Prof. Charles Basenga Kiyanda, his job, his role, written by him.
              </Grid>
              <Grid item sm={12}>
                <img src={profPic}></img>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}