import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import NavBar from '../Components/NavBar';
import Timeline from '../Components/Timeline'; //eslint-disable-line
import UserCard from '../Components/UserCard';
import ScheduleUser from '../Components/ScheduleUser';

function UserPageView() {
  const [page, setPage] = useState('Profile'); // Either Profile or Timeline

  return (
    <Grid
      container
      spacing={2}
      sx={{ width: '100vw', minHeight: '100vh', backgroundColor: '#0D1B1E' }}
    >
      <Grid item xs={6} justifyContent="center">
        {page === 'Timeline' && <Timeline userId={12345} page={page} />}
        {page === 'Profile' && <UserCard userId={12345} />}
      </Grid>
      <Grid item xs={6} justifyContent="center">
        <NavBar setPage={setPage} />
        <center>
          <div style={{ border: '3px solid #E5E5E5', maxHeight: '70%', borderRadius: '10px', padding: '3px', marginRight: '3px' }}>
            <a href="/schedule/1234">
              <ScheduleUser />
            </a>
          </div>
        </center>
      </Grid>
    </Grid>
  );
}

export default UserPageView;
