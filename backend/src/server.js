const express = require('express')
const cookieParser = require("cookie-parser");
const {fromEnv} = require('./utils')
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const {logger} = require('./utils')
const routes = require('./routes')
const {clerkMiddleware }= require('@clerk/express')

 const cors = require('cors')
const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = fromEnv('PORT') || 3002;
app.use(cors())
app.use(clerkMiddleware())
app.use(express.json())
app.use(cookieParser())
app.use(routes)

app.get('/', (req, res) => {
  res.send('Hello World');
})

io.on('connection', (socket) => {
  console.log('A user connected');
});

server.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});