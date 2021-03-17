const exec = require("child_process").exec;
exec("cd client/entertainmeclient && npm start");
exec("cd server/orchestrator && nodemon app.js");
exec("cd server/services/movies && nodemon app.js");
exec("cd server/services/tvseries && nodemon app.js");
