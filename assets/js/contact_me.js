$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM

            $('#success').html("<div class='alert alert-info'>");
            $('#success > .alert-info').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success > .alert-info')
                .append("<strong> Sua mensagem está sendo enviada... </strong>");
            $('#success > .alert-info')
                .append('</div>');

            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            // Font: https://medium.com/@mariusc23/send-an-email-using-only-javascript-b53319616782
            $.ajax({
                url: "https://mandrillapp.com/api/1.0/messages/send.json",
                type: "POST",
                data: {
                    "key": "8SOwHXWgpMu5YIVDY2NGCA",
                    "message": {
                        "html":
                                "<div>" +
                                    "<p>" +
                                        message +
                                    "</p>" +
                                "</div>" +
                                "<h3>Contact Details</h3>" +
                                "<div>" +
                                    "<table>" +
                                        "<tr>" +
                                            "<td>Name</td>" +
                                            "<td>" + name + "</td>" +
                                        "</tr>" +
                                        "<tr>" +
                                            "<td>Email</td>" +
                                            "<td>" + email + "</td>" +
                                        "</tr>" +
                                        "<tr>" +
                                            "<td>Phone</td>" +
                                            "<td>" + phone + "</td>" +
                                        "</tr>" +
                                    "</table>" +
                                "</div>"
                                ,
                        //"text": message,
                        "subject": "Contato Freelancer",
                        "from_email": email,
                        "from_name": name,
                        "to": [
                            {
                                "email": "filipebzerra@gmail.com",
                                "name": "Filipe Bezerra",
                                "type": "to"
                            }
                        ],
                        "important": true,
                        "auto_html": true
                    },
                    "async": false,
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Sua mensagem foi enviada. Obrigado. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Desculpe " + firstName + ", parece que meu servidor de e-mail não está respondendo. Por gentileza tente novamente ou espere alguns minutos!");
                    $('#success > .alert-danger').append('</div>');
                },
             })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
