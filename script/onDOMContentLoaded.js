var cnt_b = 0;
var findFKGAndFitToWindow = function() {
    var gameFrame = document.getElementById("game_frame");

    if (gameFrame == null) {
        if (cnt_b < 10) {
            setTimeout(findShiroproAndFitToWindow, 500);
            cnt_b += 1;
        }
        return;
    }

    var bodyRect = document.body.getBoundingClientRect();
    if (bodyRect.left == 0 || bodyRect.top == 0) {
        document.body.style.position = "fixed";
        document.body.style.overflow = "hidden";
        document.body.style.margin = "0px";

        var bounds = gameFrame.getBoundingClientRect();
        var offsetX = Math.round(bounds.left) + (bounds.width - 960) / 2;
        var offsetY = Math.round(bounds.top);

        var bodyRect = document.body.getBoundingClientRect();
        var destinationX = bodyRect.left - offsetX;
        var destinationY = bodyRect.top - offsetY;

        document.body.style.left = "" + destinationX + "px";
        document.body.style.top = "" + destinationY + "px";

        //debug
        console.log(gameFrame);
        console.log(document.body);
        console.log("body left:" + bodyRect.left);
        console.log("body top:" + bodyRect.top);
        console.log("offsetX:" + offsetX);
        console.log("offsetY:" + offsetY);
        console.log(bodyRect);
        console.log(window.onresize);
    }
}

findFKGAndFitToWindow();
