import React from 'react';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import Report from './Report';

function Timeline(props) {
  const { reportIds } = props;

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      margin={2}
      sx={{ width: '100%', height: '100%' }}
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
            Timeline
          </Typography>
        </Grid>
        {reportIds.map((reportId) => (
          <Grid
            item
            alignItems="center"
            justifyContent="center"
            xs={12}
            key={reportId}
          >
            <Report postId={reportId} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

Timeline.propTypes = {
  reportIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};
export default Timeline;
