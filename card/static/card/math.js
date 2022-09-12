var elem=$("#math_input")[0];
var text=$("#math_input").html();
var len=0;
var ignoreKey = false;
var lastFocus;
var funcKey=false;




function autoresize() {
    
    math_input.style.height = "auto";
    math_input.style.height = (math_input.scrollHeight) + "px";
    $("#math_look").width($("#math").width() - $("#math_input").width());
}

$("#math_input").keyup(function (event) {
    switch(event.keyCode){

        
        case 8:
            
            console.log(math_input.style.height)
            math_input.style.height = "auto";
            math_input.style.height = (math_input.style.height - 24) + "px";
            console.log(math_input.style.height)

            
            $("#math_look").html($("#math_input").html());
            
            MathJax.texReset();
            MathJax.typeset();
            break;

        case 13:
            
            console.log(math_input.style.height)
            math_input.style.height = "auto";
            math_input.style.height = (math_input.style.height + 24) + "px";
            console.log(math_input.style.height)

            
            $("#math_look").html($("#math_input").html());
            
            MathJax.texReset();
            MathJax.typeset();
            break;

        default:
            $("#math_look").html($("#math_input").html());
            MathJax.texReset();
            MathJax.typeset();
            text=$("#math_input").html();
            console.log($("#math_input").height()+" "+$("#math_look").height())
            if($("#math_input").height() != $("#math_look").height()) {
                $("#math_input").height($("#math_look").height())
            }

            
            
            
            console.log(event.keyCode)
            break;
    } 
    
});

$("#article_title").on('input', function () {
    $("#article_title").removeClass("is-invalid")
    
});


$("#math_input").focusout(function() {
    lastFocus = this;
    
});


