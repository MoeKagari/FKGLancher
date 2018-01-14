FKGLancher.other.openGameWindow = function() {
    if (FKGLancher.window) {
        FKGLancher.other.getWindowState(function(window) {
            chrome.windows.update(window.id, {
                "focused": true
            });
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
            FKGLancher.setWindow(newWindow);

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

FKGLancher.other.showNotification = function(title, message) {
    chrome.notifications.create({
        "type": "basic",
        "iconUrl": chrome.runtime.getManifest().browser_action.default_icon,
        "title": title,
        "message": message
    });
}

FKGLancher.other.getWindowState = function(handler) {
    if (!FKGLancher.window) return;
    chrome.windows.get(FKGLancher.window.id, function(window) {
        handler(window);
    });
}

FKGLancher.other.getTabState = function(handler) {
    if (!FKGLancher.window) return;
    chrome.tabs.get(FKGLancher.window.tabs[0].id, function(tab) {
        handler(tab);
    });
}
