class polyAtr {
  constructor(
    stat = {
      flx: 50,
      str: 30,
      dex: 30,
      agl: 33,
      end: 23,
      sta: 34,
      ref: 34,
    },
    dim = 200,
    div = 10
  ) {
    this.stat = stat;
    this.sides = Object.keys(stat).length;
    this.dimension = dim;
    this.center = { x: this.dimension / 2, y: this.dimension / 2 };
    this.radius = this.dimension / 2;
    this.angle = (2 * Math.PI) / this.sides;
    this.div = div;
  }
  polyVertx(r = this.radius, s = this.sides) {
    const vertx = new Array();
    for (let i = 0; i < s; i++) {
      var x = this.center.x + r * Math.sin(i * this.angle);
      var y = this.center.y + r * Math.cos(i * this.angle);
      vertx.push({ x: x, y: y });
    }
    return vertx;
  }
  polygonPoints(r = this.radius, ver = this.polyVertx(r)) {
    const points = ver.map((ver) => `${ver.x},${ver.y}`).join(" ");
    return points;
  }
  basePoly() {
    const polys = [];
    for (let i = 0; i < this.radius / this.div; i++) {
      polys.push(
        `<polygon points="${this.polygonPoints(
          this.radius - i * this.div
        )}" fill="blue" opacity="0.1" stroke="blue"></polygon>`
      );
    }
    return polys;
  }
  baseLines() {
    const lines = [];
    this.polyVertx().map((vrx) => {
      lines.push(
        `<line x1="${vrx.x}" y1="${vrx.y}" x2="${this.center.x}" y2="${this.center.y}" stroke="blue"></line>`
      );
    });
    return lines;
  }
  dataPoly() {
    const rad = new Array();
    Object.keys(this.stat).map((key) => {
      rad.push(this.stat[key]);
    });
    const trRad = rad.map((radi) => (radi * this.radius) / 100);
    const vertx = trRad.map((r, i) => {
      var x = this.center.x + r * Math.sin(i * this.angle);
      var y = this.center.y + r * Math.cos(i * this.angle);
      return { x: x, y: y };
    });
    const polys = [];
    for (let i = 0; i < this.radius / 10; i++) {
      polys.push(
        `<polygon points="${this.polygonPoints(
          undefined,
          vertx
        )}" fill="orange" opacity="0.1" stroke="orange"></polygon>`
      );
    }
    return polys;
  }
  outPut() {
    return {
      size: this.dimension,
      polys: this.basePoly(),
      lines: this.baseLines(),
      dataPoly: this.dataPoly(),
    };
  }
}
module.exports = polyAtr;
