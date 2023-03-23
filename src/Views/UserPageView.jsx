import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import NavBar from '../Components/NavBar';
import Timeline from '../Components/Timeline'; //eslint-disable-line
import UserCard from '../Components/UserCard';
import { getFriendReports } from '../api/userPageAPI';

function UserPageView() {
  const [page, setPage] = useState('Profile'); // Either Profile or Timeline
  const [reports, setReports] = useState([]); //eslint-disable-line

  const getReportIds = async () => {
    try {
      const response = await getFriendReports();
      setReports(response.reportIds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReportIds();
  }, [page]);

  return (
    <Grid
      container
      spacing={2}
      sx={{ width: '100%', height: '100vh', backgroundColor: '#0D1B1E' }}
    >
      <Grid item xs={6} justifyContent="center">
        {page === 'Timeline' && <Timeline reportIds={reports} />}
        {page === 'Profile' && <UserCard userId={12345} />}
      </Grid>
      <Grid item xs={6} justifyContent="center">
        <NavBar setPage={setPage} />
      </Grid>
    </Grid>
  );
}

export default UserPageView;
