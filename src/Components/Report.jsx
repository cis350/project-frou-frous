import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, CardActions, Grid, Avatar, Button,
} from '@mui/material';
import PropTypes from 'prop-types';

import { getReport, getPfp } from '../api/userPageAPI';

function Report(props) {
  const [name, setName] = useState('');
  const [reportee, setReportee] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [photo, setPhoto] = useState('');
  const [cap, setCaption] = useState('');
  const { postId } = props;

  async function handleReport(reportResponse) {
    console.log('Res', reportResponse);
    const { reporterId, img, reporteeId, caption } = reportResponse;
    setName(reporterId);
    setPhoto(img);
    setReportee(reporteeId);
    setCaption(caption);

    const profilePhotoResponse = await getPfp(); // Need to add this to swaggerHub API
    const { pfp } = profilePhotoResponse;
    setProfilePhoto(pfp);
  }

  async function fetchData() {
    try {
      getReport(handleReport, postId); // Need to add this to swaggerHub API
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [postId]);

  return (
    <Card variant="outlined" sx={{ width: '100%', height: '100%', border: '3px solid #E5E5E5', borderRadius: '10px', backgroundColor: '#0D1B1E' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={profilePhoto} alt={name} sx={{ width: 50, height: 50 }} />
          </Grid>
          <Grid item>
            <div style={{ color: 'white', fontFamily: 'Open Sans, sans-serif' }}>
              <b>
                {name}
              </b>
              {' '}
              reported
              {' '}
              <b>
                {reportee}
              </b>
              {' '}
              for skipping!
            </div>
          </Grid>
        </Grid>
        <img src={photo} alt="" style={{ width: '100%', height: '100%', marginTop: 15, borderRadius: '10px' }} />
        <center style={{ color: 'white' }}>
          <p>
            {' '}
            {cap}
            {' '}
          </p>
        </center>
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
  postId: PropTypes.number.isRequired,
};

export default Report;
