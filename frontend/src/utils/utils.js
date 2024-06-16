const production  = 'https://froufrous-72709a676ac7.herokuapp.com';
const development = 'http://localhost:5000';
export const rootURL = (process.env.NODE_ENV ? production : development);