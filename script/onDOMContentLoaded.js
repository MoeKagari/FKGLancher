var findFKGAndFitToWindow = function() {
    if (document.getElementById("game_frame") == null) return;

    var bodyRect = document.body.getBoundingClientRect();
    if (bodyRect.left == 0 || bodyRect.top == 0) {
        document.body.style.position = "fixed";
        document.body.style.overflow = "hidden";
        document.body.style.margin = "0px";
        fitToWindow();
    }
}

var fitToWindow = function() {
    var gameFrameRect = document.getElementById("game_frame").getBoundingClientRect();
    var bodyRect = document.body.getBoundingClientRect();

    var offsetX = Math.round(gameFrameRect.left) + (Math.round(gameFrameRect.width) - 960) / 2;
    var offsetY = Math.round(gameFrameRect.top) //
        +
        0 //gameFrame 上方的空白
        -
        0 //gameFrame 之后会resize,body上方与gameFrame上方缩短了19
    ;

    var destinationX = 0 - offsetX;
    var destinationY = 0 - offsetY;

    document.body.style.left = "" + destinationX + "px";
    document.body.style.top = "" + destinationY + "px";
}

findFKGAndFitToWindow();
