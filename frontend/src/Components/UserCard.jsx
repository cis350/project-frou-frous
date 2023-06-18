import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Card, CardContent, Grid, Avatar, Typography, Button, ButtonGroup, IconButton } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import styled from '@mui/system/styled';
import PropTypes from 'prop-types';

// import { getTotalSkippedClasses } from 'backend/model/reportsDB';
import { getUserData, removeFriendReq, removeFriend, addFriend, sendFriendRequest, changePfp,
  getUserHistory, getUserHistoryReporter, getTotalReportHistory, getTotalClasses, getTotalReportWeek } from '../api/userPageAPI';

const LeftItem = styled('div')(() => ({
  margin: 6,
  padding: 6,
  backgroundColor: '#9ebd6e',
  borderRadius: '12px',
  textAlign: 'right',
  minHeight: 40,
}));

const RightItem = styled('div')(() => ({
  margin: 6,
  backgroundColor: '#0d1b1e',
  color: 'white',
  textAlign: 'left',
  borderRadius: '12px',
  fontSize: 26,
  minHeight: 34,
}));

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
});

function UserCard(props) {
  const [profilePhoto, setProfilePhoto] = useState('');
  const [skipHistory, setSkipHistory] = useState(''); //eslint-disable-line
  const [frequentReporter, setFrequentReporter] = useState(''); //  eslint-disable-line
  const [totalReports, setTotalReports] = useState('');
  const [totalReportsWeek, setTotalReportsWeek] = useState('');
  const [totalReportsPercent, setTotalReportsPercent] = useState(''); //eslint-disable-line
  const [friendStatus, setFriendStatus] = useState('none');
  const [editingMode, setEditingMode] = useState(false);
  const [friendRequest, setFriendRequest] = useState('');
  const [newPfp, setNewPfp] = useState(null); //eslint-disable-line
  const { userId, currentUser } = props;
  const backgroundColor = '#9ebd6e';
  const classes = useStyles();

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const getUserInfo = async () => {
    const userData = await getUserData(userId);
    setProfilePhoto(userData.pfp);

    if (currentUser === userId) {
      setFriendStatus('currentUser');
      return;
    }

    try { // Setting friend status
      const friendData = userData.friends;
      const friendReqData = userData.friendReqs;
      if (friendData.includes(currentUser)) {
        setFriendStatus('friends');
      } else if (friendReqData.includes(currentUser)) {
        setFriendStatus('requested');
      } else {
        setFriendStatus('none');
      }
    } catch (error) {
      console.log('error', error); //eslint-disable-line    
    }
  };

  const updateFriendReq = async () => {
    try {
      const userData = await getUserData(userId);
      const { friendReqs } = userData;
      if (friendReqs.length > 0) {
        setFriendRequest(friendReqs[0]);
      } else {
        setFriendRequest('');
      }
    } catch (error) {
      console.log('error', error); //eslint-disable-line
    }
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const skipHistoryResponse = await getUserHistory(userId);
        const frequentReporterResponse = await getUserHistoryReporter(userId);
        const totalSkips = await getTotalReportHistory(userId);
        const numClasses = await getTotalClasses(userId);
        const totalSkipsWeek = await getTotalReportWeek(userId);
        setTotalReportsPercent(typeof numClasses === 'number' ? Math.round((totalSkipsWeek / numClasses) * 100) : 'Unknown');

        if (!(skipHistoryResponse instanceof Error)) {
          setSkipHistory(skipHistoryResponse);
        }
        if (!(totalSkipsWeek instanceof Error)) {
          setTotalReportsWeek(totalSkipsWeek);
        }
        if (!(frequentReporterResponse instanceof Error)) {
          setFrequentReporter(frequentReporterResponse);
        }
        if (!(totalSkips instanceof Error)) {
          setTotalReports(totalSkips);
        }
      } catch (error) {
        console.log('error', error); //eslint-disable-line
      }
    }

    fetchUserData();
    getUserInfo();
    updateFriendReq();
  }, [userId]);

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: '10px',
        width: '80%',
        backgroundColor: '#0d1b1e',
        border: '4px solid #E5E5E5',
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '10px',
        boxShadow: '0px 0px 0px rgba(255, 255, 255, 0.3)',
        transition: 'box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '3px 3px 3px rgba(255, 255, 255, 0.3)', 
          transform: 'scale(1.005)',
        },
      }}
    >
      <CardContent style={{ justifyContent: 'center' }}>
        <Grid container spacing={1} sx={{ margin: '8px' }}>
          <Grid item xs={3} sm={2} style={{ padding: '8px', margin: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <label htmlFor="contained-button-file">
              <IconButton component="span" style={{ outline: '2px solid white', borderRadius: '50%', padding: '4px', transition: 'transform 0.3s ease-in-out' }}>
                <Avatar
                  src={newPfp ? URL.createObjectURL(newPfp) : profilePhoto}
                  alt={userId}
                  sx={{
                    width: 80,
                    height: 80,
                    cursor: editingMode ? 'pointer' : 'default',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
              </IconButton>
              {editingMode && (
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  onChange={(event) => {
                    setNewPfp(event.target.files[0]);
                  }}
                />
              )}
            </label>
          </Grid>
          <Grid item xs={3} sm={4} style={{ padding: '8px', margin: '8px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <div style={{ textAlign: 'left', color: 'white', fontSize: '2em', fontWeight: 'bold' }}>
              {userId}
            </div>
          </Grid>

          <Grid item xs={4} sm={4} style={{ padding: '8px', margin: '8px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            {friendStatus === 'currentUser' && (
            <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor,
                  color: 'white',
                  marginTop: '5%',
                  borderRadius: '15px',
                  transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: '#397367',
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                  },
                }}
                onClick={async () => {
                  if (newPfp !== null && editingMode) {
                    const imageBase = await toBase64(newPfp);
                    changePfp(currentUser, imageBase);
                  }
                  setEditingMode((prevEditingMode) => !prevEditingMode);
                }}
              >
                {editingMode ? 'Save' : 'Edit Picture'}
              </Button>
              {friendRequest !== '' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ButtonGroup variant="contained" data-testid="fr" size="small" aria-label="friendRequest" sx={{ margin: '8px', marginBottom: '0px' }}>
                  <Button
                    onClick={async () => {
                      await removeFriendReq(userId, friendRequest);
                      updateFriendReq();
                    }}
                    style={{
                      backgroundColor: '#904C77',
                      color: 'white',
                      '&:active': {
                        transform: 'scale(0.98)',
                      },
                    }}
                  >
                    <CloseIcon />
                  </Button>
                  <Button
                    onClick={async () => {
                      await addFriend(userId, friendRequest);
                      updateFriendReq();
                    }}
                    style={{
                      backgroundColor: '#397367',
                      color: 'white',
                      '&:active': {
                        transform: 'scale(0.98)',
                      },
                    }}
                  >
                    <CheckIcon />
                  </Button>
                </ButtonGroup>
                <div style={{ color: 'white', paddingTop: '0px', marginTop: '0px' }}>
                  Friend Request: {friendRequest}
                </div>
              </div>            
              )}
            </div>
            )}

            {friendStatus === 'friends' && (
            <Button
              variant="contained"
              sx={{
                backgroundColor,
                color: 'white',
                marginTop: '5%',
                borderRadius: '15px',
                transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#397367',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
              onClick={() => {
                removeFriend(userId, currentUser);
                setFriendStatus('none');
              }}
            >
              Remove Friend
            </Button>
            )}

            {friendStatus === 'requested' && (
            <Button
              variant="contained"
              sx={{
                backgroundColor,
                color: 'white',
                marginTop: '5%',
                borderRadius: '15px',
                transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#397367',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
              onClick={() => {
                removeFriendReq(currentUser, userId);
                setFriendStatus('none');
              }}
            >
              Requested
            </Button>
            )}
            {friendStatus === 'none' && (
            <Button
              variant="contained"
              sx={{
                backgroundColor,
                color: 'white',
                marginTop: '5%',
                borderRadius: '15px',
                transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#397367',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
              onClick={() => {
                sendFriendRequest(currentUser, userId);
                setFriendStatus('requested');
              }}
            >
              Add Friend
            </Button>
            )}

          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ padding: 0, margin: 0}}>
          <Grid item style={{ paddingTop: 0, marginTop: 0}}>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '12x',
                textAlign: 'center',
                fontWeight: '600',
                fontStyle: 'italic',
                padding: '0px',
              }}
            >
              Your Weekly Report:
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={8} >
            <LeftItem style={{ textAlign: 'center' }}>
              Last Reporter:
            </LeftItem>
          </Grid>
          <Grid item xs={4} >
            <RightItem>
              {skipHistory || 'No Reports Yet'}
            </RightItem>
          </Grid>
        </Grid>


        <Grid container spacing={2}>
          <Grid item xs={8}>
            <LeftItem style={{ textAlign: 'center' }}> Total Reports Overall: </LeftItem>
          </Grid>
          <Grid item xs={4}>
            <RightItem>
              {totalReports || 0}
            </RightItem>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <LeftItem style={{ textAlign: 'center' }}> Total Reports This Week: </LeftItem>
          </Grid>
          <Grid item xs={4}>
            <RightItem>
              {totalReportsWeek || 0}
            </RightItem>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <LeftItem style={{ textAlign: 'center' }}> Percentage Skipped This Week: </LeftItem>
          </Grid>
          <Grid item xs={4}>
            <RightItem>
              {totalReportsPercent || 0}
              %
            </RightItem>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <LeftItem style={{ textAlign: 'center' }}> Most Frequent Reporter: </LeftItem>
          </Grid>
          <Grid item xs={4}>
            <RightItem>
              {frequentReporter || 'Unknown'}
            </RightItem>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  );
}

UserCard.propTypes = {
  userId: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default UserCard;
