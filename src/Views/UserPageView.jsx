import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import NavBar from '../Components/NavBar';
import Timeline from '../Components/Timeline'; //eslint-disable-line
import UserCard from '../Components/UserCard';

function UserPageView() {
  const [page, setPage] = useState('Profile'); // Either Profile or Timeline

  return (
    <Grid
      container
      spacing={2}
      sx={{ width: '100vw', height: '100vh', backgroundColor: '#0D1B1E' }}
    >
      <Grid item xs={6} justifyContent="center">
        {page === 'Timeline' && <Timeline userId={12345} page={page} />}
        {page === 'Profile' && <UserCard userId={12345} />}
      </Grid>
      <Grid item xs={6} justifyContent="center">
        <NavBar setPage={setPage} />
      </Grid>
    </Grid>
  );
}

export default UserPageView;
