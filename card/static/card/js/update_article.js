$("#save").click(function () {
    unchanged = false;
    let title = $("#article_title").val();
    $('#article_title').removeClass("is-invalid");
    const re = new  RegExp('(^\\s+|^$)')
    is_valid = true;
    if (re.test(title)) {
        is_valid = false
        $("#article_title").addClass("is-invalid")
    }

    if( !is_valid) {
        return        
    }
    let text = $("#math_input").html();
    let page_url = window.location.href.split('/')
    let article_id = page_url[page_url.length - 1]
    let public_val = $("#public").prop('checked')

    let send_data = JSON.stringify({
                                    title: title,
                                    text: text,
                                    public: public_val
                                })
    $.ajax({
        type: "POST",
        url: "../update_article/" + article_id,
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
