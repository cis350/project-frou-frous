import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button } from '@mui/material';
import {
  Chat,
  Timeline,
  Report,
  Leaderboard,
  AccountCircle,
  Logout,
} from '@mui/icons-material';

function NavBar({ setPage }) {
  const handleNavigation = (page) => {
    setPage(page);
  };

  return (
    <Grid
      container
      direction="column"
      sx={{ width: '200px', height: '250px', border: '1px solid black' }}
    >
      <Grid item sx={{ textAlign: 'center', py: 1 }}>
        <Typography variant="subtitle1">Navigation Bar</Typography>
      </Grid>
      <Grid item container direction="column" spacing={1} sx={{ p: 2 }}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Chat />}
            component={Link}
            to="/chat"
          >
            Chat
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Timeline />}
            onClick={() => handleNavigation('Timeline')}
          >
            Timeline
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Report />}
            component={Link}
            to="/report"
          >
            Report
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Leaderboard />}
            component={Link}
            to="/leaderboard"
          >
            Leaderboard
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AccountCircle />}
            onClick={() => handleNavigation('Profile')}
          >
            User Profile
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Logout />}
            onClick={() => handleNavigation('logout')}
          >
            Log out
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default NavBar;
