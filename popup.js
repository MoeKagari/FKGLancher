var ulIdArray = ["operation_normal", "operation_zoom"];
for (ulId of ulIdArray) {
    var liArray = document.getElementById(ulId).getElementsByTagName("li");
    for (var index = 0, length = liArray.length; index < length; index++) {
        if (index != length - 1) { //相当于行间距
            liArray[index].style.marginBottom = "5px";
        }
    }
}



//打开游戏窗口
document.getElementById("openGameWindow").onclick = function() {
    chrome.runtime.sendMessage({
        "name": "FKGLancher_Message",
        "messageType": "openGameWindow"
    });
};
//截图
document.getElementById("screenShot").onclick = function() {
    chrome.runtime.sendMessage({
        "name": "FKGLancher_Message",
        "messageType": "openGameWindow"
    });
    chrome.runtime.sendMessage({
        "name": "FKGLancher_Message",
        "messageType": "screenShot"
    });
};
//静音
document.getElementById("sound_mute").onclick = function() {
    chrome.runtime.sendMessage({
        "name": "FKGLancher_Message",
        "messageType": "sound_mute"
    });
};




//标准size
document.getElementById("zoom_normal").onclick = function() {
    chrome.runtime.sendMessage({
        "name": "FKGLancher_Message",
        "messageType": "zoom_normal"
    });
};
//全屏
document.getElementById("zoom_full").onclick = function() {
    chrome.runtime.sendMessage({
        "name": "FKGLancher_Message",
        "messageType": "zoom_full"
    });
};
//放大
document.getElementById("zoom_in").onclick = function() {
    chrome.runtime.sendMessage({
        "name": "FKGLancher_Message",
        "messageType": "zoom_in"
    });
};
//缩小
document.getElementById("zoom_out").onclick = function() {
    chrome.runtime.sendMessage({
        "name": "FKGLancher_Message",
        "messageType": "zoom_out"
    });
};




//设置页面
document.getElementById("setting").onclick = function() {
    chrome.runtime.openOptionsPage();
};
