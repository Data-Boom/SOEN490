import { Box, Container, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'

import Avatar from '@material-ui/core/Avatar';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { classStyles } from '../../appTheme'
import profPic from '../universitylogo.png'

export const AboutView = () => {

  useEffect(() => { document.title = "About" })

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
            <h1>Creators</h1>
            <Box>
              <h2 style={{ textAlign: 'left' }}>Ahmadi, Mehrdad</h2>
              <Box display="flex" flexDirection="row" >
                <Box display="flex" flexDirection="column" pr={4}>
                  <Avatar>M</Avatar>
                </Box>
                <Box display="flex" flexDirection="column">
                  "Everyday I spend most of my time on my my Mac. I try to learn everything that's needed or expected from me. Given a time, nothing is impossible. " <br>
                  </br><p style={{ textAlign: 'right' }}>- Mehrdad Ahmadi</p>
                  <p style={{ textAlign: 'right' }}><a href="https://www.linkedin.com/in/mehrdadmaskull/"><LinkedInIcon /></a></p>
                </Box>
              </Box>
            </Box>
            <Box>
              <h2 style={{ textAlign: 'left' }}>Allaire, Jessica</h2>
              <Box display="flex" flexDirection="row" >
                <Box display="flex" flexDirection="column" pr={4}>
                  <Avatar>J</Avatar>
                </Box>
                <Box display="flex" flexDirection="column">
                  blah blah blah
                  <p style={{ textAlign: 'right' }}><a href="https://www.linkedin.com/in/jessica-allaire/"><LinkedInIcon /></a></p>
                </Box>
              </Box>
            </Box>
            <Box>
              <h2 style={{ textAlign: 'left' }}>Awad, MHD Laith</h2>
              <Box display="flex" flexDirection="row" >
                <Box display="flex" flexDirection="column" pr={4}>
                  <Avatar>L</Avatar>
                </Box>
                <Box display="flex" flexDirection="column">
                  blah blah blah
                  <p style={{ textAlign: 'right' }}><a href="https://www.linkedin.com/in/"><LinkedInIcon /></a></p>
                </Box>
              </Box>
            </Box>
            <Box>
              <h2 style={{ textAlign: 'left' }}>Dheer, Gurinder</h2>
              <Box display="flex" flexDirection="row" >
                <Box display="flex" flexDirection="column" pr={4}>
                  <Avatar>G</Avatar>
                </Box>
                <Box display="flex" flexDirection="column">
                  blah blah blah
                  <p style={{ textAlign: 'right' }}><a href="https://www.linkedin.com/in/"><LinkedInIcon /></a></p>
                </Box>
              </Box>
            </Box>
            <Box>
              <h2 style={{ textAlign: 'left' }}>Howard, Sean</h2>
              <Box display="flex" flexDirection="row" >
                <Box display="flex" flexDirection="column" pr={4}>
                  <Avatar>S</Avatar>
                </Box>
                <Box display="flex" flexDirection="column">
                  blah blah blah
                  <p style={{ textAlign: 'right' }}><a href="https://www.linkedin.com/in/"><LinkedInIcon /></a></p>
                </Box>
              </Box>
            </Box>
            <Box>
              <h2 style={{ textAlign: 'left' }}>Poso, Leslie</h2>
              <Box display="flex" flexDirection="row" >
                <Box display="flex" flexDirection="column" pr={4}>
                  <Avatar>L</Avatar>
                </Box>
                <Box display="flex" flexDirection="column">
                  blah blah blah
                  <p style={{ textAlign: 'right' }}><a href="https://www.linkedin.com/in/"><LinkedInIcon /></a></p>
                </Box>
              </Box>
            </Box>
            <Box>
              <h2 style={{ textAlign: 'left' }}>Prasad, Vatika</h2>
              <Box display="flex" flexDirection="row" >
                <Box display="flex" flexDirection="column" pr={4}>
                  <Avatar>G</Avatar>
                </Box>
                <Box display="flex" flexDirection="column">
                  blah blah blah
                  <p style={{ textAlign: 'right' }}><a href="https://www.linkedin.com/in/"><LinkedInIcon /></a></p>
                </Box>
              </Box>
            </Box>
            <Box>
              <h2 style={{ textAlign: 'left' }}>Semenov, Dmytro</h2>
              <Box display="flex" flexDirection="row" >
                <Box display="flex" flexDirection="column" pr={4}>
                  <Avatar>D</Avatar>
                </Box>
                <Box display="flex" flexDirection="column">
                  blah blah blah
                  <p style={{ textAlign: 'right' }}><a href="https://www.linkedin.com/in/"><LinkedInIcon /></a></p>
                </Box>
              </Box>
            </Box>
            <Box>
              <h2 style={{ textAlign: 'left' }}>Tiongson, Jeremiah</h2>
              <Box display="flex" flexDirection="row" >
                <Box display="flex" flexDirection="column" pr={4}>
                  <Avatar>D</Avatar>
                </Box>
                <Box display="flex" flexDirection="column">
                  blah blah blah
                  <p style={{ textAlign: 'right' }}><a href="https://www.linkedin.com/in/"><LinkedInIcon /></a></p>
                </Box>
              </Box>
            </Box>
            <Box>
              <h2 style={{ textAlign: 'left' }}>Zaman, Rahimuz</h2>
              <Box display="flex" flexDirection="row" >
                <Box display="flex" flexDirection="column" pr={4}>
                  <Avatar>R</Avatar>
                </Box>
                <Box display="flex" flexDirection="column">
                  blah blah blah
                  <p style={{ textAlign: 'right' }}><a href="https://www.linkedin.com/in/"><LinkedInIcon /></a></p>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={12}>
          <Box className={classStyles().defaultBorder}>
            <Grid container>
              <Grid item sm={12}>
                Charles Basenga Kiyanda, B. Eng, M. Eng, PhD, Ing
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