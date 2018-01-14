var FKGLancher = {
    //只能使用其中的 window的id 以及 tab的id
    "window": null,
    "windowKey": "WindowObj",

    "gameSize": {
        "width": 960,
        "height": 640
    },
    "gameUrl": "http://pc-play.games.dmm.co.jp/play/flower-x",

    "screenShot": {},
    "zoom": {},
    "sound": {},
    "other": {}
};

FKGLancher.setWindow = function(window) {
    FKGLancher.window = window;
    if (window) {
        localStorage.setItem(FKGLancher.windowKey, JSON.stringify(window));
    } else {
        localStorage.removeItem(FKGLancher.windowKey);
    }
    chrome.browserAction.setPopup({
        "popup": (window ? "popup.html" : "")
    });
};

//初始化
(function() {
    //由于 "persistent": false
    //FKGLancher 并不是常驻于内存,有必要将 window localStorage
    console.log("init");
    console.log(FKGLancher.window);
    FKGLancher.setWindow(JSON.parse(localStorage.getItem(FKGLancher.windowKey)));
    console.log("init over");
    console.log(FKGLancher.window);

    chrome.runtime.onInstalled.addListener(function() {
        console.log("onInstalled");
        console.log(FKGLancher.window);
        localStorage.removeItem(FKGLancher.windowKey);
    });
    chrome.browserAction.onClicked.addListener(function(tab) {
        console.log("onClicked");
        console.log(FKGLancher.window);
        FKGLancher.other.openGameWindow();
    });
    chrome.webNavigation.onDOMContentLoaded.addListener(function(details) {
        console.log("onDOMContentLoaded");
        console.log(FKGLancher.window);
        if (FKGLancher.window) {
            if (FKGLancher.window.tabs[0].id == details.tabId) {
                chrome.tabs.executeScript(details.tabId, {
                    "file": "script/onDOMContentLoaded.js"
                });
            }
        }
    });
    chrome.windows.onRemoved.addListener(function(windowId) {
        console.log("onRemoved");
        console.log(FKGLancher.window);
        if (FKGLancher.window) {
            if (FKGLancher.window.id == windowId) {
                FKGLancher.setWindow(null);
            }
        }
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log("onMessage");
        console.log(FKGLancher.window);
        if (request.name === "FKGLancher_Message") {
            switch (request.messageType) {
                case "openGameWindow":
                    FKGLancher.other.openGameWindow();
                    break;
                case "screenShot":
                    FKGLancher.screenShot.take();
                    break;
                case "sound_mute":
                    FKGLancher.sound.toggleSoundMute();
                    break;

                case "zoom_normal":
                    break;
                case "zoom_full":
                    FKGLancher.zoom.toggleFullscreen();
                    break;
                case "zoom_in":
                    break;
                case "zoom_out":
                    break;

                default:
                    console.log(request.messageType);
                    break;
            }
        }
    });
})();
