// Contact Form Scripts

$(function() {

    $("#userLoginForm input,#userLoginForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour

            // get values from FORM
            var email = btoa($("input#userEmail").val());
            var password = btoa($("input#userPassword").val());

            console.log(email);
            console.log(password);

            $.ajax({
                url: "/login",
                type: "POST",
                data: {
                    email: email,
                    password: password
                },
                cache: false,
                success: function(result) {

                    console.log(result.status_code);

                    if (result.status_code == 'success'
                        && result.user_id !== undefined
                        && result.access_token !== undefined) {

                        Cookies("user-id", result.user_id);
                        Cookies("access-token", result.access_token);

                        // Success message
                        $('#success').html("<div class='alert alert-success'>");
                        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-success')
                            .append("<strong>" + result.message +  " please wait. </strong>");
                        $('#success > .alert-success')
                            .append('</div>');

                        if(result.redirect_url !== undefined){
                            window.location = result.redirect_url
                        }
                    }

                    //clear all fields
                    $('#userLoginForm').trigger("reset");
                },
                error: function(err, exception) {

                    var message = "It seems that my mail server is not responding. Please try again later!";
                    try{
                       var obj = $.parseJSON(err.responseText);
                        if(obj !== undefined && obj.message !== undefined){
                            message = obj.message;
                        }
                    }catch (e){
                        console.log(e);
                    }

                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");

                    $('#success > .alert-danger').append(message);


                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#userLoginForm').trigger("reset");
                }
            });
        },
        filter: function() {
            return $(this).is(":visible");
        }
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#userId').focus(function() {
    $('#success').html('');
});
