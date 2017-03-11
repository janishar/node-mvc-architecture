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

"use strict";
const Utils = require('./../helpers/utils');
const JWT = require('./../helpers/jwt');
const config = require('./../config');
const User = require('./../models/user');
const UserAccess = require('./../models/user_access');
const BadRequestResponse = require('./../helpers/response').BadRequestResponse;
const LoginResponse = require('./../helpers/response').LoginResponse;
const AuthFailureError = require('./../helpers/error').AuthFailureError;
const express = require('express');
const router = express.Router();

router.post('/',
    (req, res, next) => {

        req.checkBody('email', 'email is empty').notEmpty();
        req.checkBody('email', 'email is invalid').isBase64();
        req.checkBody('password', 'password is empty').notEmpty();
        req.checkBody('password', 'password is invalid').isBase64();

        let validationErrors = req.validationErrors();
        if (validationErrors) {
            return new BadRequestResponse(validationErrors[0].msg).send(res);
        }

        req.body.email =  Buffer.from(req.body.email, 'base64').toString().toLowerCase();
        req.body.password =  Buffer.from(req.body.password, 'base64').toString();

        req.sanitize('email').trim();
        req.sanitize('password').trim();
        req.checkBody('email', 'email is invalid').isEmail();

        validationErrors = req.validationErrors();
        if (validationErrors) {
            return new BadRequestResponse(validationErrors[0].msg).send(res);
        }

        debug.log(req.body.email, req.body.password);

        next();
    },
    (req, res, next) => {

        let password = Utils.encryptPasswordWithSalt(req.body.password);

        new User().getByEmail(req.body.email)
            .then(user => {

                if(user._password !== password){
                    throw new AuthFailureError("Email/password is wrong");
                }

                req.user = user;

                req.accessTokenKey = Utils.generateTokenKey();

                return new UserAccess(user._id, req.accessTokenKey).update()
            })
            .then(userAccess => {

                return JWT.builder()
                    .payload(
                        parseInt(userAccess._userId),
                        userAccess._accessTokenKey,
                        config.access_token_purpose,
                        config.access_token_validity_days
                    )
                    .build()
                    .encode()
            })
            .then(token => {
                return new LoginResponse("Login success", req.user, token).send(res)
            })
            .catch(err => next(err));
    });

module.exports = router;