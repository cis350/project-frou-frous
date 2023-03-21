import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, CardActions, Grid, Avatar, Button,
} from '@mui/material';

import { getReport, getPfp } from '../api/userPageAPI';

function Report(props) {
  const [name, setName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [photo, setPhoto] = useState('');
  const { reportId } = props;

  async function fetchData() {
    try {
      const reportResponse = await getReport(reportId); // Need to add this to swaggerHub API
      const { username, picture } = reportResponse.data;
      setName(username);
      setPhoto(picture);

      const profilePhotoResponse = await getPfp(username); // Need to add this to swaggerHub API
      const { pfp } = profilePhotoResponse.data;
      setProfilePhoto(pfp);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [reportId]);

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={profilePhoto} alt={name} sx={{ width: 60, height: 60 }} />
          </Grid>
          <Grid item>
            <div>{name}</div>
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
