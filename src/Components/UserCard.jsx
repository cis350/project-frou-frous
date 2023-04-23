import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Card, CardContent, Grid, Avatar, Typography, Button, ButtonGroup, IconButton } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import styled from '@mui/system/styled';
import PropTypes from 'prop-types';

import { getUserHistory, getUserData, removeFriendReq, removeFriend, addFriend, sendFriendRequest, changePfp } from '../api/userPageAPI';

const LeftItem = styled('div')(() => ({
  margin: 6,
  padding: 8,
  backgroundColor: '#9ebd6e',
  borderRadius: '12px',
  textAlign: 'right',
  minHeight: 40,
}));

const RightItem = styled('div')(() => ({
  margin: 6,
  padding: 12,
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
  const [totalClasses, setTotalClasses] = useState(''); //  eslint-disable-line
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
        const reportResponse = await getUserHistory(userId);
        setSkipHistory(reportResponse.skipHistory);
        setTotalClasses(reportResponse.classes);
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
        border: '3px solid #E5E5E5',
        margin: 'auto',
        marginTop: '20px',
      }}
    >
      <CardContent>
        <Grid container spacing={2} sx={{ margin: 'auto' }}>
          <Grid item sm={3} md={3}>
            <label htmlFor="contained-button-file">
              <IconButton component="span">
                <Avatar
                  src={newPfp ? URL.createObjectURL(newPfp) : profilePhoto}
                  alt={userId}
                  sx={{
                    width: 70,
                    height: 70,
                    cursor: editingMode ? 'pointer' : 'default',
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
          <Grid item sm={9} md={3}>
            <div
              style={{ textAlign: 'left', marginTop: '15%', color: 'white', fontSize: '1.5em' }}
            >
              {userId}
            </div>
          </Grid>
          <Grid item sm={12} md={6}>
            {friendStatus === 'currentUser' && (
            <div>
              <Button
                variant="contained"
                sx={{ backgroundColor, color: 'white', marginTop: '5%', borderRadius: '15px' }}
                onClick={async () => {
                  if (newPfp !== null && editingMode) {
                    const imageBase = await toBase64(newPfp);
                    console.log(imageBase, 'here');
                    console.log(changePfp(currentUser, imageBase));
                  }
                  setEditingMode((prevEditingMode) => !prevEditingMode);
                }}
              >
                {editingMode ? 'Save' : 'Edit Profile'}
              </Button>
              {friendRequest !== '' && (
              <ButtonGroup variant="contained" data-testid="fr" size="small" aria-label="friendRequest">
                <Button
                  onClick={async () => {
                    await removeFriendReq(userId, friendRequest);
                    updateFriendReq();
                  }}
                  style={{ backgroundColor: '#904C77', color: 'white' }}
                >
                  <CloseIcon />
                </Button>
                <Button
                  onClick={async () => {
                    await addFriend(userId, friendRequest);
                    updateFriendReq();
                  }}
                  style={{ backgroundColor: '#397367', color: 'white' }}
                >
                  <CheckIcon />
                </Button>
                <div style={{ color: 'white' }}>
                  Friend Request from:
                  {' '}
                  {friendRequest}
                </div>
              </ButtonGroup>
              )}
            </div>
            )}

            {friendStatus === 'friends' && (
            <Button
              variant="contained"
              sx={{ backgroundColor, color: 'white', marginTop: '5%', borderRadius: '15px' }}
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
              sx={{ backgroundColor: '#97B96B', color: 'white', marginTop: '5%', borderRadius: '15px' }}
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
              sx={{ backgroundColor, color: 'white', marginTop: '5%', borderRadius: '15px' }}
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
        <Grid container spacing={2} sx={{ margin: 'auto' }}>
          <Grid item>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '12x',
                textAlign: 'center',
              }}
            >
              Your Weekly Report:
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <LeftItem style={{ textAlign: 'center' }}>
              Total Classes Skipped:
            </LeftItem>
          </Grid>
          <Grid item xs={6}>
            <RightItem>5</RightItem>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <LeftItem style={{ textAlign: 'center' }}> Percent Classes Skipped: </LeftItem>
          </Grid>
          <Grid item xs={6}>
            <RightItem>40%</RightItem>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <LeftItem style={{ textAlign: 'center' }}> Class Most Often Skipped: </LeftItem>
          </Grid>
          <Grid item xs={6}>
            <RightItem>XYZ 101</RightItem>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <LeftItem style={{ textAlign: 'center' }}> Class Least Often Skipped: </LeftItem>
          </Grid>
          <Grid item xs={6}>
            <RightItem> ABC 201</RightItem>
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
