var FKGLancher = {
    "window": null,
    "gameSize": {
        "width": 960,
        "height": 640
    },
    "gameUrl": "http://pc-play.games.dmm.co.jp/play/flower-x"
};

FKGLancher.init = function() {
    FKGLancher.initEvent();
    FKGLancher.initMessage();
}


FKGLancher.initEvent = function() {
    chrome.webNavigation.onDOMContentLoaded.addListener(function(details) {
        if (FKGLancher.window && details.tabId == FKGLancher.window.tabs[0].id) {
            chrome.tabs.executeScript(FKGLancher.window.tabs[0].id, {
                "file": "onDOMContentLoaded.js"
            }, function() {});
        }
    });

    chrome.windows.onRemoved.addListener(function(windowId) {
        if (FKGLancher.window && FKGLancher.window.id == windowId) {
            FKGLancher.window = null;
        }
    });
}


FKGLancher.showNotification = function(title, message) {
    chrome.notifications.create({
        "type": "basic",
        "iconUrl": chrome.runtime.getManifest().browser_action.default_icon,
        "title": title,
        "message": message
    });
}

FKGLancher.initMessage = function() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.name === "FKGLancher_Message") {
            switch (request.messageType) {
                case "openGameWindow":
                    FKGLancher.openGameWindow();
                    break;
                case "screenShot":
                    FKGLancher.screenShot();
                    break;
                case "mute":
                    FKGLancher.toggleSoundMute();
                    break;

                case "zoom_normal":
                    break;
                case "zoom_full":
                    FKGLancher.toggleFullscreen();
                    break;
                case "zoom_in":
                    break;
                case "zoom_out":
                    break;

                default:
                    console.log(request.messageType);
            }
        }
    });
}

FKGLancher.openGameWindow = function() {
    if (FKGLancher.window) {
        chrome.windows.update(FKGLancher.window.id, {
            "focused": true
        });
        return;
    }

    chrome.windows.create({
            "url": FKGLancher.gameUrl,
            "focused": true,
            "type": "popup",
            "left": 100,
            "top": 100,
            "width": FKGLancher.gameSize.width,
            "height": FKGLancher.gameSize.height
        },
        function(newWindow) {
            FKGLancher.window = newWindow;
            FKGLancher.resizeMainWindow(FKGLancher.gameSize.width, FKGLancher.gameSize.height);
        }
    );
}

FKGLancher.resizeMainWindow = function(_width, _height) {
    if (!FKGLancher.window) {
        return;
    }
    chrome.windows.get(FKGLancher.window.id, {
        "populate": true
    }, function(win) {
        chrome.windows.update(win.id, {
            "width": Math.floor(_width) + (win.width - win.tabs[0].width),
            "height": Math.floor(_height) + (win.height - win.tabs[0].height),
            "focused": true
        });
    });
}

FKGLancher.screenShot = function() {
    if (!FKGLancher.window) {
        return;
    }

    chrome.tabs.captureVisibleTab(
        FKGLancher.window.id, {
            "format": "png"
        },
        function(dataUrl) {
            var d = new Date();
            var yyyy = d.getYear();
            var MM = d.getMonth() + 1;
            var dd = d.getDate();
            var hh = d.getHours();
            var mm = d.getMinutes();
            var ss = d.getSeconds();
            if (yyyy < 2000) yyyy += 1900;
            if (MM < 10) MM = "0" + MM;
            if (dd < 10) dd = "0" + dd;
            if (hh < 10) hh = "0" + hh;
            if (mm < 10) mm = "0" + mm;
            if (ss < 10) ss = "0" + ss;
            var filename = '' + yyyy + '_' + MM + dd + '_' + hh + mm + '_' + ss;

            chrome.downloads.download({
                "url": dataUrl,
                "filename": "FKG_ScreenShot/" + filename + ".png"
            });
        }
    );
}

FKGLancher.toggleSoundMute = function() {
    if (!FKGLancher.window) {
        return;
    }
    chrome.tabs.get(FKGLancher.window.tabs[0].id, function(tab) {
        chrome.tabs.update(tab.id, {
            "muted": !tab.mutedInfo.muted
        });
    });
}

FKGLancher.toggleFullscreen = function() {
    if (!FKGLancher.window) {
        return;
    }
    chrome.windows.get(FKGLancher.window.id, {
        "populate": false
    }, function(win) {
        if (win.state != "fullscreen") {
            chrome.windows.update(win.id, {
                "state": "fullscreen",
                "focused": true
            });
        } else {
            chrome.windows.update(win.id, {
                "state": "normal",
                "focused": true
            });
        }
    });
}

FKGLancher.init();
