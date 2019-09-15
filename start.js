/* Enable starting node server without esm parameter.
** Start server by executing 'node start.js' */
require = require("esm")(module /*, options*/);
module.exports = require("./server.js");
