import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import NavBar from '../Components/NavBar';
import Timeline from '../Components/Timeline'; 
import UserCard from '../Components/UserCard';
import ScheduleUser from '../Components/ScheduleUser';


import { getUserData } from '../api/userPageAPI';

function UserPageView() {
  const [page, setPage] = useState('Profile'); // Either Profile or Timeline
  const [search, setSearch] = useState('notfound');

  function navigate() {
    window.location.href = `/app/user/${search}`;
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate();
    }
  };

  const { userId } = useParams();
  const [validUser, setValidUser] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await getUserData(userId);
        if (!data.firstName) {
          setValidUser(false);
        }
      } catch (error) {
        console.log(error); //eslint-disable-line
      }
    }
    fetchUserData();
  }, [userId]);

  return (
    <div style={{ backgroundColor: '#0D1B1E' }}>
      <center>
        <div id="searchBar" className="input-group rounded-8 flex items-center justify-center" style={{ maxHeight: '70px', marginTop: '1%', alignItems: 'center',  paddingRight: '4px', paddingBottom: '2px' }}>
          <input
            id="chatSearch"
            type="text"
            className="border-0"
            style={{
              marginLeft: '10px',
              marginRight: '10px',
              textAlign: 'left',
              outline: 'none',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="User Search"
          />
          <button type="submit" id="searchIconRight" onClick={navigate} style={{ border: 'none', background: 'none', cursor: 'pointer', marginLeft: '0px'}}>
            <img alt="search" src="https://th.bing.com/th/id/R.602ef64bc31a62f9ebd523d97fc9f369?rik=JAPpFrIn7Yon0Q&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_194915.png&ehk=PY%2fOHmWzAr5CQnqxsnvx5nnpZAeNl7OJ5%2fHDzvIuHTo%3d&risl=&pid=ImgRaw&r=0" />
          </button>
        </div>
      </center>
      <Grid
        container
        spacing={2}
        sx={{ width: '100vw', minHeight: '100vh', backgroundColor: '#0D1B1E' }}
      >
        <Grid item xs={6} style={{ padding: 0, paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
          {!validUser && (
          <div style={{ textAlign: 'left', marginTop: '20px', color: 'white' }}>
            No User Found
          </div>
          )}
          {validUser && page === 'Timeline' && (
          <div style={{ width: '85%', padding: '8px', paddingTop: '0px' }}>
            <Timeline userId={userId} page={page} name="Your Timeline" personal='False' />
          </div>
          )}
          {validUser && page === 'Profile' && (
          <div style={{ width: '85%', padding: '24px', paddingTop: '0px'}}>
            <UserCard userId={userId} currentUser={sessionStorage.getItem('username')} />
            <Timeline userId={userId} page={page} name="Skip Activity" personal='True' />
          </div>
          )}
        </Grid>
        <Grid item xs={6} style={{ padding: 0, paddingTop: '16px', display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{ width: '85%', padding: '24px', paddingTop: '0px'}}>
            <NavBar setPage={setPage} />
            {validUser && (
            <Paper sx={{
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
              <a href="/app/schedule/1234" style={{ width: '100%' }}>
                <ScheduleUser user={sessionStorage.getItem('username')} />
              </a>
            </Paper>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserPageView;
