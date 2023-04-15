/**
* @jest-environment jsdom
*/

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'; // eslint-disable-line

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

// mock.onGet('/reports').reply(200, {
//   username: 'John',
//   picture: 'https://i1.sndcdn.com/artworks-5fyeRojbMeUUbmbT-qqZ5NQ-t500x500.jpg',
// });

mock.onGet('/users').reply(200, {
  pfp: 'https://s-i.huffpost.com/gen/1224269/images/o-ANGRY-STOCK-PHOTOS-facebook.jpg',
});

mock.onGet('/user/userId').reply(200, {
  username: 'MockUsername',
  pfp: 'https://s-i.huffpost.com/gen/1224269/images/o-ANGRY-STOCK-PHOTOS-facebook.jpg',
  skipHistory: [
    {
      timestamp: 1679326514, // see convertTimestamp in: ChatPeopleComponent.jsx
      class: 'ABC 101',
    },
    {
      timestamp: 1679326514,
      class: 'XYZ 101',
    },
    {
      timestamp: 1679326514,
      class: 'XYZ 101',
    },
    {
      timestamp: 1679326514,
      class: 'ABC 101',
    },
    {
      timestamp: 1679326514,
      class: 'XYZ 101',
    },
  ],
  classes: [
    {
      title: 'ABC 101',
      days: ['Wed', 'Fri'],
      start: 1300,
      end: 1430,
    },
    {
      title: 'XYZ 101',
      days: ['Wed'],
      start: 1500,
      end: 1700,
    },
    {
      title: 'ABC 201',
      days: ['Tue', 'Thu'],
      start: 1300,
      end: 1430,
    },
  ],
});

export async function getPfp() {
  const res = await axios.get('/users');
  return res.data;
}

export function getReport(callback, postId) {
  fetch(`http://localhost:8000/report/${postId}`)
    .then((res) => res.json()).then((resp) => {
      callback(resp);
    }).catch((err) => {
      callback({ error: err });
    });
}

export async function getUserData(userId) {
  try {
    const response = await fetch(`http://localhost:8000/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, error };
  }
}

export async function removeFriend(userId, friendId) {
  try {
    const response = await fetch(`http://localhost:8000/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    const { friends } = data;
    if (friends.includes(friendId)) {
      const index = friends.indexOf(friendId);
      if (index !== -1) {
        friends.splice(index, 1);
      }
    }

    const response2 = await fetch(`http://localhost:8000/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const data2 = await response2.json();
    return data2;
  } catch (error) {
    return { error };
  }
}

export async function changeUsername(userId, newId) {
  try {
    const response = await fetch(`http://localhost:8000/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    data.id = newId;

    await fetch(`http://localhost:8000/user/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await fetch('http://localhost:8000/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return data;
  } catch (error) {
    return { error };
  }
}

export async function removeFriendReq(userId, friendId) {
  try {
    const response = await fetch(`http://localhost:8000/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    const { friendReqs } = data;
    if (friendReqs.includes(friendId)) {
      const index = friendReqs.indexOf(friendId);
      if (index !== -1) {
        friendReqs.splice(index, 1);
      }
    }

    const response2 = await fetch(`http://localhost:8000/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const data2 = await response2.json();
    return data2;
  } catch (error) {
    return { error };
  }
}

export async function sendFriendRequest(userId, friendId) {
  try {
    const response = await fetch(`http://localhost:8000/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!data.friendReqs.includes(friendId)) {
      data.friendReqs.push(friendId);
    }

    const response2 = await fetch(`http://localhost:8000/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const data2 = await response2.json();
    return data2;
  } catch (error) {
    return { error };
  }
}

export async function addFriend(userId, friendId) {
  try {
    const response = await fetch(`http://localhost:8000/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.friendReqs.includes(friendId)) {
      const index = data.friendReqs.indexOf(friendId);
      if (index !== -1) {
        data.friendReqs.splice(index, 1);
      }
    }
    if (!data.friends.includes(friendId)) {
      data.friends.push(friendId);
    }

    const response2 = await fetch(`http://localhost:8000/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const data2 = await response2.json();
    console.log('test', data2);
    return data2;
  } catch (error) {
    return { error };
  }
}

export async function getFriendReports(callback) { // eslint-disable-line
  fetch('http://localhost:8000/report')
    .then((res) => res.json()).then((resp) => {
      const ids = [];
      for (let i = 0; i < resp.length; i += 1) {
        ids.push(resp[i].id);
      }
      callback(ids);
    }).catch((err) => {
      callback({ error: err });
    });
}
export async function getReportDataLikes(reportId) {
  try {
    const response = await fetch(`http://localhost:8000/report/${reportId}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    const report = await response.json();
    return report;
  } catch (error) {
    return error;
  }
}
export async function updateLikes2(reportId, obj) {
  try {
    const response = await fetch(`http://localhost:8000/report/${reportId}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error('Network response was not OK');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getUserHistory(userId) { // eslint-disable-line
  const res = await axios.get('/user/userId');
  return res.data;
}

mock.onGet('/chat').reply(200, {
  friends: [
    {
      message: 'hello hello',
      friend: 'John Doe',
      friendImage: 'https://bestprofilepictures.com/wp-content/uploads/2021/08/Amazing-Profile-Picture-for-Facebook.jpg',
      timestamp: 1679326514,
    },
    {
      message: "Can't believe you skipped",
      friend: 'John Smith',
      friendImage: 'https://keepthetech.com/wp-content/uploads/2020/12/picture-36.jpg.webp',
      timestamp: 1679240114,
    },
    {
      message: 'Heyyyyy',
      friend: 'Frous Frous',
      friendImage: 'https://s-i.huffpost.com/gen/1224269/images/o-ANGRY-STOCK-PHOTOS-facebook.jpg',
      timestamp: 1679229314,
    },
    {
      message: ':)',
      friend: 'Jane',
      friendImage: 'https://th.bing.com/th/id/R.10e03b02b07e1574ee9733956feeebc2?rik=xUUSxf26ZbQZ0w&riu=http%3a%2f%2fwww.newsshare.in%2fwp-content%2fuploads%2f2%2fProfile-WhatsApp-DP-27.jpg&ehk=JuGiHHA%2fSBHcKVqqCJBOSsrT2m44V9%2f%2bTfJzFKtSGF0%3d&risl=&pid=ImgRaw&r=0',
      timestamp: 1679142914,
    },
  ],
});

export const getChatFriends = async () => {
  const res = await axios.get('/chat');
  return res.data;
};
