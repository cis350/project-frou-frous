import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardActions, Grid, Avatar, Button } from '@mui/material';
import styled from '@mui/system/styled';

const LeftItem = styled('div')(({ theme }) => ({
    margin: 6,
    padding: 8,
    border: '2px solid',
    borderColor: '#444d58',
    borderRadius: '12px',
    textAlign: 'right',
    minHeight: 40
  })
);

const RightItem = styled('div')(({ theme }) => ({
    margin: 6,
    padding: 12,
    backgroundColor: '#dedede',
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


    useEffect(() => {
        async function fetchUserData() {
            try {
              const reportResponse = await axios.get(`/user/${props.userId}`); //Need to add this to swaggerHub API
              const username = reportResponse.data.username;
              const skipHistory = reportResponse.data.skipHistory;
              const totalClasses = reportResponse.data.classes;
              setUsername(username);
              setSkipHistory(skipHistory);
              setTotalClasses(totalClasses);
              
              const profilePhotoResponse = await axios.get(`/user/${username}.jpg`); //Need to add this to swaggerHub API
              const profilePhoto = profilePhotoResponse.data.pfp;
              setProfilePhoto(profilePhoto);
              
            } catch (error) {
              console.error(error);
            }
        }
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
                boxShadow: 3
            }}>
            <CardHeader
                avatar = {<Avatar src={profilePhoto} alt={username} 
                            sx={{ 
                                width: 60, 
                                height: 60, 
                                variant: 'circular'
                                }} 
                            />}
                title = {username}
            />
            <CardContent>
                <Card sx={{
                    borderRadius: 2,
                    padding: 0,
                    boxShadow: 0
                }}>
                    <CardHeader title = "Your Weekly Report:" />
                    <CardContent>
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