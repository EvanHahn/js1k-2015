// jshint ignore: start

/*

a = canvases
b = body
s = canvas size

I = intervals
T = tick

$ and _ are temporary

*/

I = 'second minute hour day week month year'.split(' ');

a = I.map(function(unit, index) {

  _ = document.createElement('canvas');
  s = _.width = _.height = innerWidth / 8;

  _.e = function(result) {
    result = new Date;
    switch (unit) {
      case 'year':
        result.setMonth(0);
      case 'month':
        result.setDate(1);
      case 'week':
      case 'day':
        result.setHours(0);
      case 'hour':
        result.setMinutes(0);
      case 'minute':
        result.setSeconds(0);
      case 'second':
        result.setMilliseconds(0);
    }
    if (unit === 'week') {
      result.setDate(result.getDate() - result.getDay() + 7)
    }
    return result;
  };

  _.m = [31557600000, 2629800000, 604800000, 86400000, 3600000, 60000, 1000][index];

  _.c = _.getContext('2d');

  b.appendChild(_);

  return _;

});

(function T() {

  a.forEach(function(canvas) {

    with (canvas.getContext('2d')) {

      clearRect(0, 0, s, s);

      beginPath();
      moveTo(s / 2, s / 2);
      arc(s / 2, s / 2, s * 0.45, 0, 2 * Math.PI * ((canvas.e() - new Date) / canvas.m));
      fill();
    }

  });

  requestAnimationFrame(T);

})();
