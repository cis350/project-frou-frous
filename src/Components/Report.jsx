import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, CardActions, Grid, Avatar, Button,
} from '@mui/material';
import PropTypes from 'prop-types';

import { getReport, getPfp } from '../api/userPageAPI';

function Report(props) {
  const [name, setName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [photo, setPhoto] = useState('');
  const { reportId } = props;

  async function fetchData() {
    try {
      const reportResponse = await getReport(); // Need to add this to swaggerHub API
      const { username, picture } = reportResponse;
      setName(username);
      setPhoto(picture);

      const profilePhotoResponse = await getPfp(); // Need to add this to swaggerHub API
      const { pfp } = profilePhotoResponse;
      setProfilePhoto(pfp);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [reportId]);

  return (
    <Card variant="outlined" sx={{ width: '100%', height: '100%', border: '3px solid #E5E5E5', borderRadius: '10px', backgroundColor: '#0D1B1E' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={profilePhoto} alt={name} sx={{ width: 50, height: 50 }} />
          </Grid>
          <Grid item>
            <div style={{ color: 'white', fontFamily: 'Open Sans, sans-serif' }}>{name}</div>
          </Grid>
        </Grid>
        <img src={photo} alt="" style={{ width: '100%', height: '100%', marginTop: 15, borderRadius: '10px' }} />
      </CardContent>
      <CardActions>
        <Button id="comments" size="small" sx={{ backgroundColor: 'white', color: 'black' }}>
          Comments
        </Button>
        <Button id="view" size="small" sx={{ backgroundColor: 'white', color: 'black' }}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}

Report.propTypes = {
  reportId: PropTypes.number.isRequired,
};

export default Report;
