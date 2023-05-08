/**
 * This module will start the express server
 */

// import the express app
const webapp = require('./server');

const port = process.env.PORT || 5000;
// start the web server
webapp.listen(port, () => {
  console.log('Server running on port', port);
});
