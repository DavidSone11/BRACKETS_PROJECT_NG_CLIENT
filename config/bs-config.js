" use strict";
module.exports = {
  "port": 8888,
  "files": ["./src/**/*.{html,htm,css,js}"],
   "server": { "baseDir": "./src" },
  "routes": {
    "/node_modules": "node_modules"
  },
  online: true
};