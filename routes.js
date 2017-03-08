/*
 * Copyright (C) 2017 MINDORKS NEXTGEN PRIVATE LIMITED
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://mindorks.com/license/apache-v2
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */

/**
 * Created by janisharali on 07/03/17.
 */
'use strict';

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const fs = require('fs');
const app = express();

if (app.get('env') === 'production') {
    global.debug = new (require('./helpers/debug'))(false);
} else {
    global.debug = new (require('./helpers/debug'))(true);
}

app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'view', 'public','favicon.ico')));
app.use('/view/public', express.static(path.join(__dirname, 'view', 'public')));


let NotFoundError = require('./helpers/error').NotFoundError;

const accessLogStream = fs.createWriteStream(path.join(__dirname, './log/access.log'), {flags: 'a'});
app.use(logger(':method :url :req[header] :res[header] :status :response-time', {"stream": accessLogStream}));

app.use(require('./controllers'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new NotFoundError();
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.sendFile(path.join(__dirname, 'view', 'error.html'));
});

module.exports = app;
