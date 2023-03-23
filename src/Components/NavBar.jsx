import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Typography, Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

import {
  Chat,
  Timeline,
  Report,
  Leaderboard,
  AccountCircle,
  Logout,
} from '@mui/icons-material';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    lime: createColor('#9ebd6e'),
    yellow: createColor('#d4b74c'),
    pink: createColor('#904c77'),
    darkgreen: createColor('#397367'),
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: 20,
  },
});

function NavBar({ setPage }) {
  const handleNavigation = (page) => {
    setPage(page);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{ width: '80%', height: '50%', border: '3px solid #E5E5E5', borderRadius: '5px', backgroundColor: '#0D1B1E' }}
      >
        <Grid item xs={12} spacing={1} container direction="row" sx={{ p: 2, flexGrow: 1 }}>
          <Grid item xs={12} alignItems="center" md={12}>
            <Typography
              variant="title"
              sx={{
                color: 'white',
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '35x',
                textAlign: 'center',
              }}
            >
              Navigation Bar
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: 'lime.main', color: 'white', fontFamily: 'inherit' }}
              startIcon={<Chat />}
              component={Link}
              to="/chat"
            >
              Chat
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: 'pink.main', color: 'white', fontFamily: 'inherit' }}
              startIcon={<Timeline />}
              onClick={() => handleNavigation('Timeline')}
            >
              Timeline
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: 'yellow.main', color: 'white', fontFamily: 'inherit' }}
              startIcon={<Report />}
              component={Link}
              to="/report"
            >
              Report
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: 'lime.main', color: 'white', fontFamily: 'inherit' }}
              startIcon={<Leaderboard />}
              component={Link}
              to="/leaderboard"
            >
              Leaderboard
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: 'pink.main', color: 'white', fontFamily: 'inherit' }}
              startIcon={<AccountCircle />}
              onClick={() => handleNavigation('Profile')}
            >
              User Profile
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: 'yellow.main', color: 'white', fontFamily: 'inherit' }}
              startIcon={<Logout />}
              onClick={() => handleNavigation('logout')}
            >
              Log out
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>

  );
}

NavBar.propTypes = {
  setPage: PropTypes.func.isRequired,
};

export default NavBar;
