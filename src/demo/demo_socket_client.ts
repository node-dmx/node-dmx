const port = 17809;
const io = require('socket.io-client');
const client = io.connect(`http://localhost:${port}`);

client.on('update', (msg: any) => console.info(msg));
