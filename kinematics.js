function forwardKinematics(segs, angles) {
  for (var i = 0; i < segs.length; i++) {
    if (i != 0) {
      segs[i].setPosition(
        Math.cos(segs[i - 1].getAngle()) * segs[i - 1].getLength() +
          segs[i - 1].getPosition().x,
        Math.sin(segs[i - 1].getAngle()) * segs[i - 1].getLength() +
          segs[i - 1].getPosition().y
      );
    }
    var temp = 0;
    for (var n = i; n >= 0; n--) temp += angles[n];
    segs[i].setAngle(temp);
  }
}

function inverseKinematics(segs, x, y, tolerance, iteration) {
  var angles = [];

  angles[0] = segs[0].getAngle();
  for (var i = 1; i < segs.length; i++) {
    angles[i] = segs[i].getAngle() - segs[i - 1].getAngle();
  }

  forwardKinematics(segs, angles);

  var n = 0;

  while (
    distanceFromPoint(segs[segs.length - 1], x, y) > tolerance &&
    n < 100
  ) {
    for (var i = segs.length - 1; i >= 0; i--) {
      var intitialDistance = distanceFromPoint(segs[segs.length - 1], x, y);

      var direction = 0;

      angles[i] -= iteration;

      forwardKinematics(segs, angles);

      var distance = distanceFromPoint(segs[segs.length - 1], x, y);

      if (intitialDistance - distance > 0) direction = -1;
      else direction = 1;
      //console.log(direction);

      intitialDistance = 0;
      distance = 0;

      n++;

      while (intitialDistance - distance >= 0) {
        intitialDistance = distanceFromPoint(segs[segs.length - 1], x, y);

        angles[i] += direction * iteration;

        forwardKinematics(segs, angles);

        distance = distanceFromPoint(segs[segs.length - 1], x, y);
      }
      //console.log(distance);
    }
  }
}

function distanceFromPoint(seg, x, y) {
  var distX =
    seg.getPosition().x + seg.getLength() * Math.cos(seg.getAngle()) - x;
  var distY =
    seg.getPosition().y + seg.getLength() * Math.sin(seg.getAngle()) - y;

  return Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
}
