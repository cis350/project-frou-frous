export function validateLogin(username, callback) {
  fetch(`http://localhost:8000/user/${username}`)
    .then((res) => res.json()).then((resp) => {
      callback(resp);
    }).catch((err) => {
      callback({ error: err });
    });
}

export function createUser(obj, callback) {
  fetch('http://localhost:8000/user/', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(obj),
  }).then((res) => {
    callback(res);
  }).catch((err) => {
    callback({ error: err });
  });
}
