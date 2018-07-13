console.log("moikkamoI");

// loadOptions();
// function loadOptions() {
    // chrome.storage.sync.get(["tabswitcher_options"], function (res) {
        // console.log(res);
        // let options = res["tabswitcher_options"];
        // console.log(options);
        // for (let i = 0; i < options.length; i++) {
            // console.log(options[i]);

        // }
    // }); 
// }

// document.getElementById("reloadTabs").addEventListener("click", function (ev) {
    // forceReload();
// });
// function forceReload() {
    // chrome.tabs.query({}, function (tabs) {
        // for (let i = 0; i < tabs.length; i++) {
            // chrome.tabs.reload(tabs[i].id); 
        // }
    // });
// }

var co = $("#optionsContainer")[0];

addField(co, "field1");
addField(co, "field2");
var nn = 0;
function addField2() {
    addField(co, "field" + nn);
    nn++;

}
function addField(container, id) {
     
    $("#belowOptionsContainer").css("top", $(co).offset().top + $(co).height());
    let row = htmlToElements(
    "<div class='" + id +"'>" +
        "<div class='row'>" + 
            "<div class='col-5'>" +
                "moi" +
            "</div>" + 
            "<div class='col-1'>" +
                "Key" +
            "</div>" +
            "<div class='col-2'>" +
                "Prefix key(s)" +
            "</div>" +
        "</div>" +
            "<div class='row'>" +
            // column for action starts here
            "<div class='col-1'>" + 
                "<select id='" + id + "action1'>" + 
                    "<option>move</option>" +
                    "<option>toggle</option>" + 
                "</select>" +
            "</div>" +
            "<div class='col-3'>" +
                "<select id='" + id + "action2'>" + 
                    "<option>right</option>" +
                    "<option>left</option>" +
                "</select>" +
                "<input id='" + id + "action3' class='form-control form-control-sm' type='text'></input>" +
                "<div class='invalid-feedback'>Required field</div>" +
            "</div>" +
            "<div class='col-1'>" + 
                "<input id='" + id + "action4' class='form-check-input' type='checkbox'></input>" +
                "<label id='" + id + "action5' class='form-check-label'>Audio?</label>" + 

            "</div>" + 
            "<div class='col-1'>" +
                "<input id='" + id + "shortcut1' class='form-control form-control-sm' type='text'></input>" + 
                "<div class='invalid-feedback' style='white-space: nowrap;'>One character a-z or 0-9 required</div>" +
            "</div>" +
            "<div class='col-4'>" +
                "<div class='form-check form-check-inline '>" +
                    "<input id='" + id + "shortcut2' class='form-check-input' type='checkbox'></input>" +
                    "<label id='" + id + "shortcut3' class='form-check-label'>Shift</label>" +
                "</div>" +
                "<div class='form-check form-check-inline '>" +
                    "<input id='" + id + "shortcut4' class='form-check-input' type='checkbox'></input>" +
                    "<label id='" + id + "shortcut5' class='form-check-label'>Ctrl</label>" +
                "</div>" +
                "<div class='form-check form-check-inline '>" +
                    "<input id='" + id + "shortcut6' class='form-check-input' type='checkbox'></input>" +
                    "<label id='" + id + "shortcut7' class='form-check-label'>Meta</label>" +
                "</div>" +
                "<div class='form-check form-check-inline '>" +
                    "<input id='" + id + "shortcut8' class='form-check-input' type='checkbox'></input>" +
                    "<label id='" + id + "shortcut9' class='form-check-label'>Alt</label>" +
                "</div>" +
            "</div>" +
            "<div class='col-1'>" +
                "<button id='" + id + "delete' type='button' class='btn-danger'>Delete</button>" +
            "</div>" +
        "</div>" +
        "<div class='row ml-1'>" +
            "<div class='col'>" +
                "<small class='text-muted'>Explanation: <span id=" + id + "explanation</span></small>" +
            "</div>" +
        "</div>" +
    "</div>");
    $(container).append(row);


    $("#" + id + "delete").on("click", ev => {
        console.log("delete this"); 
        $("." + ev.target.id.substring(0,6)).remove();
    });
    $("#" + id + "action3").on("keyup", ev => {
        let val = ev.target.value;
        let valid = (val.length != 0);
        if (!valid) {
            $(ev.target).addClass("is-invalid").removeClass("is-valid");
        } else {
            $(ev.target).addClass("is-valid").removeClass("is-invalid");
        }
    });

    //validation and stuff for shortcut1
    $("#" + id + "shortcut1")/*.css("width", parseInt($("#" + id + "shortcut1").css("height")) * 2)*/.on("keyup", ev => {
        console.log(ev.target.value); 
        let val = ev.target.value;
        let valid = /^([a-z]|[0-9]){1}$/.test(val);
        console.log(valid);
        if (!valid) {
            $(ev.target).addClass("is-invalid").removeClass("is-valid");
        } else {
            $(ev.target).addClass("is-valid").removeClass("is-invalid"); 
        }
    }).on("keydown", ev => {

    });
    $("#" + id + "action3, #" + id + "action4, #" + id + "action5").hide();
    $("#" + id + "action1").on("change", ev => {
        if (ev.target.value == "move") {
            $("#" + id + "action2").show(); 
            $("#" + id + "action3, #" + id + "action4, #" + id + "action5").hide().removeClass("is-valid is-invalid").val(""); 
        } else {
            $("#" + id + "action2").hide(); 
            $("#" + id + "action3, #" + id + "action4, #" + id + "action5").show().removeClass("is-valid is-invalid").val(""); 
        }
    });

    $(document.body).append(container);
    // let container = document.createElement("div");
    // container.id = id;

    // let select1 = document.createElement("select");
    // select1.id = id + "Select";

    // let option1 = document.createElement("option");
    // option1.value = "move";
    // option1.innerHTML = "move";
    
    // let option2 = document.createElement("option");
    // option2.value = "toggle";
    // option2.innerHTML = "toggle";

    // select1.appendChild(option1);
    // select1.appendChild(option2);

    // let select11 = document.createElement("select");
    // select11.class = "selectpicker";
    // let option111 = document.createElement("option");
    // option111.value = "left";
    // option111.innerHTML = "left";

    // let option112 = document.createElement("select");
    // option112.value = "right";
    // option112.innerHTML = "right";

    // select11.appendChild(option111);
    // select11.appendChild(option112);

    // let input12 = document.createElement("input");
    // input12.type = "text";
    // // input12.style.display = "none";
    // $(input12).hide();

    // container.appendChild(select1);
    // container.appendChild(select11);
    // container.appendChild(input12);
    // select1.addEventListener("change", function (ev) {
        // if (select1.value == "move") {
            // $(select11).show();
            // $(input12).hide();
            // // select11.style.display = "inline";
            // // input12.style.display = "none";
        // } else {
            // $(select11).hide();
            // $(input12).show();
            // // select11.style.display = "none";
            // // input12.style.display = "inline";
        // }
    // });
    // document.body.appendChild(container);
}
function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}
function isLetter(str) {
    if (str.length != 1) return false;
    return !(null == (str.length === 1 && str.match(/[a-z]/i)));
}
function isNumber(str){
    return /^\d+$/.test(str);
}
function isCharacterKeyPress(evt) {
    if (typeof evt.which == "undefined") {
        // This is IE, which only fires keypress events for printable keys
        return true;
    } else if (typeof evt.which == "number" && evt.which > 0) {
        // In other browsers except old versions of WebKit, evt.which is
        // only greater than zero if the keypress is a printable key.
        // We need to filter out backspace and ctrl/alt/meta key combinations
        return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8;
    }
    return false;
}

