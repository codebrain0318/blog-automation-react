const https = require('https');
const http = require('http');
const fs = require("fs")

const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();

app.use(cors())

app.use(express.static(path.join(__dirname, 'build')));

app.get("*", (req, res) => {
    return res.sendFile(`${__dirname}/build/index.html`)
})

const options = {
  key: fs.readFileSync(`${__dirname}/cert/privkey.pem`),
  cert: fs.readFileSync(`${__dirname}/cert/cert.pem`)
}

var httpsServer = https.createServer(options, app);
var httpServer = http.createServer(app) ;

var portHttp = 80 ;
var portHttps = 443;

httpsServer.listen(portHttps);
httpServer.listen(portHttp);