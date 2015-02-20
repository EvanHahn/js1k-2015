// jshint ignore: start

/*

a = canvases
b = body
h = half the canvas size
s = canvas size

I = intervals
T = tick

X, Y, Z, and _ are temporary

*/

I = 'second minute hour day week month year'.split(' ');

document.documentElement.style.cssText = 'width:100%;height:100%;display:table;font-family:sans-serif';
b.style.cssText = 'display:table-cell;vertical-align:middle;text-align:center';

a = I.map(function(unit, index) {

  X = document.createElement('div');
  X.style.display = 'inline-block';

  _ = document.createElement('canvas');
  s = _.width = _.height = innerWidth / 8;

  _.id = unit;

  _.m = [1000, 60000, 3600000, 86400000, 604800000, 2629800000, 31557600000][index];

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
      // TODO this is broken
      result.setDate(result.getDate() - result.getDay() + 7);
    }
    result.setTime(result.getTime() + this.m - 1);
    return result;
  };

  _.c = _.getContext('2d');

  X.appendChild(_);
  X.appendChild(Y = document.createElement('div'));
  Y.innerHTML = unit;
  b.appendChild(X);

  return _;

});

h = s / 2;

(function T() {

  a.forEach(function(canvas) {

    canvas.c.clearRect(0, 0, s, s);

    canvas.c.beginPath();
    canvas.c.moveTo(h, h);
    canvas.c.arc(s / 2, s / 2, s * 0.45, 0, 2 * Math.PI * ((canvas.e() - new Date) / canvas.m));
    canvas.c.fill();

  });

  requestAnimationFrame(T);

})();
