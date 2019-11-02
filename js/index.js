window.onload = function () {
    var img = $('img');
    var len = img.length;
    var deg = 360 / len;
    for (var i = 0; i < len; i++) {
        img.eq(i).css({
            transform: 'rotateY(' + deg * i + 'deg) translateZ(300px)',
            transition: 'transform 0.5s linear ' + (len - 1 - i) * 0.1 + 's',
        });
    }

}
bindEvent();

function bindEvent() {
    var startX, startY, nowX, nowY, disX, disY, roX = 0,
        roY = 0,
        oldX = 0,
        oldY = 0,
        timer,
        index = 0;
    $('body').on('mousedown', function (e) {
        clearInterval(timer);
        startX = e.clientX;
        startY = e.clientY;
        $('body').on('mousemove', function (e) {
            nowX = e.clientX;
            nowY = e.clientY;
            disX = nowX - startX;
            disY = nowY - startY;
            roX = oldX - disY * 0.2;
            roY = oldY + disX * 0.2;
            $('.box').css({
                transform: 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
            });
        });
        $('body').on('mouseup', function (e) {
            console.log('mouseup');
            oldX = roX;
            oldY = roY;
            $('body').off('mousemove');
            var dx = oldX * (20 / 1000);
            var dy = oldY * (20 / 1000);
            timer = setInterval(function () {
                roX = oldX -= dx;
                roY = oldY -= dy;
                $('.box').css({
                    transform: 'rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
                });
                if (Math.abs(roX) < 0.1 && Math.abs(roY) < 0.1) {
                    clearInterval(timer);
                }
            }, 20);
            $('body').off('mouseup');
        });
        return false;
    });
}