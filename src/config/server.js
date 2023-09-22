const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { normalizePort } = require('../helpers/utility');
const logger = require('morgan')
const cors = require('cors');
const port = normalizePort(process.env.PORT || '5001');
const app = express();
const server = require('http').createServer(app);
const path = require('path');


//don't show the log when it is test
if (process.env.NODE_ENV !== 'development') {
    app.use(logger('dev'));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//To allow cross-origin requests
app.use(
    cors({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })
);

//Route Prefixes
app.use('/', require('../routes/api'));

app.use('/resources', express.static(path.join(__dirname, 'resources')));

// throw 404 if URL not found
app.all('*', (req, res) =>
    res.status(404).json({ status: false, message: 'page not found' })
);

server.listen(port, () => {
    console.log('Server started on: ', `http://localhost:${port}`);
});

module.exports = server;
