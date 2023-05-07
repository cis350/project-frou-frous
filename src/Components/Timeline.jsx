/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { getFriendReports } from '../api/userPageAPI';

import Report from './Report'; // esline-disable-line

function Timeline(props) {
  const { userId, page, name } = props; // eslint-disable-line
  let reports = [];

  const loadPosts = async (array) => {
    try {
      for (let i = 0; i < array.length; i += 1) {
        // const report = <Report postId={array[i]._id} />;
        reports.push(array[i]._id);
        // reportString = reportString.concat(
        //   `<Grid
        //     item
        //     alignItems="center"
        //     justifyContent="center"
        //     xs={12}
        //     key=${array[i]._id}
        //     >
        //       <Report postId=${array[i]._id} />
        //     </Grid>`,
        // );
      }
      console.log(reports);
      console.log(reports.map((reportId) => (
        <Report postId={reportId} />
      )));
      reports = [];
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const idArr = await getFriendReports(userId);
        // await setReportIds(idArr);
        await loadPosts(idArr);
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
        {reports.map((reportId) => (
          <Grid
            item
            alignItems="center"
            justifyContent="center"
            xs={12}
          >
            <Report postId={reportId} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

Timeline.propTypes = {
  userId: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};
export default Timeline;
