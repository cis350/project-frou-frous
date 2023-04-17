export async function validateLogin(username) {
  const response = await fetch(`http://localhost:5000/user/${username}`);
  if (!response.ok) {
    throw new Error('Network response was not OK');
  }

  const result = await response.json();
  return result;
}
export async function createUser(obj) {
  const response = await fetch('http://localhost:5000/user/', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(obj),
  });
  if (!response.ok) {
    throw new Error('Network response was not OK');
  }

  const result = await response.json();
  return result;
}
