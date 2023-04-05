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
        margin={3}
        sx={{ width: '90%', border: '3px solid #E5E5E5', borderRadius: '10px', backgroundColor: '#0D1B1E' }}
      >
        <Grid item xs={12} alignItems="center" justifyContent="center" spacing={1} container direction="row" sx={{ p: 2, flexGrow: 1 }}>
          <Grid item xs={12} md={12} alignItems="center" justifyContent="center" sx={{ backgroundColor: '#397367', borderRadius: '15px' }}>
            <Typography
              variant="h5"
              marginBottom={1}
              sx={{
                color: 'white',
                fontFamily: 'inherit',
                fontSize: '40x',
                textAlign: 'center',
              }}
            >
              Navigation Bar
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{ bgcolor: 'lime.main', color: 'white', fontFamily: 'inherit', borderRadius: '10px', height: '100%' }}
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
              size="large"
              variant="contained"
              sx={{ bgcolor: 'pink.main', color: 'white', fontFamily: 'inherit', borderRadius: '10px', height: '100%' }}
              startIcon={<Timeline />}
              onClick={() => handleNavigation('Timeline')}
            >
              Timeline
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{ bgcolor: 'yellow.main', color: 'white', fontFamily: 'inherit', borderRadius: '10px', height: '100%' }}
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
              size="large"
              variant="contained"
              sx={{ bgcolor: 'lime.main', color: 'white', fontFamily: 'inherit', borderRadius: '10px', height: '100%' }}
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
              size="large"
              variant="contained"
              sx={{ bgcolor: 'pink.main', color: 'white', fontFamily: 'inherit', borderRadius: '10px', height: '100%' }}
              startIcon={<AccountCircle />}
              onClick={() => handleNavigation('Profile')}
            >
              Your Profile
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <a href="/">
              <Button
                fullWidth
                size="large"
                variant="contained"
                sx={{ bgcolor: 'yellow.main', color: 'white', fontFamily: 'inherit', borderRadius: '10px', height: '100%' }}
                startIcon={<Logout />}
                onClick={() => handleNavigation('logout')}
              >
                Log out
              </Button>
            </a>
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
