import './chat.css';
import React, { useState, useEffect } from 'react';
import { getChatFriends } from '../api/chatAPI';

function convertTimestamp(timestamp) {
  const d = new Date(timestamp * 1000);
  const yyyy = d.getFullYear();
  const mm = ('0'.concat((d.getMonth() + 1))).slice(-2);
  const dd = ('0'.concat(d.getDate())).slice(-2);

  // ie: 2014-03-24, 3:00 PM
  // ['-', mm.toString(), '-', dd.toString(), ', ', h.toString(), ':', min.toString(), ' ', ampm]
  const time = yyyy.toString().concat('-', mm.toString(), '-', dd.toString());
  return time;
}

export default function ChatPeopleComponent() {
  // add a state to the component
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState([]);

  let people = '';

  function filterFriends(searchString, res) {
    let response = [];
    if (searchString.trim() !== '') {
      response = res.filter((x) => x.friend.startsWith(searchString));
    } else {
      response = res;
    }
    for (let i = 0; i < response.length; i += 1) {
      // people.push(<h2>{response.friends[i].message}</h2>);
      people = people.concat(
        `<a class='chatA' href = '/chat/user/${response[i].friend}'>
          <div class="person">
            <img alt="friendimg" class="circle-pic" src=${response[i].friendImage} />
            <div class="personInfo">
              <div class="nameTime">
                <h3>${response[i].friend}</h3>
                <p>${convertTimestamp(response[i].timestamp)}</p>
              </div>
              <p class="lastMessage">${response[i].message}</p>
            </div>
          </div>
        </a>`,
      );
    }
    document.getElementById('peopleContainers').innerHTML = people;
    people = '';
  }

  function searchFriends(searchString) {
    setSearch(searchString);
    filterFriends(searchString, friends);
  }

  useEffect(() => {
    // Fetches data from the openweathermap API and updates the DOM
    console.log('USING EFFECT');

    const getFriends = async () => {
      try {
        const res = await getChatFriends();
        setFriends(res.friends);
        // setFriends(response.friends);
        filterFriends(search, res.friends);
      } catch (err) {
        console.error('error', err.message);
      }
    };

    getFriends();
  }, []);
  console.log('PEOPLE', people);
  return (
    <div id="peopleList">
      <div id="searchBarWrapper">
        <div id="searchBar" className="input-group rounded-8">
          <div id="searchIcon">
            <p style={{ color: 'black' }} className="bi bi-search" />
          </div>
          <input id="chatSearch" value={search} onChange={(e) => searchFriends(e.target.value)} type="text" className="border-0" style={{ textAlign: 'right' }} placeholder="People Search" />
        </div>
      </div>
      <br />

      <div id="peopleContainers" />
    </div>
  );
}
