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

var fields = {};

// this needs to be loaded from somewhere
var configuration = [];

function start() {
    //chrome.storage.sync.get(["configuration"], (res) => {
        //configuration = res["configuration"];
        //for (cc in configuration) {
            //for (i in res) {
                //let id = "field" + nn;
                //addField(co, id);
                //nn++;
                //$("#" + id + "action1").val(cc["mode"]);
                //$("#" + id + "action2").val(cc["direction"]);
                //$("#" + id + "action3").val(cc["pattern"]);
                //$("#" + id + "action4").prop("checked", cc["audio"]);
                //$("#" + id + "shortcut1").val(cc["key"]);
                //$("#" + id + "shortcut2").prop("checked", cc["shiftKey"]);
                //$("#" + id + "shortcut4").prop("checked", cc["ctrlKey"]);
                //$("#" + id + "shortcut6").prop("checked", cc["metaKey"]);
                //$("#" + id + "shortcut8").prop("checked", cc["altKey"]);
                //[>
                //cc["mode"] = $("#" + id + "action1").val();
                //cc["direction"] = $("#" + id + "action2").val();
                //cc["pattern"] = $("#" + id + "action3").val();
                //cc["audio"] = $("#" + id + "action4").is(":checked");
                //cc["key"] = $("#" + id + "shortcut1").val();
                //cc["shiftKey"] = $("#" + id + "shortcut2").is(":checked");
                //cc["ctrlKey"] = $("#" + id + "shortcut4").is(":checked");
                //cc["metaKey"] = $("#" + id + "shortcut6").is(":checked");
                //cc["altKey"] = $("#" + id + "shortcut8").is(":checked");
                //*/
                
            //}
        //}
    //});
    addField2();
    addField2();
    
}
var nn = 0;
function addField2() {
    addField(co, "field" + nn); 
    nn++;

}
function addField(container, id) {  
    fields[id] = true;
    $("#belowOptionsContainer").css("top", $(co).offset().top + $(co).height());
    let row = htmlToElements(
    "<div id='" + id +"'>" +
        "<div class='row'>" + 
            "<div class='col-5'>" +
                "Action" +
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
                "<input id='" + id + "action3' class='validation-needed form-control form-control-sm' type='text'></input>" +
                "<div class='invalid-feedback'>Required field</div>" +
            "</div>" +
            "<div class='col-1'>" + 
                "<input id='" + id + "action4' class='form-check-input' type='checkbox'></input>" +
                "<label id='" + id + "action5' class='form-check-label'>Audio?</label>" + 

            "</div>" + 
            "<div class='col-1'>" +
                "<input id='" + id + "shortcut1' class='validation-needed form-control form-control-sm' type='text'></input>" + 
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
        "<div class='row ml-1 mb-3'>" +
            "<div class='col-5'>" +
                "<small class='text-muted'>Explanation: <span id='" + id + "explanation'></span></small>" +
            "</div>" +
        "</div>" +
    "</div>");
    $(container).append(row);


    $("#" + id + "delete").on("click", ev => {
        console.log("delete this"); 
        delete fields[ev.target.id.substring(0,6)];
        console.log(fields);
        $("#" + ev.target.id.substring(0,6)).remove();
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

    // let patternActions = ".";
    // for (let i = 1; i <= 5; i++) id
    // $(".

    //gotta update explanation
    

    $("[id*='" + id + "action").on("change keyup", ev => {
        console.log("change/keyup");
        let expl = "";
        if ($("#" + id + "action1").val() == "move") {
            expl += "Move to tab on the ";
            if ($("#" + id + "action2").val() == "right") expl += "right.";
            else expl += "left.";
        } else {
            expl += "Move to the first tab with title containing word \"" + $("#" + id + "action3").val() + "\"";
            if ($("#" + id + "action4").is(":checked")) expl += " and playing audio";
            expl += ". Pressing shortcut again returns you to the original tab.";
        }
        
        console.log(expl);
        console.log("#" + id + "explanation");
        $("#" + id + "explanation").text(expl);
    });
    $(document.body).ready(() => {
        $("#" + id + "action1").trigger("change");

    });
    $(document.body).append(container);
}
function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}
function saveChanges() {
    console.log("m");
    $(".validation-needed").each((i, element) => {
        console.log("visible", $(element).is(":visible"));
        if ($(element).is(":visible")) {
            $(element).trigger("keyup");
        }
        
    });
    let fail = false;
    $(".is-invalid").each((i, element) => {
        fail = true;
        return;
    });
    if (!fail) {
        console.log("able to save current changes");
        
        configuration = [];
        for (id in fields) {
            let cc = {};
            cc["mode"] = $("#" + id + "action1").val();
            cc["direction"] = $("#" + id + "action2").val();
            cc["pattern"] = $("#" + id + "action3").val();
            cc["audio"] = $("#" + id + "action4").is(":checked");
            cc["key"] = $("#" + id + "shortcut1").val();
            cc["shiftKey"] = $("#" + id + "shortcut2").is(":checked");
            cc["ctrlKey"] = $("#" + id + "shortcut4").is(":checked");
            cc["metaKey"] = $("#" + id + "shortcut6").is(":checked");
            cc["altKey"] = $("#" + id + "shortcut8").is(":checked");
            configuration.push(cc);
            //let str = "[id^='" + id + "']";
            //$(str).each((i, element) => {
                //console.log(i);
                //console.log(element); 
            //});
            
        }
        console.log(configuration);
        //chrome.storage.sync.set({"configuration": configuration}, function() {
            //saved
        //});
    }

    else {
        console.log("not able to save current changes");
    }
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

