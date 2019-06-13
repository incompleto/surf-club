// script.js

import Zdog from "zdog";

const TAU = Zdog.TAU;
const white = "#fff";
const black = "#111";

let illo = new Zdog.Illustration({
  element: ".zdog-canvas",
  dragRotate: true,
  zoom: 2
});

let outline = new Zdog.Ellipse({
  addTo: illo,
  width: 120,
  height: 120,
  stroke: 6,
  color: "#000",
  quarters: 1,
  fill: false
});

outline.copy({
  rotate: { z: TAU / 2 }
});

outline.copy({
  rotate: { z: TAU / 4 }
});

outline.copy({
  rotate: { z: -TAU / 4 }
});

let eyeGroup = new Zdog.Group({
  addTo: illo,
  translate: { y: -18, x: -16, z: 40 },
  rotate: { x: -TAU / 2.2 }
});

let eye = new Zdog.Ellipse({
  addTo: eyeGroup,
  width: 8,
  height: 26,
  stroke: 5,
  color: "#000",
  fill: true
});

eyeGroup.copyGraph({
  translate: { y: -18, x: 16, z: 40 }
});

let mouth = new Zdog.Shape({
  addTo: illo,
  path: [
    { x: -35, y: 20 },
    {
      bezier: [{ x: -18, y: 48 }, { x: 18, y: 48 }, { x: 35, y: 20 }]
    }
  ],
  closed: false,
  stroke: 7,
  color: "#000",
  translate: { y: -2, z: 40 }
});

let wrinkle = new Zdog.Shape({
  addTo: mouth,
  path: [
    { x: 0, y: 0 },
    {
      arc: [{ x: 6, y: -5 }, { x: 12, y: 0 }]
    }
  ],
  translate: { x: -40.5, y: 23 },
  rotate: { z: -TAU / 13 },
  stroke: 6,
  closed: false,
  color: "#000"
});

let head = new Zdog.Shape({
  addTo: illo,
  stroke: 110,
  color: "#f8d946"
});

wrinkle.copyGraph({
  translate: { x: 29, y: 18 },
  rotate: { z: Zdog.TAU / 12 }
});

// ---

const body = document.getElementsByTagName("body")[0];
const elem = document.documentElement;
const div = document.createElement("div");
div.id = "cursor";
body.appendChild(div);

function animate(cursor) {
  let windowWidth = window.innerWidth || elem.clientWidth || body.clientWidth,
    windowHeight = window.innerHeight || elem.clientHeight || body.clientHeight;

  let x = Math.cos((Math.PI * cursor.pageY) / windowHeight) * 0.3;
  let y = Math.cos((Math.PI * cursor.pageX) / windowWidth) * 0.3;

  illo.rotate.x = x;
  illo.rotate.y = y;
  illo.updateRenderGraph();
}

function move(cursor) {
  div.style.top = cursor.pageY + "px";
  div.style.left = cursor.pageX + "px";
}

addEventListener("mousemove", animate, false);
addEventListener("mousemove", move, false);

illo.updateRenderGraph();
