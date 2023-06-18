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
        justifyContent="center"
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
            transform: 'scale(1.005)',
          },
        }}
      >
        <Grid item xs={12} alignItems="center" justifyContent="center" spacing={1} container direction="row" sx={{ p: 2, flexGrow: 1, }}>
          <Grid item xs={12} md={12} >
            <Typography
              variant="h5"
              padding="8px"
              sx={{
                color: 'white',
                fontFamily: 'inherit',
                fontSize: '30x',
                textAlign: 'center',
                fontWeight: 'bold',
                fontStyle: 'italic',
                backgroundColor: '#397367',
                borderRadius: '16px',
              }}
            >
              Navigation Bar
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} >
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{
                bgcolor: 'lime.main',
                color: 'white',
                fontFamily: 'inherit',
                borderRadius: '10px',
                height: '100%',
                '&:hover': {
                  bgcolor: 'lime.dark',
                  color: 'white',
                },
                '&:active': {
                  transform: 'scale(0.98)', 
                },
              }}
              startIcon={<Chat />}
              component={Link}
              to="/app/chat"
            >
              Chat
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{
                bgcolor: 'pink.main',
                color: 'white',
                fontFamily: 'inherit',
                borderRadius: '10px',
                height: '100%',
                '&:hover': {
                  bgcolor: 'pink.dark',
                  color: 'white',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
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
              sx={{
                bgcolor: 'yellow.main',
                color: 'white',
                fontFamily: 'inherit',
                borderRadius: '10px',
                height: '100%',
                '&:hover': {
                  bgcolor: 'yellow.dark',
                  color: 'white',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
              startIcon={<Report />}
              component={Link}
              to="/app/report"
            >
              Report
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{
                bgcolor: 'lime.main',
                color: 'white',
                fontFamily: 'inherit',
                borderRadius: '10px',
                height: '100%',
                '&:hover': {
                  bgcolor: 'lime.dark',
                  color: 'white',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
              startIcon={<Leaderboard />}
              component={Link}
              to="/app/leaderboard"
            >
              Leaderboard
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{
                bgcolor: 'pink.main',
                color: 'white',
                fontFamily: 'inherit',
                borderRadius: '10px',
                height: '100%',
                '&:hover': {
                  bgcolor: 'pink.dark',
                  color: 'white',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
              startIcon={<AccountCircle />}
              component={Link}
              to={`/app/user/${sessionStorage.getItem('username')}`}
              onClick={() => handleNavigation('Profile')}
            >
              Profile
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <a href="/">
              <Button
                fullWidth
                size="large"
                variant="contained"
                sx={{
                  bgcolor: 'yellow.main',
                  color: 'white',
                  fontFamily: 'inherit',
                  borderRadius: '10px',
                  height: '100%',
                  '&:hover': {
                    bgcolor: 'yellow.dark',
                    color: 'white',
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                  },
                }}
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
