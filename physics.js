const myStack = document.querySelector(".my-stack");

import Matter from "matter-js";
import Two from "two.js";
let vector = new Two.Vector();
let entities = [];
let mouse;
let copy = [
  "Javascript",
  "Wordpress",
  "CSS",
  "HTML",
  "Figma",
  "NextJS",
  "SEO",
  "Design",
];

document.addEventListener("scroll", (event) => {
  console.log("ree");
});

let two = new Two({
  type: Two.Types.canvas,
  autostart: true,
  fitted: true,
}).appendTo(myStack);

let solver = Matter.Engine.create();
solver.world.gravity.y = 1;

let bounds = {
  length: 5000,
  thickness: 50,
  properties: {
    isStatic: true,
  },
};

// bounds.top = createBoundary(bounds.length, bounds.thickness);
bounds.left = createBoundary(bounds.thickness, bounds.length);
bounds.right = createBoundary(bounds.thickness, bounds.length);
bounds.bottom = createBoundary(bounds.length, bounds.thickness);

Matter.World.add(solver.world, [
  /*bounds.top.entity,*/ bounds.left.entity,
  bounds.right.entity,
  bounds.bottom.entity,
]);

let defaultStyles = {
  size: two.width * 0.08,
  weight: 400,
  fill: "white",
  leading: two.width * 0.08 * 0.8,
  family: "Oswald, sans-serif",
  alignment: "center",
  baseline: "baseline",

  margin: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

addSlogan();
resize();
mouse = addMouseInteraction();
two.bind("resize", resize).bind("update", update);

function addMouseInteraction() {
  // add mouse control
  let mouse = Matter.Mouse.create(myStack);
  let mouseConstraint = Matter.MouseConstraint.create(solver, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
    },
  });

  Matter.World.add(solver.world, mouseConstraint);

  return mouseConstraint;
}

function resize() {
  let length = bounds.length;
  let thickness = bounds.thickness;

  // vector.x = two.width / 2;
  // vector.y = - thickness / 2;
  // Matter.Body.setPosition(bounds.top.entity, vector);

  vector.x = -thickness / 2;
  vector.y = two.height / 2;
  Matter.Body.setPosition(bounds.left.entity, vector);

  vector.x = two.width + thickness / 2;
  vector.y = two.height / 2;
  Matter.Body.setPosition(bounds.right.entity, vector);

  vector.x = two.width / 2;
  vector.y = two.height + thickness / 2;
  Matter.Body.setPosition(bounds.bottom.entity, vector);

  let size;

  if (two.width < 480) {
    size = two.width * 0.12;
  } else if (two.width > 1080 && two.width < 1600) {
    size = two.width * 0.07;
  } else if (two.width > 1600) {
    size = two.width * 0.06;
  } else {
    size = two.width * 0.08;
  }

  let leading = size * 0.8;

  for (let i = 0; i < two.scene.children.length; i++) {
    let child = two.scene.children[i];

    if (!child.isWord) {
      continue;
    }

    let text = child.text;
    let rectangle = child.rectangle;
    let entity = child.entity;

    text.size = size;
    text.leading = leading;

    let rect = text.getBoundingClientRect(true);
    rectangle.width = rect.width;
    rectangle.height = rect.height;

    Matter.Body.scale(entity, 1 / entity.scale.x, 1 / entity.scale.y);
    Matter.Body.scale(entity, rect.width, rect.height);
    entity.scale.set(rect.width, rect.height);

    text.size = size / 3;
  }
}

function addSlogan() {
  let x = defaultStyles.margin.left;
  let y = -two.height; // Header offset

  for (let i = 0; i < copy.length; i++) {
    let word = copy[i];
    let group = new Two.Group();
    let text = new Two.Text("", 0, 0, defaultStyles);

    group.isWord = true;

    // Override default styles
    if (word.value) {
      text.value = word.value;

      for (let prop in word.styles) {
        text[prop] = word.styles[prop];
      }
    } else {
      text.value = word;
    }

    let rect = text.getBoundingClientRect();
    let ox = x + rect.width / 2;
    let oy = y + rect.height / 2;

    let ca = x + rect.width;
    let cb = two.width;

    // New line
    if (ca >= cb) {
      x = defaultStyles.margin.left;
      y +=
        defaultStyles.leading +
        defaultStyles.margin.top +
        defaultStyles.margin.bottom;

      ox = x + rect.width / 2;
      oy = y + rect.height / 2;
    }

    group.translation.x = ox;
    group.translation.y = oy;
    text.translation.y = 14;

    let rectangle = new Two.RoundedRectangle(0, 0, rect.width, rect.height, 50);
    // rectangle.fill = 'rgb(255, 50, 50)';
    rectangle.fill =
      "rgba(" +
      255 +
      "," +
      Math.floor(Math.random() * 255) +
      "," +
      Math.floor(Math.random() * 255) +
      "," +
      0.85 +
      ")";
    //  rectangle.noStroke();
    // rectangle.opacity = 0.75;
    rectangle.visible = true;

    let entity = Matter.Bodies.rectangle(ox, oy, 1, 1);
    Matter.Body.scale(entity, rect.width, rect.height);

    entity.scale = new Two.Vector(rect.width, rect.height);
    entity.object = group;
    entities.push(entity);

    x += rect.width + defaultStyles.margin.left + defaultStyles.margin.right;

    group.text = text;
    group.rectangle = rectangle;
    group.entity = entity;

    group.add(rectangle, text);
    two.add(group);
  }

  Matter.World.add(solver.world, entities);
}

function update(frameCount, timeDelta) {
  let allBodies = Matter.Composite.allBodies(solver.world);
  Matter.MouseConstraint.update(mouse, allBodies);
  Matter.MouseConstraint._triggerEvents(mouse);

  Matter.Engine.update(solver);

  for (let i = 0; i < entities.length; i++) {
    let entity = entities[i];
    entity.object.position.copy(entity.position);
    entity.object.rotation = entity.angle;
  }
}

function createBoundary(width, height) {
  let rectangle = two.makeRectangle(0, 0, width, height);
  rectangle.visible = false;

  rectangle.entity = Matter.Bodies.rectangle(
    0,
    0,
    width,
    height,
    bounds.properties
  );
  rectangle.entity.position = rectangle.position;

  return rectangle;
}
