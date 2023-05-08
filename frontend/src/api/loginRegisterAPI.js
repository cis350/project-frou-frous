export async function validateLogin(username) {
  const response = await fetch(`/user/${username}`);
  console.log('response', response);
  if (!response.ok) {
    throw new Error('Network response was not OK');
  }

  const result = await response.json();
  console.log('result');
  console.log(result);
  return result;
}

export async function createUser(obj) {
  const response = await fetch('/user/', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(obj),
  });
  if (!response.ok) {
    throw new Error('Network response was not OK');
  }

  const result = await response.json();
  console.log('result');
  console.log(result);
  return result;
}
