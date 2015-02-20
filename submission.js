// jshint ignore: start

/*

a = canvases
b = body
s = canvas size
t = text size

I = intervals
T = tick

X, Y, Z, and _ are temporary

*/

I = 'sec min hr day wk mon yr'.split(' ');

document.documentElement.style.cssText = 'width:100%;height:100%;display:table;background-color:#333';
b.style.cssText = 'display:table-cell;vertical-align:middle;text-align:center';

t = Infinity;
a = I.map(function(unit, index) {

  _ = document.createElement('canvas');
  s = _.width = _.height = innerWidth / 7;
  b.style.fontSize = (s / 8) + 'px';

  _.u = unit;

  _.m = [1000, 60000, 3600000, 86400000, 604800000, 2629800000, 31557600000][index];

  _.e = function(result) {
    result = new Date;
    switch (unit) {
      case 'yr':
        result.setMonth(0);
      case 'mon':
        result.setDate(1);
      case 'wk':
      case 'day':
        result.setHours(0);
      case 'hr':
        result.setMinutes(0);
      case 'min':
        result.setSeconds(0);
      case 'sec':
        result.setMilliseconds(0);
    }
    if (unit === 'wk') {
      result.setDate(result.getDate() - result.getDay());
    }
    result.setTime(result.getTime() + this.m - 1);
    return result;
  };

  _.c = _.getContext('2d');
  _.c.fillStyle = _.c.strokeStyle = ['#fa8072', '#faad72', '#fada72', '#acda72', '#87ceeb', '#87aceb', '#a4b7eb'][index];
  _.c.lineWidth = s * 0.01;
  _.c.textAlign = 'center';
  _.c.textBaseline = 'middle';

  b.appendChild(_);

  $ = 1;
  do {
    _.c.font = '100 ' + $ + 'px sans-serif';
    $ ++;
  } while (_.c.measureText(unit).width < (s * 0.8));
  t = Math.min(t, $);

  return _;

});

(function T() {

  a.forEach(function(canvas) {

    canvas.c.clearRect(0, 0, s, s);

    canvas.c.beginPath();
    canvas.c.moveTo(s / 2, s / 2);
    canvas.c.arc(s / 2, s / 2, s * 0.45, 0, 2 * Math.PI * ((canvas.e() - new Date) / canvas.m));
    canvas.c.fill();

    canvas.c.beginPath();
    canvas.c.moveTo(s / 2, s / 2);
    canvas.c.arc(s / 2, s / 2, s * 0.45, 0, 2 * Math.PI);
    canvas.c.stroke();

    canvas.c.font = '100 ' + t + 'px sans-serif';
    canvas.c.fillText(canvas.u, s / 2, s / 2);

  });

  requestAnimationFrame(T);

})();
