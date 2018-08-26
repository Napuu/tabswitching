//this means toggling to some specific tab and back
//for example you toggle "to" whatsapp "from" certain tab
var toggled = {"to": -1, "from": -1};
chrome.tabs.onHighlighted.addListener(function (c) {
    getTabsCurrentWindow(function (tabs) {
        getActiveTab(function (currentTab) {   
            if (toggled.to != -1 && currentTab.id != toggled.from.id) {
                // toggled.to = -1;
                // toggled.from = -1;
                console.log("??");
            }
        });
    });
});
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message == "reloadOptions") {
            loadOptions();
        }
    });
// there is actually exactly one option right now 
var custom1 = "";
function loadOptions() {
    // console.log("options loaded");
    chrome.storage.local.get(["custom1"], res => {
         custom1 = res.custom1;
    });
}
loadOptions();
chrome.commands.onCommand.addListener(function(command) {
    if (command.includes("move")) {
        getTabsCurrentWindow(function (tabs) {
            getActiveTab(function (currentTab) {
                toggled.to = -1;
                toggled.from = -1;
                var newIndex = currentTab.index;
                if (command == "moveleft") {
                    newIndex--;
                    if (newIndex == -1) newIndex = tabs.length - 1;
                } else if (command == "moveright") {
                    newIndex++;
                    if (newIndex == tabs.length) newIndex = 0;
                }
                activateTab(tabs[newIndex].id);
                
            });
        });
    } else if (command.includes("toggle")) {
        getTabsCurrentWindow(function (tabs) {
            getActiveTab(function (currentTab) {
                // this is going to fetched from extensions own settings soontm
                // console.log("current situation before doing anything");
                // console.log(toggled);
                // console.log(command);

                // console.log("changes start here");
                var props = {windowType: "normal", currentWindow: true};
                if (command == "toggle1") {
                    // app = "WhatsApp";
                    props.title = "*" + custom1 + "*";
                } else if (command == "toggle2") {
                    props.audible = true;
                }
                if (toggled.to != command) {
                    chrome.tabs.query(props, function (tabs) {
                        if (tabs.length == 0) return;
                        activateTab(tabs[0].id);
                        toggled.to = command;
                        toggled.from = currentTab;
                    }); 
                } else {
                    activateTab(toggled.from.id);
                    toggled.to = -1;
                    toggled.from = -1;
                }
                // console.log("changes made");
                // console.log(toggled);
            });
        })
    }
    
});

function getActiveTab(callback) {
    current = -1;
    chrome.tabs.query({active:true, windowType:"normal", currentWindow: true}, function(d){
        current = d[0];
        callback(current);
    });
}

function activateTab(tabId) {
    // console.log(tabId
    chrome.tabs.update(tabId, {active: true});
    getActiveTab(currentTab => {
        console.log(currentTab.id + "; " + tabId); 
    });
}

function getTabsCurrentWindow(callback) {
    tabs = [];
    chrome.tabs.query({windowType:"normal", currentWindow: true},function(d) {
        tabs = d;
        callback(tabs);
    })
}
