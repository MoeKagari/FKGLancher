var cnt_b = 0;
var findFKGAndFitToWindow = function() {
    var elGameFrame = document.getElementById("game_frame");

    if (elGameFrame == null) {
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

        var bounds = elGameFrame.getBoundingClientRect();
        var offsetX = Math.round(bounds.left);
        var offsetY = Math.round(bounds.top)

        //微调
        //game_frame的width为1048
        //game的width为960
        offsetX = offsetX + (1048 - 960) / 2;

        var bodyRect = document.body.getBoundingClientRect();

        //debug
        console.log(elGameFrame);
        console.log(document.body);
        console.log("body left:" + bodyRect.left);
        console.log("body top:" + bodyRect.top);
        console.log("offsetX:" + offsetX);
        console.log("offsetY:" + offsetY);
        console.log(bodyRect);
        console.log(window.onresize);

        var destinationX = bodyRect.left - offsetX;
        var destinationY = bodyRect.top - offsetY;

        document.body.style.left = "" + destinationX + "px";
        document.body.style.top = "" + destinationY + "px";
    }
}

findFKGAndFitToWindow();
