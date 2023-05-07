import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import NavBar from '../Components/NavBar';
import Timeline from '../Components/Timeline'; //eslint-disable-line
import UserCard from '../Components/UserCard';
import ScheduleUser from '../Components/ScheduleUser';

import { getUserData } from '../api/userPageAPI';

function UserPageView() {
  const [page, setPage] = useState('Profile'); // Either Profile or Timeline
  const [search, setSearch] = useState('');
  const { userId } = useParams();
  const schedule = `/app/schedule/${userId}`;

  function navigate() {
    window.location.href = `/app/user/${search}`;
  }
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
        <div id="searchBar" className="input-group rounded-8" style={{ maxHeight: '50px' }}>
          <input id="chatSearch" type="text" className="border-0" style={{ textAlign: 'right' }} onChange={(e) => setSearch(e.target.value)} placeholder="User Search" />
          <button type="button" id="searchIconRight" onClick={() => navigate()}>
            <img alt="search" src="https://th.bing.com/th/id/R.602ef64bc31a62f9ebd523d97fc9f369?rik=JAPpFrIn7Yon0Q&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_194915.png&ehk=PY%2fOHmWzAr5CQnqxsnvx5nnpZAeNl7OJ5%2fHDzvIuHTo%3d&risl=&pid=ImgRaw&r=0" />
          </button>
        </div>
      </center>
      <Grid
        container
        spacing={2}
        sx={{ width: '100vw', minHeight: '100vh', backgroundColor: '#0D1B1E' }}
      >
        <Grid item xs={6} justifyContent="center">
          {!validUser && (
          <div style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}>
            No User Found
          </div>
          )}
          {validUser && page === 'Timeline' && <Timeline userId={userId} page={page} name="Timeline" />}
          {validUser && page === 'Profile' && (
          <div>
            <UserCard userId={userId} currentUser={sessionStorage.getItem('username')} />
            <Timeline userId={userId} page={page} name="Skip History" />
          </div>
          )}
        </Grid>
        <Grid item xs={6} justifyContent="center">
          <NavBar setPage={setPage} />
          {validUser && (
          <div style={{ border: '3px solid #E5E5E5', maxHeight: '70%', borderRadius: '10px', padding: '3px', marginRight: '3px', marginLeft: '3px' }}>
            <a href={schedule}>
              <ScheduleUser user={sessionStorage.getItem('username')} />
            </a>
          </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default UserPageView;
