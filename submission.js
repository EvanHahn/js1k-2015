// jshint ignore: start

(function() {

  var canvasWidth = a.width;
  var canvasHeight = a.height;
  var centerX = canvasWidth / 2;
  var centerY = canvasHeight / 2;
  var mouseX = centerX;
  var mouseY = centerY;
  var scalar = Math.min(centerX, centerY);

  b.style.background = '#666';
  b.style.cursor = 'none';

  a.onmousemove = function(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
  };

  // a.onclick = function(event) {
  //   shootTo(event.pageX, event.pageY);
  // };

  var lastTick = 0;
  function tick(t) {

    var dt = t - lastTick;
    lastTick = t;

    c.clearRect(0, 0, canvasWidth, canvasHeight);

    c.beginPath();
    c.arc(mouseX, mouseY, 0.1 * scalar, 0, 7);
    c.stroke();

    requestAnimationFrame(tick);

  }

  tick(0);

})();
