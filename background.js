chrome.runtime.onInstalled.addListener(function() {
    test = "test"
    console.log("moikkamoi");
});
var wPrevTabId = -1;
var tPrevTabId = -1;
chrome.tabs.onHighlighted.addListener(function (c) {
    getTabsCurrentWindow(function (tabs) {
        getActiveTab(function (currentTabId) {
            var fail = false;
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].id == currentTabId && wPrevTabId != -1 && !tabs[i].title.includes("WhatsApp")) {
                    fail = true;
                    break;
                }
                if (tabs[i].id == currentTabId && tPrevTabId != -1 && !tabs[i].title.includes("Telegram")) {
                    fail = true;
                    break;
                }
            }
            if (fail) {
                wPrevTabId = -1;
                tPrevTabId = -1;
            }
            //for (var i = 0; i < tabs.length; i++) {
                //if (tabs[i].id != currentTabId) {
                    //chrome.tabs.update(tabs[i].id, {active: true});
                //} else {
                    //chrome.tabs.update(tabs[i].id, {active: false});
                //}
            //}
            //chrome.tabs.update(currentTabId, {active: true});
        });
    });
});
chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);
    //currentTab = 0;
    //chrome.tabs.query({active:true, windowType:"normal", currentWindow: true},function(d){
            //console.log(d[0].id);
            //currentTab = d[0].id;
    //})
    //TODO
    //täl hetkellä toi ylempi printtaa aktiivisen tabin id:n
    //alla oleva taas listaa kaikki nykyisen ikkunan tabid:t
    //vielä pitäis keksiä miten tabien välillä siirrytään
    //tä
    //chrome.tabs.query({windowType:"normal", currentWindow: true},function(d) {
        //for (var i = 0; i < d.length; i++) {
            //console.log(d[i].id);
                //if (d[i].id == currentTab) {
                    ////chrome.tabs.update(d[i+1].id, {active: true});
                    //activateTab(d[i+1].id);
                    //break;
                //}
        //}
    //})

    if (command.includes("move")) {
        getTabsCurrentWindow(function (tabs) {
            getActiveTab(function (currentTabId) {
                for (var i = 0; i < tabs.length; i++) {
                    if (tabs[i].id == currentTabId) {
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
            getActiveTab(function (currentTabId) {
                if (command.includes("whatsapp")) {
                    if (wPrevTabId == -1) { 
                        for (var i = 0; i < tabs.length; i++) {
                            if (tabs[i].title.includes("WhatsApp")) {
                                if (currentTabId == tabs[i].id) {
                                    wPrevTabId = -1;
                                    break;
                                }
                                activateTab(tabs[i].id);
                                wPrevTabId = currentTabId;
                                break;
                            }
                        }
                    } else {
                        activateTab(wPrevTabId);
                        wPrevTabId = -1;
                        tPrevTabId = -1;
                    }
                }
                if (command.includes("telegram")) {
                    if (tPrevTabId == -1) { 
                        for (var i = 0; i < tabs.length; i++) {
                            if (tabs[i].title.includes("Telegram")) {
                                if (currentTabId == tabs[i].id) {
                                    tPrevTabId = -1;
                                    break;
                                }
                                activateTab(tabs[i].id);
                                tPrevTabId = currentTabId;
                                break;
                            }
                        }
                    } else {
                        activateTab(tPrevTabId);
                        tPrevTabId = -1;
                        wPrevTabId = -1;
                    }
                }

            });
        })
    }
    
});

function getActiveTab(callback) {
    current = -1;
    chrome.tabs.query({active:true, windowType:"normal", currentWindow: true}, function(d){
        current = d[0].id;
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
