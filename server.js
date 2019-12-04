const express = require('express'); // importing a CommonJS module

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

function gateKeep(req,res,next) {
  if(req.headers.password==="mellon") {
    next();
  }
  else {
    res.status(401).json("You cannot continue");
  }
}


server.use(express.json());
server.use(gateKeep);

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});


module.exports = server;
