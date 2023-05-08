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

export async function getPfp() {
  const res = await axios.get('/users');
  return res.data;
}

export function getReport(callback, postId) {
  fetch(`/report/${postId}`)
    .then((res) => res.json()).then((resp) => {
      callback(resp);
    }).catch((err) => {
      callback({ error: err });
    });
}

export async function getUserData(userId) {
  try {
    const response = await fetch(`/user/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      cache: 'default',
    });
    const data = await response.json();
    return data.data[0];
  } catch (error) {
    return { success: false, error };
  }
}

export async function removeFriend(userId, friendId) {
  try {
    const response = await fetch(`/user/removefriend/${userId}/${friendId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      cache: 'default',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error };
  }
}

export async function removeFriendReq(userId, friendId) {
  try {
    const response = await fetch(`/user/removefriendreq/${userId}/${friendId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      cache: 'default',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error };
  }
}

export async function sendFriendRequest(userId, friendId) {
  try {
    const response = await fetch(`/user/sendfriendreq/${userId}/${friendId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      cache: 'default',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error };
  }
}

export async function addFriend(userId, friendId) {
  try {
    const response = await fetch(`/user/addfriend/${userId}/${friendId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      cache: 'default',
    });
    const data = await response.json();
    console.log('addedfriend: ', data);
    return data;
  } catch (error) {
    return { error };
  }
}

// export async function getFriendReports(callback) { // eslint-disable-line
//   fetch('/report')
//     .then((res) => res.json()).then((resp) => {
//       const ids = [];
//       for (let i = 0; i < resp.length; i += 1) {
//         ids.push(resp[i].id);
//       }
//       callback(ids);
//     }).catch((err) => {
//       callback({ error: err });
//     });
// }
export async function getFriendReports(userId) {
  try {
    const response = await fetch(`/user/${userId}/getFriendReports`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      cache: 'default',
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getPersonalReports(userId) {
  try {
    const response = await fetch(`/user/${userId}/getPersonalReports`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      cache: 'default',
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getReportDataLikes(reportId) {
  try {
    const response = await fetch(`/report/${reportId}`, {
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
    const response = await fetch(`/report/${reportId}`, {
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

export async function changePfp(user, pfp) {
  try {
    const response = await fetch('/user/changePfp', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({
        user,
        pfp,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}
export async function getUserHistory(user) {
  try {
    const response = await fetch(`/Reports/lastreporter/${user}`);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getUserHistoryReporter(user) {
  try {
    const response = await fetch(`/Reports/mostreporter/${user}`);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getTotalReportHistory(user) {
  try {
    const response = await fetch(`/Reports/reports/${user}`);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getTotalReportWeek(user) {
  try {
    const response = await fetch(`/Reports/reportsweekly/${user}`);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getTotalClasses(user) {
  try {
    const response = await fetch(`/Schedule/totalclasses/${user}`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    return error;
  }
}
