import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import NavBar from '../Components/NavBar';
import Timeline from '../Components/Timeline'; //eslint-disable-line
import UserCard from '../Components/UserCard';
import ScheduleUser from '../Components/ScheduleUser';

function UserPageView() {
  const [page, setPage] = useState('Profile'); // Either Profile or Timeline
  const [search, setSearch] = useState('');

  function navigate() {
    window.location.href = `/user/${search}`;
  }

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
          {page === 'Timeline' && <Timeline userId={12345} page={page} />}
          {page === 'Profile' && <UserCard userId={12345} />}
        </Grid>
        <Grid item xs={6} justifyContent="center">
          <NavBar setPage={setPage} />
          <center>
            <div style={{ border: '3px solid #E5E5E5', maxHeight: '70%', borderRadius: '10px', padding: '3px', marginRight: '3px' }}>
              <a href="/schedule/1234">
                <ScheduleUser />
              </a>
            </div>
          </center>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserPageView;
