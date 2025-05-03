import app from './app.js';

import * as http from 'http';
import ngrok from '@ngrok/ngrok';

import dotenv from 'dotenv';

dotenv.config();

const authtoken_from_env = process.env.NGROK_AUTHTOKEN;

// Create webserver
http
  .createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Congrats you have created an ngrok web server');
  })
  .listen(8080, () => console.log('Node.js web server at 8080 is running...'));

// Get your endpoint online
ngrok
  .connect({addr: 8080, authtoken_from_env: true})
  .then((listener) => console.log(`Ingress established at: ${listener.url()}`));

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
