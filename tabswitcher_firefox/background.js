// copy-pasted from my old chrome-extension https://github.com/napuu/tabswitcher
browser.commands.onCommand.addListener((request, sender, answer) => {
    console.log(request);
    getActiveTab(console.log);
    getTabsCurrentWindow(function (tabs) {
        getActiveTab(function (currentTab) {
            var newIndex = currentTab.index;
            if (request == "moveleft") {
                newIndex--;
                if (newIndex == -1) newIndex = tabs.length - 1;
            } else if (request == "moveright") {
                newIndex++;
                if (newIndex == tabs.length) newIndex = 0;
            }
            activateTab(tabs[newIndex].id);
            
        });
    });
})

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