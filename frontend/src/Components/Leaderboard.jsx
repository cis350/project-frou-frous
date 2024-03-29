import './leaderboard.css';
import React, { useEffect } from 'react';
import getLeaders from '../api/leaderboardAPI';

export default function LeaderboardComponent() {
  async function setLeaders() {
    let leadersHtml = '';
    const leaders = await getLeaders();
    for (let i = 0; i < leaders.length; i += 1) {
      leadersHtml += `
      <div class='leaderRow' id='leader${i}' onclick="window.location.href='/app/user/${leaders[i].user}'">
        <div class='leaderName'>
          <img alt='leader ${i} pfp' class='circle-pic' src="${leaders[i].img}" />
          <p>${leaders[i].user}</p>
        </div>
        <div id='leader${i}Score'>
          <p>${leaders[i].skippedClasses}</p>
        </div>
      </div>
      `;
    }
    document.getElementById('leaders').innerHTML = leadersHtml;
  }

  useEffect(() => {
    setLeaders();
  }, [1000]);

  return (
    <div id="leaderBoardWrapper">

      <div>
        <center>
          <h1 style={{ fontWeight: 'bold', fontStyle: 'italic', marginTop: '20px' }}>Leaderboard 🏆</h1>
          <h3>Total Number of Skipped Classes</h3>
          <hr style={{ width: '80%' }} />
          <div id="leaders" />
        </center>

      </div>

    </div>

  );
}
