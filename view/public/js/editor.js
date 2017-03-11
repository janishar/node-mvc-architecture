$(document).ready(function () {
    var editor = new MediumEditor('.editable', {
        // buttonLabels: 'fontawesome',
        toolbar: {
            buttons: [
                'bold',
                'italic',
                'underline',
                'anchor',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'quote',
                'strikethrough',
                'subscript',
                'superscript',
                'anchor',
                'image',//this simply converts selected text to an image tag
                'quote',
                'pre',
                'orderedlist',
                'unorderedlist',
                'indent',//moves the selected text up one level
                'outdent',//moves the selected text down one level
                'justifyLeft',
                'removeFormat',//clears inline style formatting, preserves blocks
                'html'//parses selected html and converts into actual html elements
            ]
        }
    });

    //editor.subscribe('editableInput', function (event, editable) {
    //    // Do some work
    //    // console.log(event);
    //    // console.log(editable);
    //
    //    // It gives the json representation of the Created HTMLs
    //    console.log(editor.serialize());
    //});

    $('#save_button').click(function () {

        blogData = editor.serialize();

        if (blogData !== null && !isSaving) {

            isSaving = true;

            var title = blogData['element-0'].value;
            var text = blogData['element-1'].value;
            blogData = null;

            if (blogId === null) {
                createBlog(title, text)
            }else{
                updateBlog(blogId, title, text)
            }
        }
    });
});

var isSaving = false;
var blogData = null;
var blogId = null;

function createBlog(title, text) {

    $.ajax({
        url: "/user/blog",
        type: "POST",
        data: {
            title: title,
            text: text
        },
        cache: false,
        success: function (response) {
            if (response.status_code == 'success'
                && response.data !== undefined
                && response.data.id !== undefined) {
                blogId = response.data.id;
            }

            isSaving = false;
            checkAndReSave();
        },
        error: function (err, exception) {
            handleApiErr(err);
            isSaving = false;
        }
    });
}

function checkAndReSave(){
    if (!isSaving && blogData !== null) {

        var title = blogData['element-0'].value;
        var text = blogData['element-1'].value;
        blogData = null;

        updateBlog(blogId, title, text)
    }
}

function updateBlog(blogId, title, text) {

    $.ajax({
        url: "/user/blog",
        type: "PUT",
        data: {
            blog_id: blogId,
            title: title,
            text: text
        },
        cache: false,
        success: function (response) {
            isSaving = false;
            checkAndReSave();
        },
        error: function (err, exception) {
            handleApiErr(err);
            isSaving = false;
        }
    });
}

function handleApiErr(err){
    try {
        var obj = $.parseJSON(err.responseText);
        if (obj !== undefined && obj.message !== undefined) {
            //do something
        }
    } catch (e) {
    }
}