window.onload=function(){
    $("#math_look").html($("#math_input").html());
    MathJax.startup.document.state(0);
    MathJax.texReset();
    MathJax.typeset();
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


$("#save").click(function () { 
    let title = $("#article_title").val();
    if( title == "" ) {
        $("#article_title").addClass("is-invalid")
        return
    }
    let text = $("#math_input").html();
    let send_data = JSON.stringify({
                                    title: title,
                                    text: text,
                                })
    console.log(send_data)
    $.ajax({
        type: "POST",
        url: "../save_article/",
        data: send_data,
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            console.log("Ok")
        }
    });
    
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
    selection = window.getSelection();

    switch (sCmd) {
        case "formatblock":
            range = selection.getRangeAt(0);
            array = range.extractContents()["childNodes"];
            text = document.createElement(sValue);
            console.log(array);
            for (let i=0; i< array["length"]; i++){
                arr_node = array[i.toString()]
                
                if (arr_node["nodeName"].toLowerCase().search("^h[1-6]") == -1 && arr_node["nodeName"] != "#text" ){
                    new_node = document.createElement(arr_node["nodeName"].toLowerCase());
                    node_attr = arr_node["attributes"] 
                    for (let j =0; j < node_attr["length"]; j++){
                        attr_value = node_attr[j.toString()]
                        new_node.setAttribute(attr_value["name"], attr_value["value"])
                    }
                    
                    if (arr_node["childNodes"]["length"] == 0) {
                        new_node.appendChild(document.createTextNode(arr_node["textContent"]));
                    }
                    else {
                        new_node = add_node(arr_node["childNodes"], new_node);
                    }
                    text.appendChild(new_node);
                }

                else {
                    if (arr_node["childNodes"]["length"] == 0) {
                        text.appendChild(document.createTextNode(arr_node["textContent"]));
                    }
                    else {
                        text = add_node(arr_node["childNodes"], text);
                    }
            
                }
            }
            range.deleteContents();
            
            // node.appendChild(text);
            range.insertNode(text);

            break;
        case "fontname":
            range = selection.getRangeAt(0);
           

            array = range.extractContents()["childNodes"];
            text = document.createElement("font");
            text.setAttribute("face", sValue)
            console.log(array);
            for (let i=0; i< array["length"]; i++){
                arr_node = array[i.toString()]
                
                if (arr_node["nodeName"].toLowerCase().search("^font") == -1 && arr_node["nodeName"] != "#text" ){
                    new_node = document.createElement(arr_node["nodeName"].toLowerCase());
                    node_attr = arr_node["attributes"] 
                    for (let j =0; j < node_attr["length"]; j++){
                        attr_value = node_attr[j.toString()]
                        new_node.setAttribute(attr_value["name"], attr_value["value"])
                    }
                    
                    if (arr_node["childNodes"]["length"] == 0) {
                        new_node.appendChild(document.createTextNode(arr_node["textContent"]));
                    }
                    else {
                        new_node = add_node(arr_node["childNodes"], new_node, "font", "face");
                    }
                    text.appendChild(new_node);
                }
                else if (arr_node["nodeName"].toLowerCase().search("^font") != -1){
                    node_attr = arr_node["attributes"] 
                    new_node = document.createElement(arr_node["nodeName"].toLowerCase());
                    for (let j =0; j < node_attr["length"]; j++){
                        attr_value = node_attr[j.toString()];
                        if (attr_value["name"] != "face") {
                            new_node.setAttribute(attr_value["name"], attr_value["value"])
                        }
                    }
                    if (arr_node["childNodes"]["length"] == 0) {
                        new_node.appendChild(document.createTextNode(arr_node["textContent"]));
                    }
                    else {
                        new_node = add_node(arr_node["childNodes"], new_node, "font", "face");
                    }
                    text.appendChild(new_node);
                }
                else {
                    if (arr_node["childNodes"]["length"] == 0) {
                        text.appendChild(document.createTextNode(arr_node["textContent"]));
                    }
                    else {
                        text = add_node(arr_node["childNodes"], text, "font", "face");
                    }
            
                }
            }

            range.deleteContents();

            range.insertNode(text);
            break;

        case "fontsize":
            range = selection.getRangeAt(0);
            
            array = range.extractContents()["childNodes"];
            // text = document.createElement("block")
            text = document.createElement("font");
            text.setAttribute("size", sValue)
            console.log(array);
            for (let i=0; i< array["length"]; i++){
                arr_node = array[i.toString()]
                
                if (arr_node["nodeName"].toLowerCase().search("^font") == -1 && arr_node["nodeName"] != "#text" ){
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
                        new_node = add_node(arr_node["childNodes"], new_node, "font", "size");
                    }
                    text.appendChild(new_node);
                }
                else if (arr_node["nodeName"].toLowerCase().search("^font") != -1){
                    node_attr = arr_node["attributes"] 
                    new_node = document.createElement(arr_node["nodeName"].toLowerCase());
                    for (let j =0; j < node_attr["length"]; j++){
                        attr_value = node_attr[j.toString()];
                        if (attr_value["name"] != "size") {
                            new_node.setAttribute(attr_value["name"], attr_value["value"]);
                        }
                    }
                    if (arr_node["childNodes"]["length"] == 0) {
                        new_node.appendChild(document.createTextNode(arr_node["textContent"]));
                    }
                    else {
                        new_node = add_node(arr_node["childNodes"], new_node, "font", "size");
                    }
                    text.appendChild(new_node);
                }
                else {
                    if (arr_node["childNodes"]["length"] == 0) {
                        text.appendChild(document.createTextNode(arr_node["textContent"]));
                    }
                    else {
                        text = add_node(arr_node["childNodes"], text, "font", "size");
                    }
            
                }
            }



            range.deleteContents();
            
            // node.appendChild(text);
            range.insertNode(text);
            break;



        case "forecolor":
            range = selection.getRangeAt(0);
            
            array = range.extractContents()["childNodes"];
            // text = document.createElement("block")
            text = document.createElement("font");
            text.setAttribute("color", sValue)
            console.log(array);
            for (let i=0; i < array["length"]; i++){
                arr_node = array[i.toString()]
                
                if (arr_node["nodeName"].toLowerCase().search("^font") == -1 && arr_node["nodeName"] != "#text" ){
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
                        new_node = add_node(arr_node["childNodes"], new_node, "font", "color");
                    }
                    text.appendChild(new_node);
                }
                else if (arr_node["nodeName"].toLowerCase().search("^font") != -1){
                    node_attr = arr_node["attributes"] 
                    new_node = document.createElement(arr_node["nodeName"].toLowerCase());
                    for (let j =0; j < node_attr["length"]; j++){
                        attr_value = node_attr[j.toString()];
                        if (attr_value["name"] != "color") {
                            new_node.setAttribute(attr_value["name"], attr_value["value"]);
                        }
                    }
                    if (arr_node["childNodes"]["length"] == 0) {
                        new_node.appendChild(document.createTextNode(arr_node["textContent"]));
                    }
                    else {
                        new_node = add_node(arr_node["childNodes"], new_node, "font", "color");
                    }
                    text.appendChild(new_node);
                }
                else {
                    if (arr_node["childNodes"]["length"] == 0) {
                        text.appendChild(document.createTextNode(arr_node["textContent"]));
                    }
                    else {
                        
                        text = add_node(arr_node["childNodes"], text, "font", "color");
                    }
            
                }
            }

            range.deleteContents();

            range.insertNode(text);
            break;

        case "bold":
        
            range = selection.getRangeAt(0);
            console.log(range)
            if (range.commonAncestorContainer["parentElement"] ==  null || range.commonAncestorContainer["parentElement"]["tagName"] != "B") {
                
                array = range.extractContents()["childNodes"];
                
                flag = true;
                for (let i=0; i < array["length"]; i++){
                    arr_node = array[i.toString()]
                    if ((arr_node["nodeName"] != "#text" || arr_node["textContent"] != "") && arr_node["nodeName"] != "B") {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    text = document.createElement("block");
                    for (let i=0; i < array["length"]; i++){
                        arr_node = array[i.toString()]
                    
                        if (arr_node["nodeName"].toLowerCase().search("^b") == -1 && arr_node["nodeName"] != "#text" && arr_node["nodeName"].toLowerCase().search("^block") == -1){
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
                                    new_node = add_node(arr_node["childNodes"], new_node, "b");
                                }
                                text.appendChild(new_node);
                            }
                            else {
                                if (arr_node["childNodes"]["length"] == 0) {
                                    text.appendChild(document.createTextNode(arr_node["textContent"]));
                                }
                                else {
                                    text = add_node(arr_node["childNodes"], text, "b");
                                }
                            }
                    }
                }
                else {
                    text = document.createElement("b");
                    for (let i=0; i < array["length"]; i++){
                        arr_node = array[i.toString()]    
                        if (arr_node["nodeName"].toLowerCase() != "b" && arr_node["nodeName"] != "#text" && arr_node["nodeName"].toLowerCase().search("^block") == -1){
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
                                new_node = add_node(arr_node["childNodes"], new_node, "b");
                            }
                            text.appendChild(new_node);
                        }
                        else {
                            if (arr_node["childNodes"]["length"] == 0) {
                                text.appendChild(document.createTextNode(arr_node["textContent"]));
                            }
                            else {
                                text = add_node(arr_node["childNodes"], text, "b");
                            }

                        }
                    }
                }
                range.deleteContents();
                range.insertNode(text);
            }
            else {
                console.log("BOLD");
            }
            break;
        case "italic":
        
            range = selection.getRangeAt(0);
            console.log(range)
            if (range.commonAncestorContainer["parentElement"] ==  null || range.commonAncestorContainer["parentElement"]["tagName"] != "I") {
                
                array = range.extractContents()["childNodes"];
                console.log(array)

                flag = true;
                for (let i=0; i < array["length"]; i++){
                    arr_node = array[i.toString()]
                    if ((arr_node["nodeName"] != "#text" || arr_node["textContent"] != "") && arr_node["nodeName"] != "I") {
                        flag = false;
                        console.log("HAHHAHA " + i)
                        console.log(arr_node)
                        break;
                    }
                }
                if (flag) {
                    text = document.createElement("block");
                    for (let i=0; i < array["length"]; i++){
                        arr_node = array[i.toString()]
                    
                        if (arr_node["nodeName"].toLowerCase() != "i" && arr_node["nodeName"] != "#text" && arr_node["nodeName"].toLowerCase().search("^block") == -1){
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
                                    new_node = add_node(arr_node["childNodes"], new_node, "i");
                                }
                                text.appendChild(new_node);
                        }
                        else {
                            if (arr_node["childNodes"]["length"] == 0) {
                                text.appendChild(document.createTextNode(arr_node["textContent"]));
                            }
                            else {
                                text = add_node(arr_node["childNodes"], text, "i");
                            }
                        }
                    }
                }
                else {
                    text = document.createElement("i");
                    for (let i=0; i < array["length"]; i++){
                        arr_node = array[i.toString()]    
                        if (arr_node["nodeName"].toLowerCase() != "i" && arr_node["nodeName"] != "#text" && arr_node["nodeName"].toLowerCase().search("^block") == -1){
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
                                new_node = add_node(arr_node["childNodes"], new_node, "i");
                            }
                            text.appendChild(new_node);
                        }
                        else {
                            if (arr_node["childNodes"]["length"] == 0) {
                                text.appendChild(document.createTextNode(arr_node["textContent"]));
                            }
                            else {
                                text = add_node(arr_node["childNodes"], text, "i");
                            }

                        }
                    }
                }
                range.deleteContents();
                range.insertNode(text);
            }
            else {
                console.log("Italic");
            }
            break;


        case "underline":
        
            range = selection.getRangeAt(0);
            console.log(range)
            if (range.commonAncestorContainer["parentElement"] ==  null || range.commonAncestorContainer["parentElement"]["tagName"] != "U") {
                
                array = range.extractContents()["childNodes"];
                console.log(array)

                flag = true;
                for (let i=0; i < array["length"]; i++){
                    arr_node = array[i.toString()]
                    if ((arr_node["nodeName"] != "#text" || arr_node["textContent"] != "") && arr_node["nodeName"] != "U") {
                        flag = false;
                        console.log("HAHHAHA " + i)
                        console.log(arr_node)
                        break;
                    }
                }
                if (flag) {
                    text = document.createElement("block");
                    for (let i=0; i < array["length"]; i++){
                        arr_node = array[i.toString()]
                    
                        if (arr_node["nodeName"].toLowerCase() != "u" && arr_node["nodeName"] != "#text" && arr_node["nodeName"].toLowerCase().search("^block") == -1){
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
                                    new_node = add_node(arr_node["childNodes"], new_node, "u");
                                }
                                text.appendChild(new_node);
                        }
                        else {
                            if (arr_node["childNodes"]["length"] == 0) {
                                text.appendChild(document.createTextNode(arr_node["textContent"]));
                            }
                            else {
                                text = add_node(arr_node["childNodes"], text, "u");
                            }
                        }
                    }
                }
                else {
                    text = document.createElement("u");
                    for (let i=0; i < array["length"]; i++){
                        arr_node = array[i.toString()]    
                        if (arr_node["nodeName"].toLowerCase() != "u" && arr_node["nodeName"] != "#text" && arr_node["nodeName"].toLowerCase().search("^block") == -1){
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
                                new_node = add_node(arr_node["childNodes"], new_node, "u");
                            }
                            text.appendChild(new_node);
                        }
                        else {
                            if (arr_node["childNodes"]["length"] == 0) {
                                text.appendChild(document.createTextNode(arr_node["textContent"]));
                            }
                            else {
                                text = add_node(arr_node["childNodes"], text, "u");
                            }

                        }
                    }
                }
                range.deleteContents();
                range.insertNode(text);
            }
            else {
                console.log("Underline");
            }
            break;

        case "justifycenter":
            range = selection.getRangeAt(0);
            if (!range.collapsed){
                array = range.extractContents()["childNodes"];
                text = document.createElement("p");
                text.setAttribute("align", "center")
                console.log(array);
                for (let i=0; i < array["length"]; i++){
                    arr_node = array[i.toString()]
                    
                    if (arr_node["nodeName"].toLowerCase().search("^p") == -1 && arr_node["nodeName"] != "#text" ){
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
                            new_node = add_node(arr_node["childNodes"], new_node, "p", "align");
                        }
                        text.appendChild(new_node);
                    }
                    else {
                        if (arr_node["childNodes"]["length"] == 0) {
                            text.appendChild(document.createTextNode(arr_node["textContent"]));
                        }
                        else {
                            
                            text = add_node(arr_node["childNodes"], text, "p", "align");
                        }
                
                    }
                }

                range.deleteContents();

                range.insertNode(text);
            }
            
            break;
        case "justifyleft":
            range = selection.getRangeAt(0);
            if (!range.collapsed){
                array = range.extractContents()["childNodes"];
                text = document.createElement("p");
                text.setAttribute("align", "left")
                console.log(array);
                for (let i=0; i < array["length"]; i++){
                    arr_node = array[i.toString()]
                    
                    if (arr_node["nodeName"].toLowerCase().search("^p") == -1 && arr_node["nodeName"] != "#text" ){
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
                            new_node = add_node(arr_node["childNodes"], new_node, "p", "align");
                        }
                        text.appendChild(new_node);
                    }
                    else {
                        if (arr_node["childNodes"]["length"] == 0) {
                            text.appendChild(document.createTextNode(arr_node["textContent"]));
                        }
                        else {
                            
                            text = add_node(arr_node["childNodes"], text, "p", "align");
                        }
                
                    }
                }

                range.deleteContents();

                range.insertNode(text);
            }
            
            break;

        case "justifyright":
            range = selection.getRangeAt(0);
            if (!range.collapsed){
                array = range.extractContents()["childNodes"];
                text = document.createElement("p");
                text.setAttribute("align", "right")
                console.log(array);
                for (let i=0; i < array["length"]; i++){
                    arr_node = array[i.toString()]
                    
                    if (arr_node["nodeName"].toLowerCase().search("^p") == -1 && arr_node["nodeName"] != "#text" ){
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
                            new_node = add_node(arr_node["childNodes"], new_node, "p", "align");
                        }
                        text.appendChild(new_node);
                    }
                    else {
                        if (arr_node["childNodes"]["length"] == 0) {
                            text.appendChild(document.createTextNode(arr_node["textContent"]));
                        }
                        else {
                            
                            text = add_node(arr_node["childNodes"], text, "p", "align");
                        }
                
                    }
                }

                range.deleteContents();

                range.insertNode(text);
            }
            
            break;
        
        case "createlink":
            range = selection.getRangeAt(0);
            if (!range.collapsed){
                array = range.extractContents()["childNodes"];
                text = document.createElement("a");
                text.setAttribute("href", sValue)
                console.log(array);
                for (let i=0; i < array["length"]; i++){
                    arr_node = array[i.toString()]
                    
                    if (arr_node["nodeName"].toLowerCase().search("^a") == -1 && arr_node["nodeName"] != "#text" ){
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
                            new_node = add_node(arr_node["childNodes"], new_node, "a");
                        }
                        text.appendChild(new_node);
                    }
                    else {
                        if (arr_node["childNodes"]["length"] == 0) {
                            text.appendChild(document.createTextNode(arr_node["textContent"]));
                        }
                        else {
                            
                            text = add_node(arr_node["childNodes"], text, "a");
                        }
                
                    }
                }

                range.deleteContents();

                range.insertNode(text);
            }
            
            break;

        // case "removeFormat":
        
        //     range = selection.getRangeAt(0);
        //     console.log(range.endContainer)
        //     text = document.createTextNode(range.toString());

        //     console.log(range.commonAncestorContainer["parentNode"]["tagName"].toLowerCase())
        //     endNode =  document.createElement(range.commonAncestorContainer["parentNode"]["tagName"].toLowerCase());
        //     endNode.appendChild(range.endContainer)
            
        //     range.commonAncestorContainer["parentNode"].remove()

            

        //     console.log(text);
        //     range.deleteContents();
        //     range.insertNode(text);
            
            
        //     break;
            




        default:
            document.execCommand(sCmd, false, sValue);
            break;
    }

    
    
}

