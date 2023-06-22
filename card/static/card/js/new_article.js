$("#save").click(function () {
    unchanged = false;
    let title = $("#article_title").val();

    $('#article_title').removeClass("is-invalid");

    const re = new  RegExp('(^\\s+|^$)')

    let is_valid = true;
    if (re.test(title)) {
        is_valid = false
        $("#article_title").addClass("is-invalid")
    }

    if( !is_valid) {
        return        
    }
    let text = $("#math_input").html();
    let public_val = $("#public").prop('checked')

    let send_data = JSON.stringify({
                                    title: title,
                                    text: text,
                                    public: public_val
                                })
    $.ajax({
        type: "POST",
        url: "../save_article/",
        data: send_data,
        contentType: "application/json",
        dataType: "json",
        statusCode:{
            200:function() {
                let toast = new bootstrap.Toast(document.getElementById('done_save'))
                toast.show()
            },
            500: function() {
                let toast = new bootstrap.Toast(document.getElementById('fail_safe'))
                toast.show()
            }
        }
    });
    
});
