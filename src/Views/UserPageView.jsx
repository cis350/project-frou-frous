import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import NavBar from '../Components/NavBar';
import Timeline from '../Components/Timeline';
import { getFriendReports } from '../api/userPageAPI';

function UserPageView() { // Need to add userId as a prop, for now just hardcoded
  const userId = '12345';
  const [page, setPage] = useState('Profile'); // Either Profile or Timeline
  const [reportIds, setReportIds] = useState([]);

  const getReportIds = async () => {
    try {
      const response = await getFriendReports(userId);
      const { friendreports } = response.data;
      setReportIds(friendreports);
    } catch {
      console.log('Error getting friend reports');
    }
  };

  useEffect(() => {
    getReportIds();
  }, [userId]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        {page === 'Timeline' && <Timeline reportIds={reportIds} />}
      </Grid>
      <Grid item xs={9}>
        <NavBar setPage={setPage} />
      </Grid>
    </Grid>
  );
}

export default UserPageView;
