FKGLancher.sound.toggleSoundMute = function() {
    FKGLancher.other.getTabState(function(tab) {
        chrome.tabs.update(tab.id, {
            "muted": !tab.mutedInfo.muted
        });
    });
}
