import React from 'react';
import { Grid, Typography } from '@mui/material';

import Report from './Report';

function Timeline(props) {
  const { reportIds } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" align="center" gutterBottom>
          Timeline
        </Typography>
      </Grid>
      {reportIds.map((reportId) => (
        <Grid item xs={12} key={reportId}>
          <Report postId={reportId} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Timeline;
