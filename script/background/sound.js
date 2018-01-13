FKGLancher.sound.toggleSoundMute = function() {
    if (!FKGLancher.window) return;

    var tab = FKGLancher.window.tabs[0];
    chrome.tabs.update(tab.id, {
        "muted": !tab.mutedInfo.muted
    });
}
