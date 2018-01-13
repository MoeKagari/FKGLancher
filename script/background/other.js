FKGLancher.other.showNotification = function(title, message) {
    chrome.notifications.create({
        "type": "basic",
        "iconUrl": chrome.runtime.getManifest().browser_action.default_icon,
        "title": title,
        "message": message
    });
}

FKGLancher.other.openGameWindow = function() {
    if (FKGLancher.window) {
        chrome.windows.update(FKGLancher.window.id, {
            "focused": true
        });
        return;
    }

    chrome.browserAction.setPopup({
        "popup": "popup.html"
    });
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
            localStorage.setItem(FKGLancher.windowKey, JSON.stringify(newWindow));

            var width = FKGLancher.gameSize.width + (newWindow.width - newWindow.tabs[0].width);
            var height = FKGLancher.gameSize.height + (newWindow.height - newWindow.tabs[0].height);
            chrome.windows.update(newWindow.id, {
                "width": width,
                "height": height,
                "focused": true
            });
        }
    );
}
