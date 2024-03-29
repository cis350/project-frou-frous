import './chat.css';
import React, { useState, useEffect } from 'react';
import { getChatFriends } from '../api/chatAPI';

function convertTimestamp(timestamp) {
  if (timestamp < 0) {
    return '';
  }
  const d = new Date(timestamp);
  const yyyy = d.getFullYear();
  const mm = ('0'.concat((d.getMonth() + 1))).slice(-2);
  const dd = ('0'.concat(d.getDate())).slice(-2);

  const time = yyyy.toString().concat('-', mm.toString(), '-', dd.toString());
  return time;
}

export default function ChatPeopleComponent() {
  const curUser = sessionStorage.getItem('username');
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
      people = people.concat(
        `<a class='chatA' href = '/app/chat/user/${response[i].friend}'>
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
    const getFriends = async () => {
      try {
        const res = await getChatFriends(curUser);
        setFriends(res.friends);
        // setFriends(response.friends);
        filterFriends(search, res.friends);
      } catch (err) {
        console.error('error', err.message);
      }
    };

    getFriends();
  }, []);
  return (
    <div id="peopleList">
      <div id="searchBarWrapper">
        <div id="searchBar" className="input-group rounded-8 flex items-center justify-center" style={{ maxHeight: '70px', marginTop: '1%', alignItems: 'center', paddingRight: '4px', paddingBottom: '2px' }}>
        <input
          id="chatSearch"
          value={search}
          onChange={(e) => searchFriends(e.target.value)}
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
          placeholder="Search Friends"
        />
          <div id="searchIcon" style={{ border: 'none', background: 'none', cursor: 'pointer', marginLeft: '0px'}}>
            <img alt="search" src="https://th.bing.com/th/id/R.602ef64bc31a62f9ebd523d97fc9f369?rik=JAPpFrIn7Yon0Q&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_194915.png&ehk=PY%2fOHmWzAr5CQnqxsnvx5nnpZAeNl7OJ5%2fHDzvIuHTo%3d&risl=&pid=ImgRaw&r=0" />
          </div>
        </div>
      </div>
      <br />

      <div id="peopleContainers" />
    </div>
  );
}
