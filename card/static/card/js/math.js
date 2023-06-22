var elem=$("#math_input")[0];
var text=$("#math_input").html();
var len=0;
var ignoreKey = false;
var lastFocus;
var funcKey=false;

let unchanged = false;

function autoresize() {
    
    math_input.style.height = "auto";
    math_input.style.height = (math_input.scrollHeight) + "px";
    $("#math_look").width($("#math").width() - $("#math_input").width());
}

$("#math_input").keyup(function (event) {
    switch(event.keyCode){

        // case 8:
        //
        //     math_input.style.height = "auto";
        //     math_input.style.height = (math_input.style.height - 30) + "px";
        //
        //     window.scrollBy(0, -30);
        //
        //     $("#math_look").html($("#math_input").html());
            // break;

        case 13:            
            math_input.style.height = "auto";
            math_input.style.height = (math_input.style.height + 30) + "px";
            
            window.scrollBy(0, 30);
            
            $("#math_look").html($("#math_input").html());
            break;

        default:
            $("#math_look").html($("#math_input").html());
            text=$("#math_input").html();
            if($("#math_input").height() != $("#math_look").height()) {
                $("#math_input").height($("#math_look").height())
            }
            break;
    }
    MathJax.typesetClear();
    MathJax.typesetPromise();
    unchanged = true;
});

$("#article_title").on('input', function () {
    $("#article_title").removeClass("is-invalid")
    unchanged = true;
});


$("#math_input").focusout(function() {
    lastFocus = this;
});


window.onload=function(){
    $("#math_look").html($("#math_input").html());

    if($("#math_input").height() != $("#math_look").height()) {
        $("#math_input").height($("#math_look").height())
    }

    MathJax.typesetClear();
    MathJax.typesetPromise();
    // MathJax.startup.document.state(0);

}


$.ajaxSetup({ 
    beforeSend: function(xhr, settings) {
        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    } 
});




$("textarea").each(function () {
    this.setAttribute("style", "height:" + (this.scrollHeight) + "px; overflow-y:hidden;");
  }).on("input", function () {
    
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
    
    
  });


new ResizeObserver(autoresize).observe(math_input)





function add_node (node, parent, ignoredTag = null, ignoredAttr = null){

    for (let i=0; i < node["length"]; i++){
        
        arr_node = node[i.toString()]
        
        if (arr_node["nodeName"].toLowerCase() != "#text"  && arr_node["nodeName"].toLowerCase() != ignoredTag && arr_node["nodeName"].toLowerCase() != "block"){
            new_node = document.createElement(arr_node["nodeName"].toLowerCase());
            node_attr = arr_node["attributes"] 
            for (let j =0; j < node_attr["length"]; j++){
                attr_value = node_attr[j.toString()];
                new_node.setAttribute(attr_value["name"], attr_value["value"]);
            }
            if (arr_node["childNodes"]["length"] == 0) {
                new_node.appendChild(document.createTextNode(arr_node["textContent"]));
            }
            else {

                new_node = add_node(arr_node["childNodes"], new_node, ignoredTag);
            }

            parent.appendChild(new_node);
        }
        else if (arr_node["nodeName"].toLowerCase() == ignoredTag && ignoredAttr && arr_node["nodeName"].toLowerCase() != "block") {
            node_attr = arr_node["attributes"] 
            new_node = document.createElement(arr_node["nodeName"].toLowerCase());
            for (let j =0; j < node_attr["length"]; j++){
                attr_value = node_attr[j.toString()];
                if (attr_value["name"] != ignoredAttr) {
                    new_node.setAttribute(attr_value["name"], attr_value["value"])
                }
            }
            if (arr_node["childNodes"]["length"] == 0) {
                new_node.appendChild(document.createTextNode(arr_node["textContent"]));
            }
            else {
                new_node = add_node(arr_node["childNodes"], new_node, ignoredTag, ignoredAttr);
            }
            parent.appendChild(new_node);
        }
        else {
            
            if (arr_node["childNodes"]["length"] == 0) {
                parent.appendChild(document.createTextNode(arr_node["textContent"]));
            }
            else {

                parent = add_node(arr_node["childNodes"], parent, ignoredTag, ignoredAttr);
            }
        }
    }


    console.log(parent)
    return parent
}





function formatDoc(sCmd, sValue) {
    // let selection = window.getSelection();
    switch (sCmd) {
        default:
            document.execCommand(sCmd, false, sValue);
            break;
    }

    $("#math_look").html($("#math_input").html());
    MathJax.typesetClear();
    MathJax.typesetPromise();
    text=$("#math_input").html();
    console.log($("#math_input").height()+" "+$("#math_look").height())
    if ($("#math_input").height() != $("#math_look").height()) {
        $("#math_input").height($("#math_look").height());
    }
    unchanged = true;
    
}
$(window).on("beforeunload", function(e) {
    if (unchanged) {
            e.preventDefault();
        return "You are sure?";
    }
});
