/**
 * Created by janisharali on 06/03/16.
 */
const Model = require('./model');
const QueryMap = require('./../helpers/query').QueryMap;

class Blog extends Model {

    constructor(userId, blogUrl, title, description, text, imgUrl) {
        super('blogs');
        this._userId = userId;
        this._blogUrl = blogUrl;
        this._title = title;
        this._description = description;
        this._text = text;
        this._imgUrl = imgUrl;
    }

    copy({id, user_id, blog_url, title, description, text, img_url, status,
        created_by, updated_by, created_at, updated_at}) {

        super.copy({id, status, created_at, updated_at});

        this._userId = user_id;
        this._blogUrl = blog_url;
        this._title = title;
        this._description = description;
        this._text = text;
        this._imgUrl = img_url;

        return this;
    }

    getFromUser(userId) {
        return super.getAll(new QueryMap().put('user_id', userId));
    }

    getByUrl(url) {
        return super.getOne(new QueryMap().put('blog_url', url));
    }

    create() {
        this._createdBy = this._userId;
        this._updatedBy = this._userId;
        return super.create();
    }


    updateById() {
        this._updatedBy = this._userId;
        return super.updateById();
    }

    get _userId() {
        return this.user_id;
    }

    set _userId(userId) {
        this.user_id = userId;
    }

    get _blogUrl() {
        return this.blog_url;
    }

    set _blogUrl(blogUrl) {
        this.blog_url = blogUrl;
    }

    get _title() {
        return this.title;
    }

    set _title(title) {
        this.title = title;
    }

    get _description() {
        return this.description;
    }

    set _description(description) {
        this.description = description;
    }

    get _text() {
        return this.text;
    }

    set _text(text) {
        this.text = text;
    }

    get _imgUrl() {
        return this.img_url;
    }

    set _imgUrl(imgUrl) {
        this.img_url = imgUrl;
    }

    get _createdBy() {
        return this.created_by;
    }

    set _createdBy(createdBy) {
        this.created_by = createdBy;
    }

    get _updatedBy() {
        return this.updated_by;
    }

    set _updatedBy(updatedBy) {
        this.updated_by = updatedBy;
    }

}

module.exports = Blog;