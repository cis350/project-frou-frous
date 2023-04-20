import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Card, CardContent, Grid, Avatar, Typography, Button, ButtonGroup } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import styled from '@mui/system/styled';
import PropTypes from 'prop-types';

import { getUserHistory, getUserData, removeFriendReq, removeFriend, addFriend, sendFriendRequest } from '../api/userPageAPI';

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

function UserCard(props) {
  const [profilePhoto, setProfilePhoto] = useState('');
  const [skipHistory, setSkipHistory] = useState(''); //eslint-disable-line
  const [totalClasses, setTotalClasses] = useState(''); //  eslint-disable-line
  const [friendStatus, setFriendStatus] = useState('none'); //eslint-disable-line
  const [editingMode, setEditingMode] = useState(false);
  const [friendRequest, setFriendRequest] = useState(''); //eslint-disable-line
  const { userId, currentUser } = props;

  const getFriendStatus = async () => {
    if (currentUser === userId) {
      setFriendStatus('currentUser');
      return;
    }

    try {
      const userData = await getUserData(userId);
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
        setProfilePhoto(reportResponse.pfp);
      } catch (error) {
        console.log('error', error); //eslint-disable-line
      }
    }

    fetchUserData();
    getFriendStatus();
    updateFriendReq();
  }, [userId]);

  const backgroundColor = '#9ebd6e';

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
          <Grid item sm={4} md={3}>
            <Avatar
              src={profilePhoto}
              alt={userId}
              sx={{
                width: 60,
                height: 60,
                margin: 'auto',
              }}
            />
          </Grid>
          <Grid item sm={8} md={3}>
            <div
              style={{ textAlign: 'left', marginTop: '5%', color: 'white', fontSize: '1.5em' }}
              contentEditable={friendStatus === 'currentUser' && editingMode}
              suppressContentEditableWarning
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
                  setEditingMode((prevEditingMode) => !prevEditingMode);
                  // Change profile picture
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
                removeFriendReq(userId, currentUser);
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
                sendFriendRequest(userId, currentUser);
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
