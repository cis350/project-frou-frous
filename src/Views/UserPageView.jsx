import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import NavBar from '../Components/NavBar';
import Timeline from '../Components/Timeline'; //eslint-disable-line
import UserCard from '../Components/UserCard';

import { getUserData } from '../api/userPageAPI';

function UserPageView() {
  const [page, setPage] = useState('Profile'); // Either Profile or Timeline
  const { userId } = useParams();
  const [validUser, setValidUser] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await getUserData(userId);
        if (!data.firstName) {
          setValidUser(false);
        }
      } catch (error) {
        console.log(error); //eslint-disable-line
      }
    }
    fetchUserData();
  }, [userId]);

  return (
    <Grid
      container
      spacing={2}
      sx={{ width: '100vw', minHeight: '100vh', backgroundColor: '#0D1B1E' }}
    >
      <Grid item xs={6} justifyContent="center">
        {!validUser && (
        <div style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}>
          No User Found
        </div>
        )}
        {validUser && page === 'Timeline' && <Timeline userId={userId} page={page} name="Timeline" />}
        {validUser && page === 'Profile' && (
        <div>
          <UserCard userId={userId} currentUser="jess" />
          <Timeline userId={userId} page={page} name="Skip History" />
        </div>
        )}
      </Grid>
      <Grid item xs={6} justifyContent="center">
        <NavBar setPage={setPage} />
        <a href="/schedule/1234">
          <button style={{ backgroundColor: 'white', marginTop: '10%' }} type="button">Schedule</button>
        </a>
      </Grid>
    </Grid>
  );
}

export default UserPageView;
