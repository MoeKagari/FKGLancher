FKGLancher.screenShot.take = function() {
    FKGLancher.other.getWindowState(function(window) {
        setTimeout(function() {
            chrome.tabs.captureVisibleTab(window.id, {
                    "format": "png"
                },
                function(dataUrl) {
                    chrome.downloads.download({
                        "url": dataUrl,
                        "filename": "FKGLancher_ScreenShot/" + FKGLancher.screenShot.getFileName() + ".png"
                    });
                }
            );
        }, 1000);
    });
}

FKGLancher.screenShot.getFileName = function() {
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

    return '' + yyyy + '_' + MM + dd + '_' + hh + mm + '_' + ss;
}
