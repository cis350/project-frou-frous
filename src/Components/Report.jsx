import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActions, Grid, Avatar, Button } from '@mui/material';

function Report(props) {
  const [username, setUsername] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const reportResponse = await axios.get(`/report/${props.reportId}`); //Need to add this to swaggerHub API
        const username = reportResponse.data.username;
        const photo = reportResponse.data.photo;
        setUsername(username);
        setPhoto(photo);

        const profilePhotoResponse = await axios.get(`/user/${username}.jpg`); //Need to add this to swaggerHub API
        const profilePhoto = profilePhotoResponse.data.pfp;
        setProfilePhoto(profilePhoto);
        
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [props.reportId]);

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={profilePhoto} alt={username} sx={{ width: 60, height: 60 }} />
          </Grid>
          <Grid item>
            <div>{username}</div>
          </Grid>
        </Grid>
        <img src={photo} alt="" style={{ width: '100%', marginTop: 10 }} />
      </CardContent>
      <CardActions>
        <Button id="comments" size="small">
          Comments
        </Button>
        <Button id="view" size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default Report;