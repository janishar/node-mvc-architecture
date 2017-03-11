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
 * Created by janisharali on 12/03/17.
 */

const config = require('./../config');
const Utils = require('./../helpers/utils');
const Blog = require('./../models/blog');
const User = require('./../models/user');
const BadRequestResponse = require('./../helpers/response').BadRequestResponse;
const SuccessResponse = require('./../helpers/response').SuccessResponse;
const SuccessResponseWithoutData = require('./../helpers/response').SuccessResponseWithoutData;
const BadRequestError = require('./../helpers/error').BadRequestError;
const express = require('express');
const router = express.Router();
const striptags = require('striptags');

router.post('/',
    (req, res, next) => {

        req.checkBody('title', 'title is empty').notEmpty();
        req.checkBody('text', 'text is empty').notEmpty();

        let validationErrors = req.validationErrors();
        if (validationErrors) {
            return new BadRequestResponse(validationErrors[0].msg).send(res);
        }

        next();
    },
    (req, res, next) => {
        new User().getById(req.userId)
            .then(user => {
                if (user === undefined) {
                    throw new BadRequestError("User is not registered");
                }

                let title = req.body.title;
                let description = req.body.text;

                title = striptags(title);
                description = striptags(description);

                description = Utils.getBlogDescription(description);
                let relBlogUrl = Utils.generateBlogUrl(Utils.removeSpacesWithDashAndLowerCase(title));

                return new Blog(user._id, relBlogUrl, title, description, req.body.text).create()
            })
            .then(blog => {
                return new SuccessResponse("Blog created successfully", {id : blog._id}).send(res);
            })
            .catch(err => next(err));
    });

router.put('/',
    (req, res, next) => {

        req.checkBody('blog_id', 'blog id is empty').notEmpty();

        let validationErrors = req.validationErrors();
        if (validationErrors) {
            return new BadRequestResponse(validationErrors[0].msg).send(res);
        }

        if(req.body.blog_id <= 0){
            return new BadRequestResponse("blog id is invalid").send(res);
        }

        next();
    },
    (req, res, next) => {

        return new Blog().getById(req.body.blog_id)
            .then(blog => {

                if(req.body.title !== undefined){

                    let title = req.body.title;
                    blog._title = striptags(title);

                    blog._blogUrl = Utils.generateBlogUrl(Utils.removeSpacesWithDashAndLowerCase(blog._title));
                }

                if(req.body.text !== undefined){

                    blog._text = req.body.text;

                    let description = req.body.text;
                    description = striptags(description);

                    blog._description = Utils.getBlogDescription(description);
                }

                return blog.updateById();
            })
            .then(blog => {
                return new SuccessResponseWithoutData("Blog saved successfully");
            })
            .catch(err => next(err));
    });

module.exports = router;