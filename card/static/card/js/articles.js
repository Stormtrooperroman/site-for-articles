let article_id;
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$(".delete").click(function (event) {
    event.preventDefault();
    article_id =  this.name;
    let delete_modal = new bootstrap.Modal(document.getElementById('modal'+article_id));
    delete_modal.show();
    $("#delete"+article_id).click(function (event) {
        event.preventDefault();
        const csrftoken = getCookie('csrftoken');
        $.ajax({
            type: "POST",
            headers: {'X-CSRFToken': csrftoken},
            url: "../delete_article/"+article_id,
            success: function (response) {
                location.reload()
            }
        });
    })
})

