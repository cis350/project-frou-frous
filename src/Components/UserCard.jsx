import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { Card, CardContent, CardHeader, CardActions, Grid, Avatar, Button, Typography } from '@mui/material';
import styled from '@mui/system/styled';

const LeftItem = styled('div')(({ theme }) => ({
    margin: 6,
    padding: 8,
    backgroundColor: '#9ebd6e',
    borderRadius: '12px',
    textAlign: 'right',
    minHeight: 40,
  })
);

const RightItem = styled('div')(({ theme }) => ({
    margin: 6,
    padding: 12,
    backgroundColor: '#0d1b1e',
    color: 'white',
    textAlign: 'left',
    borderRadius: '12px',
    fontSize: 26,
    minHeight: 34
  })
);

function UserCard(props) {
    const [username, setUsername] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const [skipHistory, setSkipHistory] = useState(''); // need to extract stats from skip history
    const [totalClasses, setTotalClasses] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
              const reportResponse = await getUserHistory(`/user/${props.userId}`); //Need to add this to swaggerHub API
              const username = reportResponse.data.username;
              const skipHistory = reportResponse.data.skipHistory;
              const totalClasses = reportResponse.data.classes;
              const profilePhoto = reportResponse.data.pfp;
              setUsername(username);
              setSkipHistory(skipHistory);
              setTotalClasses(totalClasses);
              setProfilePhoto(profilePhoto);

              console.log(reportResponse.data);
            } catch (error) {
              setError('No User was Found');
              console.log(error.message);
            }
        }

        fetchUserData();
    }, [props.userId])

    return (
        <Card variant="outlined" 
            sx={{ 
                borderRadius: 7,
                width: 1/2,
                minWidth: 300,
                minHeight: 400,
                margin: 5,
                padding: 2,
                boxShadow: 0,
                backgroundColor: '#0d1b1e',
                border: '2px solid',
                borderColor: 'white'
            }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Avatar src={profilePhoto} alt={username} 
                        sx={{ 
                            width: 60, 
                            height: 60, 
                            variant: 'circular'
                        }} 
                    />
                </Grid>
                <Grid item xs = {8}>
                    <Typography
                      variant="title"
                      sx={{
                        color: 'white',
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: '35x',
                        textAlign: 'left',
                      }}
                    >
                      {username}
                    </Typography>
                </Grid>
            </Grid>
            <CardContent>
                <Card sx={{
                    borderRadius: 2,
                    padding: 0,
                    boxShadow: 0,
                    backgroundColor: '#0d1b1e'
                }}>
                    <CardContent>
                        <Grid container spacing={2}>
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
                                <LeftItem> Total Classes Skipped: </LeftItem>
                            </Grid>
                            <Grid item xs={6}>
                                <RightItem>5</RightItem>
                            </Grid>
                        </Grid>
                        
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <LeftItem> Percent Classes Skipped: </LeftItem>
                            </Grid>
                            <Grid item xs={6}>
                                <RightItem>40%</RightItem>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <LeftItem> Class Most Often Skipped: </LeftItem>
                            </Grid>
                            <Grid item xs={6}>
                                <RightItem>XYZ 101</RightItem>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <LeftItem> Class Least Often Skipped: </LeftItem>
                            </Grid>
                            <Grid item xs={6}>
                                <RightItem> ABC 201</RightItem>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}

export default UserCard;