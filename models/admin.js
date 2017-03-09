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
 * Created by janisharali on 06/03/16.
 */
const Model = require('./model');
const QueryMap = require('./../helpers/query').QueryMap;
const AdminError = require('./../helpers/error').AdminError;

class Admin extends Model {

    constructor(id, adminId, password, name, status) {
        super(id, status);
        this._adminId = adminId;
        this._name = name;
        this._password = password;
    }

    copy({id, admin_id, pwd, name, status, created_at, updated_at}) {

        super.copy({id, status, created_at, updated_at});

        this._adminId = admin_id;
        this._password = pwd;
        this._name = name;

        return this;
    }

    getOne(adminId) {
        return super.getOne(new QueryMap().put('admin_id', adminId))
            .catch(err => {
                throw  new AdminError("Admin do not exists", 401)
            });
    };

    get _adminId() {
        return this.admin_id;
    }

    set _adminId(adminId) {
        this.admin_id = adminId;
    }

    get _name() {
        return this.name;
    }

    set _name(name) {
        this.name = name;
    }

    get _password() {
        return this.pwd;
    }

    set _password(password) {
        this.pwd = password;
    }
}

module.exports = Admin;