// jshint ignore: start

(function() {

  var width = a.width;
  var height = a.height;
  b.removeChild(a);

  var centerX = width / 2;
  var centerY = height / 2;

  b.innerHTML += '<div id=p style="border:3px solid #009;background:#08b;width:50px;height:50px;position:absolute;margin-left:-25px;margin-top:-25px">';

  var playerX = centerX;
  var playerY = centerY;
  var playerAngle = 0;

  var playerVelocityX = 0;
  var playerVelocityY = 0;

  b.style.background = '#666';

  b.onmousemove = function(event) {
    playerAngle = Math.atan2(playerY - event.pageY, playerX - event.pageX);
  };

  b.onkeydown = function(event) {
    var keyCode = event.keyCode;
    console.log(keyCode);
    if (keyCode === 87) {
      playerVelocityY = -10;
    } else if (keyCode === 83) {
      playerVelocityY = 10;
    } else if (keyCode === 65) {
      playerVelocityX = -10;
    } else if (keyCode === 68) {
      playerVelocityX = 10;
    }
  };

  b.onkeyup = function(event) {
    var keyCode = event.keyCode;
    if ((keyCode === 87) || (keyCode === 83)) {
      playerVelocityY = 0;
    } else if ((keyCode === 65) || (keyCode === 68)) {
      playerVelocityX = 0;
    }
  };

  var lastTick = 0;
  function tick(t) {

    var dt = (t - lastTick) / 100;
    lastTick = t;

    p.style.transform = 'rotate(' + (playerAngle * 180 / Math.PI) + 'deg)';
    p.style.left = playerX + 'px';
    p.style.top = playerY + 'px';

    playerX += playerVelocityX * dt;
    playerY += playerVelocityY * dt;

    requestAnimationFrame(tick);

  }

  tick(0);

})();
