/**
 * Created by janisharali on 06/03/16.
 */
const Query = require('./../helpers/query');
const Promise = require('bluebird');
const Model = require('./model');
const QueryMap = require('./../helpers/query').QueryMap;

class UserAccess extends Model {

    constructor(userId, accessTokenKey) {
        super('user_access');
        this._userId = userId;
        this._accessTokenKey = accessTokenKey;
    }

    copy({id, user_id, access_token_key, status, updated_at, created_at}) {

        super.copy({id, status, created_at, updated_at});

        this._userId = user_id;
        this._accessTokenKey = access_token_key;

        return this;
    }

    getFromUser(userId) {
        return super.getOne(new QueryMap().put('user_id', userId));
    }

    getFromTokenKet(accessTokenKey) {
        return super.getOne(new QueryMap().put('access_token_key', accessTokenKey));
    }

    update() {
        return Query.transaction(connection => {

            return super.updateInTx(connection, new QueryMap().put('user_id', this._userId))
                .then(useraccess => {
                    return Promise.resolve(this)
                })
        });
    }

    static removeKeys(userId) {
        let userAccess = new UserAccess(userId, null);
        return userAccess.update(new QueryMap().put('user_id', userId));
    }

    updateInTx(connection) {
        return super.updateInTx(connection ,new QueryMap().put('user_id', this._userId));
    }

    get _userId() {
        return this.user_id;
    }

    set _userId(userId) {
        this.user_id = userId;
    }

    get _accessTokenKey() {
        return this.access_token_key;
    }

    set _accessTokenKey(accessTokenKey) {
        this.access_token_key = accessTokenKey;
    }
}

module.exports = UserAccess;