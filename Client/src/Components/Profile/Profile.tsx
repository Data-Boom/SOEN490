import { Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'

interface IProps {
  name: string,
  email: string,
  dateOfBirth: string,
  organization: string,
  password: string
}

export default function Profile(props: IProps) {

  const [editProfile, setEdit] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const [verifyPassword, setVerifyPassword] = useState(false)
  const [name, editName] = useState(props.name)
  const [email, editEmail] = useState(props.email)
  const [dateOfBirth, editDOB] = useState(props.dateOfBirth)
  const [organization, editOrganization] = useState(props.organization)
  const [password, editPassword] = useState(props.password)
  const [temporaryName, editTempName] = useState(name)
  const [temporaryEmail, editTempEmail] = useState(email)
  const [temporaryDateOfBirth, editTempDOB] = useState(dateOfBirth)
  const [temporaryOrganization, editTempOrganization] = useState(organization)
  const [temporaryPassword, editTemporaryPassword] = useState("")
  const [temporaryPassword1, editTemporaryPassword1] = useState("")
  const [temporaryPassword2, editTemporaryPassword2] = useState("")


  const handleNameChange = (event) => {
    const { value } = event.target
    editTempName(value)
  }
  const handleEmailChange = (event) => {
    const { value } = event.target
    editTempEmail(value)
  }
  const handleDOBChange = (event) => {
    const { value } = event.target
    editTempDOB(value)
  }
  const handleOrganizationChange = (event) => {
    const { value } = event.target
    editTempOrganization(value)
  }

  const handleEditPassword1 = (event) => {
    const { value } = event.target
    editTemporaryPassword1(value)
  }
  const handleEditPassword2 = (event) => {
    const { value } = event.target
    editTemporaryPassword2(value)
  }

  const handleEditProfile = () => {
    setEdit(!editProfile)
  }

  const handlePasswordToggle = () => {
    setChangePassword(!changePassword)
  }

  const handleSaveChanges = () => {
    editName(temporaryName)
    editEmail(temporaryEmail)
    editDOB(temporaryDateOfBirth)
    editOrganization(temporaryOrganization)
    setEdit(!editProfile)
  }

  const handleCancelChanges = () => {
    editTempName(name)
    editTempEmail(email)
    editTempDOB(dateOfBirth)
    editTempOrganization(organization)
    setEdit(!editProfile)
  }

  const handleVerifyPassword = (event) => {
    const { value } = event.target
    editTemporaryPassword(value)
    if (value == password) {
      setVerifyPassword(true)
    }
    else {
      setVerifyPassword(false)
    }
  }

  const handleSavePassword = () => {
    if (verifyPassword == true) {
      if (temporaryPassword1 == temporaryPassword2) {
        editPassword(temporaryPassword1)
        setChangePassword(!changePassword)
        alert("Your password has been changed.")
      }
      else {
        setChangePassword(!changePassword)
        alert("Passwords do no match.")
      }
    }
    else {
      setChangePassword(!changePassword)
      alert("Incorrect Password Entered.")
    }
    editTemporaryPassword("")
    editTemporaryPassword1("")
    editTemporaryPassword2("")
  }

  const handleCancelPassowrd = () => {
    editTemporaryPassword("")
    editTemporaryPassword1("")
    editTemporaryPassword2("")
    setChangePassword(!changePassword)
  }

  return (
    <Paper elevation={3}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h2">
            Profile
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h2">
            Settings
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={10}>
        <Grid item xs={6}>
          <Box border={10} p={4} borderColor="primary" height={325}>
            <Grid container spacing={10}>
              <Grid item xs={6}>
                <Typography variant="h3">
                  Name:
                </Typography>
              </Grid>
              {editProfile ? (
                <Grid item xs={6}>
                  <TextField label="Edit Name" variant="outlined" name="name" value={temporaryName} onChange={handleNameChange} />
                </Grid>
              ) : (
                  <Grid item xs={6}>
                    <Typography variant="h4">
                      {name}
                    </Typography>
                  </Grid>
                )}
              <Grid item xs={6}>
                <Typography variant="h3">
                  E-mail:
                </Typography>
              </Grid>
              {editProfile ? (
                <Grid item xs={6}>
                  <TextField label="Edit Email" variant="outlined" name="email" value={temporaryEmail} onChange={handleEmailChange} />
                </Grid>
              ) : (
                  <Grid item xs={6}>
                    <Typography variant="h4">
                      {email}
                    </Typography>
                  </Grid>
                )}
              <Grid item xs={6}>
                <Typography variant="h3">
                  Date of Birth:
                </Typography>
              </Grid>
              {editProfile ? (
                <Grid item xs={6}>
                  <TextField label="Edit DOB" type="date" variant="outlined" name="dateOfBirth" value={temporaryDateOfBirth} onChange={handleDOBChange} />
                </Grid>
              ) : (
                  <Grid item xs={6}>
                    <Typography variant="h4">
                      {dateOfBirth}
                    </Typography>
                  </Grid>
                )}
              <Grid item xs={6}>
                <Typography variant="h3">
                  Organization:
                </Typography>
              </Grid>
              {editProfile ? (
                <Grid item xs={6}>
                  <TextField label="Edit Organization" variant="outlined" name="organization" value={temporaryOrganization} onChange={handleOrganizationChange} />
                </Grid>
              ) : (
                  <Grid item xs={6}>
                    <Typography variant="h4">
                      {organization}
                    </Typography>
                  </Grid>
                )}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box border={10} p={4} borderColor="primary" height={325}>
            <Grid container spacing={10}>
              {changePassword ? (
                <>
                  <Grid item xs={4}>
                    <TextField label="Type Password" variant="outlined" name="password" value={temporaryPassword} type="password" onChange={handleVerifyPassword} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField id="p1" label="Type New Password" variant="outlined" name="password1" value={temporaryPassword1} type="password" onChange={handleEditPassword1} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField id="p2" label="Type New Password Again" variant="outlined" name="password2" value={temporaryPassword2} type="password" onChange={handleEditPassword2} />
                  </Grid>
                </>
              ) : (
                  <>
                    <Grid item xs={4}>
                      <TextField disabled label="Type Password" variant="outlined" name="password" value={temporaryPassword} type="password" onChange={handleVerifyPassword} />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField disabled label="Type New Password" variant="outlined" name="password1" value={temporaryPassword1} type="password" onChange={handleEditPassword1} />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField disabled label="Type New Password Again" variant="outlined" name="password2" value={temporaryPassword2} type="password" onChange={handleEditPassword2} />
                    </Grid>
                  </>
                )}
            </Grid>
          </Box>
        </Grid>
        {editProfile ? (
          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={handleCancelChanges}>Cancel Changes</Button>
            <Button variant="contained" color="primary" onClick={handleSaveChanges}>Save Changes</Button>
          </Grid>
        ) : (
            <Grid item xs={6}>
              <Button variant="contained" color="primary" onClick={handleEditProfile}>Edit Profile</Button>
            </Grid>
          )}
        {changePassword ? (
          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={handleCancelPassowrd}>Cancel Changes</Button>
            <Button variant="contained" color="primary" onClick={handleSavePassword}>Save Password</Button>
          </Grid>
        ) : (
            <Grid item xs={6}>
              <Button variant="contained" color="primary" onClick={handlePasswordToggle}>Change Password</Button>
            </Grid>
          )}
      </Grid>
    </Paper>
  )
}