import './leaderboard.css';
import React, { useEffect } from 'react';
import getLeaders from '../api/leaderboardAPI';

export default function LeaderboardComponent() {
  function setLeaders(leaders) {
    let leadersHtml = '';
    for (let i = 0; i < leaders.length; i += 1) {
      leadersHtml += `
        <div class='leaderRow' id='leader${i}' >
          <div class=leaderName>
            <img class='circle-pic' src="${leaders[i].img}" />
            <p> ${leaders[i].user} </p>
          </div>
          <div id='leader${i}Score'>
            <p> ${leaders[i].skippedClasses} </p>
          </div>
        </div>
      `;
    }
    document.getElementById('leaders').innerHTML = leadersHtml;
  }

  useEffect(() => {
    console.log('USE EFFECT');
    getLeaders(setLeaders);
  }, 1000);

  return (
    <div id="leaderBoardWrapper">

      <div>
        <center>
          <h1>Leaderboard</h1>
          <h3>Total Number of Skipped Classes</h3>
          <hr style={{ width: '80%' }} />
          <div id="leaders" />
        </center>

      </div>

    </div>

  );
}
