// script.js
// face

const TAU = Zdog.TAU;

let illo = new Zdog.Illustration({
  element: ".zdog-canvas",
  dragRotate: true,
  zoom: 3
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

// dance

const body = document.getElementsByTagName("body")[0];
const elem = document.documentElement;

function follow(cursor) {
  let windowWidth = window.innerWidth || elem.clientWidth || body.clientWidth,
    windowHeight = window.innerHeight || elem.clientHeight || body.clientHeight;

  let x = Math.cos((Math.PI * cursor.pageY) / windowHeight) * 0.35;
  let y = Math.cos((Math.PI * cursor.pageX) / windowWidth) * 0.35;

  illo.rotate.x = x;
  illo.rotate.y = y;
  illo.updateRenderGraph();
}

addEventListener("mousemove", follow, false);
addEventListener("touchstart", follow, false);
addEventListener("touchmove", follow, false);

illo.updateRenderGraph();

let $dog = document.querySelector(".zdog-canvas");
let $circles = document.querySelectorAll(".js-circle");
let $texts = document.querySelector(".js-texts");

const updateCirclePosition = () => {
  let top = $texts.getBoundingClientRect().top;
  let documentHeight = document.body.getBoundingClientRect().height;
  let circleHeight = $circles[0].getBoundingClientRect().height;
  let height = documentHeight / 2 - circleHeight / 2;
  let y = height - top;

  $circles[0].style.marginTop = `${y}px`;
  $circles[1].style.marginTop = `${y}px`;
};

addEventListener("scroll", e => {
  updateCirclePosition();
});

window.onload = () => {
  var options = {
    root: null,
    rootMargin: "0px",
    threshold: [0.2]
  };

  let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      let r = Math.floor(entry.intersectionRatio * 100);
    });
  }, options);

  observer.observe(document.querySelector(".js-text"));

  updateCirclePosition();
};
