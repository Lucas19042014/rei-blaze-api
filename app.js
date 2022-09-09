require('dotenv').config();
require('express-async-errors');

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')
const sessionRoutes = require('./src/routes/session');
const userRoutes = require('./src/routes/users');
const webhookRoutes = require('./src/routes/webhook');
const errorUtils = require('./src/utils/errorUtils');

const port = process.env.NODE_PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(webhookRoutes);
app.use(sessionRoutes);
app.use(userRoutes);


app.use((error, req, res, next) => {
    errorUtils.responseError(error, res);
    next();
});

app.listen(port, () => {
    console.log(`\n🚀 Server listening port ${port}...`);
})