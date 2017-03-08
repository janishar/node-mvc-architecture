/**
 * Created by janisharali on 04/08/16.
 */

const express = require('express');
const crypto = require('crypto');
const router = express.Router();

let Admin = require('../models/admin');
let CustomError = require('../helpers/error').CustomError;
let AuthFailureError = require('../helpers/error').AuthFailureError;
let BadRequestResponse = require('../helpers/response').BadRequestResponse;

router.use((req, res, next) => {

    req.checkHeaders('admin-id', 'Provide Admin Id').notEmpty();
    req.checkHeaders('password', 'Provide Admin Password').notEmpty();

    const validErr = req.validationErrors();

    if (validErr) {
        return new BadRequestResponse(validErr[0].msg, 400).send(res);
    }

    Admin.get(req.headers['admin-id'])
        .then(admin => {
            const encryptedPwd = crypto.createHash('md5').update(req.headers['password']).digest("hex");

            if (admin._password !== encryptedPwd) {
                throw new AuthFailureError("Invalid Password");
            }

            if (admin.status != 1) {
                throw new AuthFailureError("Not Allowed");
            }

            req.admin = admin;

            return next();
        })
        .catch(err => CustomError.handle(err, res))
});

module.exports = router;
