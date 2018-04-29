//this means toggling to some specific tab and back
//for example you toggle "to" whatsapp "from" certain tab
var toggled = {"to": -1, "from": -1};
chrome.tabs.onHighlighted.addListener(function (c) {
    getTabsCurrentWindow(function (tabs) {
        getActiveTab(function (currentTab) {   
            if (toggled.to != -1 && !currentTab.title.includes(toggled.to) && currentTab.id != toggled.from.id) {
                toggled.to = -1;
                toggled.from = -1;
            }
        });
    });
});

chrome.commands.onCommand.addListener(function(command) {
    if (command.includes("move")) {
        getTabsCurrentWindow(function (tabs) {
            getActiveTab(function (currentTab) {
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
                var app = command.substring(6);
                if (toggled.to != app) {
                    var props = {windowType: "normal", currentWindow: true, title: ("*" + app + "*")};
                    // if (app == "YouTube") props.audible = true;
                    chrome.tabs.query(props, function (tabs) {
                        activateTab(tabs[0].id);
                        toggled.to = app;
                        toggled.from = currentTab;
                    }); 
                } else {
                    activateTab(toggled.from.id);
                    toggled.to = -1;
                    toggled.from = -1;
                }
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
    chrome.tabs.update(tabId, {active: true});
}

function getTabsCurrentWindow(callback) {
    tabs = [];
    chrome.tabs.query({windowType:"normal", currentWindow: true},function(d) {
        tabs = d;
        callback(tabs);
    })
}
