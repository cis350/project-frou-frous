/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { getFriendReports, getPersonalReports } from '../api/userPageAPI';

import Report from './Report'; // esline-disable-line

function Timeline(props) {
  const { userId, page, name, personal } = props; // eslint-disable-line
  // let reports = [];
  const loadPosts = async (array) => {
    try {
      const reports = [];
      for (let i = 0; i < array.length; i += 1) {
        const report = array[i]._id;
        const reportElement = <Report postId={report} />;
        reports.push(reportElement);
      }
      const root = createRoot(document.getElementById('reports'));
      root.render(reports);
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        if (!personal) {
          const idArr = await getFriendReports(userId);
          // await setReportIds(idArr);
          await loadPosts(idArr);
        } else {
          console.log('personal timeline');
          const idArr = await getPersonalReports(userId);
          await loadPosts(idArr);
        }
      } catch (error) {
        toast.error(error);
      }
    }
    fetchUserData();
  }, [userId, page]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      margin="auto"
      sx={{ width: '90%', height: '100%' }}
    >
      <Grid item xs={12} alignItems="center">
        <Grid item xs={12} alignItems="center" md={12}>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'white',
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '35px',
              textAlign: 'center',
            }}
          >
            {name}
          </Typography>
        </Grid>
        <div id="reports" />
      </Grid>
    </Grid>
  );
}

Timeline.propTypes = {
  userId: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  personal: PropTypes.bool.isRequired,
};
export default Timeline;
