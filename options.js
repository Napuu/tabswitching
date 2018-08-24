window.addEventListener("DOMContentLoaded", init, false);
function init() {
    let textfield = document.getElementById("custom1textfield");
    let saveButton = document.getElementById("custom1button");
    let savedIndicator = document.getElementById("savedIndicator");
    chrome.storage.local.get(["custom1"], function (res) {
        if (res.custom1 == undefined) {
            res.custom1 = "WhatsApp";
            // console.log("defaults loaded");
        } else {
            // console.log("options loaded from storage sync");
        }
        textfield.value = res.custom1;
    });
    saveButton.addEventListener("click", ev => {
        chrome.storage.local.set({"custom1": textfield.value }, function() {
            // joo
            // console.log("saved");
            chrome.runtime.sendMessage({message: "reloadOptions"}, function(response) {
                savedIndicator.style.display = "block";
                setTimeout(() => {
                    savedIndicator.style.display = "none";
                }, 1000);
            });
        }); 
    });
}
/* 
 *  chrome.storage.sync.get(['key'], function(result) {
          console.log('Value currently is ' + result.key);
        });
        */
