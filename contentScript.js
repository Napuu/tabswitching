var DEBUG = true;
if (DEBUG) console.log("content script attached");

// chrome.storage.sync.set({"key1": "value1"}, function() {
    // console.log('Value is set to ' + value);
// });

// chrome.storage.sync.get(['key1'], function(result) {
    // console.log('Value currently is ' + result["key1"]);
// });
let currentOptions = {val: {}};
loadOptions(currentOptions, doSomething);
function loadOptions(_options, callback) {
    chrome.storage.sync.get(["tabswitcher_options"], function (res) {
        if (Object.keys(res).length == 0) {
            if (DEBUG) console.log("no saved options found");
            setDefaults(_options, callback);
        } else {
            currentOptions.val = res["tabswitcher_options"];
        }
    });
}

document.addEventListener("keydown", ev => {
    // if (DEBUG) console.log(ev);
    for (a in currentOptions.val) {
        let fail = false;
        // console.log(currentOptions.val[a]);
        let features = currentOptions.val[a].eventFeatures;
        // console.log(features);
        for (b in features) {
            // console.log(ev[b] + ", " + features[b]);
            if (ev[b] != features[b]) fail = true;
            // console.log(features[features.keys()[i]]);
            // if (currentOptions[a].eventFeatures[b]
        }
        if (!fail) {
            if (DEBUG) console.log(currentOptions.val[a].action);
            chrome.runtime.sendMessage({msg: currentOptions.val[a].action}, function (resp) {});
            console.log("sending message");
        }
    }
});
function setDefaults(_options, callback) {
    _options.val = [{
        eventFeatures: {code: "KeyH", altKey: true, ctrlKey: false},
        action: "moveLeft",
        disabled: false
    },{
        eventFeatures: {code: "KeyL", altKey: true, ctrlKey: false},
        action: "moveRight",
        disabled: false
    },{
        eventFeatures: {code: "KeyW", altKey: true, ctrlKey: false},
        action: "toggleWhatsApp",
        disabled: false
    }];
    // chrome.storage.sync.set({"tabswitcher_options": _options.val});
    callback();
}
function doSomething() {
    if (DEBUG) console.log(currentOptions.val);
}
