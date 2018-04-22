chrome.runtime.onInstalled.addListener(function() {
    test = "test"
    console.log("moikkamoi");
});
var wPrevTabId = -1;
var tPrevTabId = -1;

//this means toggling to some specific tab and back
//for example you toggle "to" whatsapp "from" certain tab
var toggled = {"to": -1, "from": -1};
chrome.tabs.onHighlighted.addListener(function (c) {
    getTabsCurrentWindow(function (tabs) {
        getActiveTab(function (currentTab) {
            //a
            //var fail = false;
            //for (var i = 0; i < tabs.length; i++) {
                //if (tabs[i].id == currentTab.id && wPrevTabId != -1 && !tabs[i].title.includes("WhatsApp")) {
                    //fail = true;
                    //break;
                //}
                //if (tabs[i].id == currentTab.id && tPrevTabId != -1 && !tabs[i].title.includes("Telegram")) {
                    //fail = true;
                    //break;
                //}
            //}
            //b
            
            if (toggled.to != -1 && !currentTab.title.includes(toggled.to) && currentTab.id != toggled.from.id) {
                toggled.to = -1;
                toggled.from = -1;
            }


            //if (fail) {
                //wPrevTabId = -1;
                //tPrevTabId = -1;
            //}
        });
    });
});
chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);
    

    if (command.includes("move")) {
        getTabsCurrentWindow(function (tabs) {
            getActiveTab(function (currentTab) {
                for (var i = 0; i < tabs.length; i++) {
                    if (tabs[i].id == currentTab.id) {
                        if (command == "moveright") {
                            if (tabs.length > i+1) {
                                activateTab(tabs[i+1].id);
                            }
                            else console.log("already at last tab")
                        }
                        else if (command == "moveleft") {
                            if (i-1 >= 0) {
                                activateTab(tabs[i-1].id);
                            }
                            else console.log("already at first tab")
                        }
                    }
                }
            });
        });
    } else if (command.includes("toggle")) {
        getTabsCurrentWindow(function (tabs) {
            getActiveTab(function (currentTab) {
                var app = command.substring(6);
                            if (toggled.to != app) {
                    for (var i = 0; i < tabs.length; i++) {
                        if (tabs[i].title.includes(app) && tabs[i].id != currentTab.id) {
                            activateTab(tabs[i].id);
                            toggled.to = app;
                            toggled.from = currentTab;
                        }
                    }
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
