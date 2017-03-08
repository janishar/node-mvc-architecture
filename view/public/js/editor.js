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

	editor.subscribe('editableInput', function (event, editable) {
	    // Do some work
	    // console.log(event);
	    // console.log(editable);

	    // It gives the json representation of the Created HTMLs
	    console.log(editor.serialize());
	});
});