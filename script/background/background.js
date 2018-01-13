var FKGLancher = {
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

FKGLancher.init = function() {
    //由于 "persistent": false
    //FKGLancher 并不是常驻于内存,有必要将 window localStorage
    this.window = JSON.parse(localStorage.getItem(FKGLancher.windowKey));

    chrome.browserAction.onClicked.addListener(function(tab) {
        FKGLancher.other.openGameWindow();
    });
    chrome.webNavigation.onDOMContentLoaded.addListener(function(details) {
        if (FKGLancher.window) {
            if (FKGLancher.window.tabs[0].id == details.tabId) {
                chrome.tabs.executeScript(details.tabId, {
                    "file": "script/onDOMContentLoaded.js"
                });
            }
        }
    });
    chrome.windows.onRemoved.addListener(function(windowId) {
        if (FKGLancher.window) {
            if (FKGLancher.window.id == windowId) {
                FKGLancher.window = null;
                localStorage.removeItem(FKGLancher.windowKey);
                chrome.browserAction.setPopup({
                    "popup": ""
                });
            }
        }
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.name === "FKGLancher_Message") {
            switch (request.messageType) {
                case "openGameWindow":
                    FKGLancher.other.openGameWindow();
                    break;
                case "screenShot":
                    FKGLancher.screenShot.take();
                    break;
                case "mute":
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
}

FKGLancher.init();
chrome.runtime.onInstalled.addListener(function() {
    localStorage.removeItem(FKGLancher.windowKey);
});
