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
function addField(container, id) {
    
    let row = htmlToElements("<div class='row'>" +
        "<div class='col-4'>" + 
            "<select id='" + id + "action1'>" + 
                "<option>move</option>" +
                "<option>toggle</option>" + 
            "</select>" +
            "<select id='" + id + "action2'>" + 
                "<option>right</option>" +
                "<option>left</option>" +
            "</select>" +
            "<input id='" + id + "action3' type='text'>" +
            "</input>" +
        "</div>" +
        "<div class='col-8'>moi taas</div>" +
        "</div>");
    $(container).append(row);

    $("#" + id + "action3").hide();
    $("#" + id + "action1").on("change", ev => {
        if (ev.target.value == "move") {
            $("#" + id + "action2").show(); 
            $("#" + id + "action3").hide(); 
        } else {
            $("#" + id + "action2").hide(); 
            $("#" + id + "action3").show(); 
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
