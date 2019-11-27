class Segment {
  constructor(x, y, angle, len, twoInstance) {
    this.x = x;
    this.y = y;
    this.length = len;
    this.rect = twoInstance.makeRectangle(0, 0, len, len / 10);
    this.rect.rotation = angle;
    this.rect.translation.set(x + len / 2, y);
    this.point = twoInstance.makeGroup(this.rect);
  }

  setAngle(angle) {
    this.point.rotation = angle;
  }

  getAngle() {
    return this.point.rotation;
  }

  getLength() {
    return this.length;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  getComponents() {
    return {
      x: this.length * Math.cos(this.point.rotation),
      y: this.length * Math.sin(this.point.rotation)
    };
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.point.translation.set(x, y);
  }
}
