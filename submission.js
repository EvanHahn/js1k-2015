// jshint ignore: start

/*

a = canvases
b = body
s = canvas size

T = tick

X, Y, Z, and _ are temporary

*/


document.documentElement.style.cssText = 'width:100%;height:100%;display:table;background:#333;font-family:"Helvetica Neue",sans-serif;font-weight:100';
b.style.cssText = 'display:table-cell;vertical-align:middle;text-align:center';

t = Infinity;
a = 'second minute hour day week month year'.split(' ').map(function(unit, index) {

  _ = document.createElement('canvas');
  s = _.width = _.height = innerWidth / 7;

  _.m = [1000, 60000, 3600000, 86400000, 604800000, 2629800000, 31557600000][index];

  _.e = function() {
    Z = new Date;
    switch (unit) {
      case 'year':
        Z.setMonth(0);
      case 'month':
        Z.setDate(1);
      case 'week':
      case 'day':
        Z.setHours(0);
      case 'hour':
        Z.setMinutes(0);
      case 'minute':
        Z.setSeconds(0);
      case 'second':
        Z.setMilliseconds(0);
    }
    if (unit === 'week') {
      Z.setDate(Z.getDate() - Z.getDay());
    }
    Z.setTime(Z.getTime() + this.m - 1);
    return Z;
  };

  _.c = _.getContext('2d');
  _.c.lineWidth = s * 0.01;

  (Y = document.createElement('div')).innerHTML = unit;
  (X = document.createElement('div')).appendChild(_);
  X.style.cssText = 'display:inline-block;color:' + (_.c.fillStyle = _.c.strokeStyle = ['#fa8072', '#faad72', '#fada72', '#acda72', '#87ceeb', '#87aceb', '#a4b7eb'][index]) + ';font-size:' + (s / 8) + 'px';
  (b.appendChild(X)).appendChild(Y);

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

  });

  requestAnimationFrame(T);

})();
