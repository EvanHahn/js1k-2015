// jshint ignore: start

(function() {

  var width = a.width;
  var height = a.height;
  b.removeChild(a);

  var centerX = width / 2;
  var centerY = height / 2;

  b.style.background = '#111';
  b.style.cursor = 'crosshair';
  b.innerHTML += '<div id=p style="background:#ff9;width:50px;height:50px;position:absolute;margin-left:-25px;margin-top:-25px">';

  var playerX = centerX;
  var playerY = centerY;
  var playerAngle = 0;

  var playerVelocityX = 0;
  var playerVelocityY = 0;
  var playerAccelX = 0;
  var playerAccelY = 0;

  b.onmousemove = function(event) {
    playerAngle = Math.atan2(playerY - event.pageY, playerX - event.pageX);
  };

  b.onkeydown = function(event) {
    var keyCode = event.keyCode;
    if (keyCode == 87) {
      playerAccelY = -1;
    } else if (keyCode == 83) {
      playerAccelY = 1;
    } else if (keyCode == 65) {
      playerAccelX = -1;
    } else if (keyCode == 68) {
      playerAccelX = 1;
    }
  };

  b.onkeyup = function(event) {
    var keyCode = event.keyCode;
    if ((keyCode == 87) || (keyCode == 83)) {
      playerAccelY = 0;
    } else if ((keyCode == 65) || (keyCode == 68)) {
      playerAccelX = 0;
    }
  };

  var monsters = [];

  // =========
  // game loop
  // =========

  var lastTick = 0;
  var nextInterval = 1;

  (function tick(t) {

    var dt = (t - lastTick) / 50;
    lastTick = t;

    p.style.transform = 'rotate(' + (playerAngle * 180 / Math.PI) + 'deg)';
    p.style.left = playerX + 'px';
    p.style.top = playerY + 'px';
    p.style.boxShadow = '0 0 ' + ((Math.sin(t / 500) * 10) + 100) + 'px #ffb';

    playerX += playerVelocityX * dt;
    playerY += playerVelocityY * dt;
    playerVelocityX = handleVelocity(playerVelocityX, playerAccelX, dt);
    playerVelocityY = handleVelocity(playerVelocityY, playerAccelY, dt);

    requestAnimationFrame(tick);

  })(0);

  // =========
  // utilities
  // =========

  function handleVelocity(velocity, accel, dt) {
    velocity += accel * dt;
    if (velocity > 5) {
      return 5;
    } else if (velocity < -5) {
      return -5;
    } else if (velocity > 0) {
      return Math.max(velocity - dt * 0.7, 0);
    } else if (velocity < 0) {
      return Math.min(velocity + dt * 0.7, 0);
    }
    return 0;
  }

})();
