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
        if (personal == 'False') {
          const idArr = await getFriendReports(userId);
          await loadPosts(idArr);
        } else {
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
      sx={{
        borderRadius: '10px',
        width: '100%',
        backgroundColor: '#0d1b1e',
        border: '5px solid #E5E5E5',
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '10px',
        boxShadow: '0px 0px 0px rgba(255, 255, 255, 0.3)',
        transition: 'box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '4px 4px 4px rgba(255, 255, 255, 0.3)',
          transform: 'scale(1.0003)',
        },
      }}
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
              fontWeight: 'bold',
              fontStyle: 'italic'
            }}
          >
            {name}
          </Typography>
        </Grid>
        <div id="reports" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '5px', marginLeft: '5px', marginRight: '5px' }} />
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
