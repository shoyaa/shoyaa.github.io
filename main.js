"use strict";
import { Back, Circ, Expo, gsap, Power0 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swup from "swup";
import LocomotiveScroll from "locomotive-scroll";
import { Power2, Power3 } from "gsap/all";
import Matter from "matter-js";
import Two from "two.js";
gsap.registerPlugin(ScrollTrigger);
let sliderContainer = [...document.querySelectorAll(".slider")];
let sliderImg = [...document.querySelectorAll(".slider > img")];
const myStack = document.querySelector(".my-stack");
let downCircle = document.querySelector(".arrow-down");
let about = document.querySelector(".about");
let menuBtn = document.querySelector(".nav__menu");
let test1 = document.querySelector(".testing");
let closeNav = document.querySelector(".nav__close");
let process = document.querySelector(".parallax");
let contact = gsap.utils.toArray(".contact-2 span");

const testFunc = () => {
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".smooth-scroll"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  let scrollY = 0;
  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".smooth-scroll", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".smooth-scroll").style.transform
      ? "transform"
      : "fixed",
  });

  //MOUSE ANIMATON -----------------------
  var circle = document.querySelector(".ball");

  gsap.set(circle, {
    xPercent: -50,
    yPercent: -50,
  });

  window.addEventListener("mousemove", moveCircle);

  function moveCircle(e) {
    gsap.to(circle, 0.5, {
      x: e.clientX,
      y: e.clientY,
      ease: Circ.easeOut,
    });
  }
  // Landing Animation
  gsap.to(".landing", {
    height: 0,
    ease: Circ.easeInOut,
    duration: 1.5,
  });

  //MOUSE ANIMATION END----------

  gsap.from(".title", 2, {
    delay: 0.3,
    y: "300%",
    ease: Expo.easeOut,
  });

  gsap.from(".title-2", 2, {
    delay: 0.5,
    y: "300%",
    ease: Expo.easeOut,
  });

  gsap.to(".title-3", 1.5, {
    delay: 1.5,
    color: "#FF9F84",
    ease: Expo.easeOut,
  });

  gsap.from(".title-4", 2, {
    delay: 0.7,
    y: "300%",
    ease: Expo.easeOut,
  });
  //NAV ITEM
  gsap.from(".nav-item", 0.5, {
    delay: 1.7,
    opacity: 0,
    y: "-30%",
    ease: Power2.easeOut,
    stagger: 0.1,
  });

  // MY PROJECTS
  gsap.from(".letter", 0.5, {
    scrollTrigger: {
      trigger: ".letter-wrapper",
      scroller: ".smooth-scroll",
    },
    y: "100%",
    ease: Back.easeOut.config(1.7),
    stagger: 0.05,
  });
  //ARROW DOWN
  gsap.from(".arrow-down", 1.5, {
    delay: 2.5,
    opacity: 0,
    y: "-30%",
    ease: Power2.easeOut,
  });
  //SELECTED WORKS
  /*gsap.to("body", {
    scrollTrigger: {
      scroller: ".smooth-scroll",
      trigger: ".selected__works",
  
      start: "top +=20%",
      end: "+=30%",
      scrub: 2,
    },
    background:
      "linear-gradient(90deg, rgba(149,77,133,1) 0%, rgba(255,229,249,1) 100%)",
    color: "white",
    duration: 1.5,
    ease: Expo.easeOut,
    immediateRender: false,
  });
  */
  //PROCESS
  gsap.to(".parallax", {
    scrollTrigger: {
      scroller: ".smooth-scroll",
      trigger: ".parallax",

      start: "top center",
      end: "+=30%",
      scrub: 2,
    },

    color: "white",
    duration: 1.5,
    ease: Expo.easeOut,
    immediateRender: false,
  });

  gsap.to(".parallax", 1.5, {
    scrollTrigger: {
      trigger: ".parallax",
      scroller: ".smooth-scroll",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },

    scale: 0.95,
    borderRadius: "50px",
    ease: Expo.easeOut,
  });

  // Circle Click
  if (downCircle) {
    downCircle.addEventListener("click", () => {
      locoScroll.scrollTo(about);
    });
  }

  const jobs = gsap.utils.toArray(".job-item");
  let animation = gsap.timeline();

  jobs.forEach((job) => {
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.5, ease: Circ.easeInOut },
    });
    let bar = job.querySelector(".line");
    let exitTime = 0;
    tl.from(bar, { width: "0%" });
    exitTime = tl.duration();
    let exitTime2 = 0;
    let tl2 = gsap.timeline({
      defaults: { duration: 0.5, ease: Power3.easeInOut },
    });
    exitTime2 = tl2.duration();

    myStack.addEventListener("mouseenter", () => {
      gsap.to(circle, {
        opacity: 0,
        duration: 0.5,
        ease: Power2.easeOut,
      });
    });
    myStack.addEventListener("mouseleave", () => {
      gsap.to(circle, {
        opacity: 1,
        duration: 0.5,
        ease: Power2.easeOut,
      });
    });
    job.addEventListener("mouseenter", (e) => {
      const results = jobs.filter((job) => {
        return job !== e.target;
      });

      const sliderItem = e.target.getAttribute("data-ref");

      /*  tl2.set(sliderContainer[Number(sliderItem) - 1], {
        autoAlpha: 1,
      });
  */
      gsap.to(sliderContainer[Number(sliderItem) - 1], {
        // xPercent: -100,
        ease: Power2.easeOut,
        opacity: 1,
      });

      gsap.to(circle, 0.1, {
        border: "3px solid dodgerblue",
      });
      gsap.to(circle, 0.3, {
        scale: 1.7,
      });
      gsap.to(results, 0.3, {
        opacity: 0.3,
      });

      if (tl.time() < exitTime) {
        tl.play();
      } else {
        tl.restart();
      }
    });

    job.addEventListener("mouseleave", (e) => {
      const results = jobs.filter((job) => {
        return job !== e.target;
      });
      const sliderItem = e.target.getAttribute("data-ref");
      /* gsap.to(sliderContainer[Number(sliderItem) - 1], 1, {
        xPercent: 100,
        ease: Power2.easeOut,
        overwrite: true,
        opacity: 0,
      });
      gsap.to(sliderImg[Number(sliderItem) - 1], 1, {
        ease: Power2.easeOut,
        xPercent: -100,
        overwrite: true,
        opacity: 0,
      });
  */
      gsap.to(sliderContainer[Number(sliderItem) - 1], {
        // xPercent: -100,
        ease: Power2.easeOut,
        opacity: 0,
      });

      gsap.to(circle, 0.1, {
        border: "3px solid #b4b4b4",
      });
      gsap.to(circle, 0.3, {
        scale: 1,
      });
      gsap.to(results, 0.3, {
        opacity: 1,
      });
      if (tl.time() < exitTime) {
        tl.reverse();
      } else {
        tl.reverse();
      }
    });
  });
  //Contact
  if (contact) {
    console.log(contact);
    contact.forEach((contact) => {
      contact.addEventListener("mouseenter", (e) => {
        gsap.to(circle, 0.1, {
          border: "3px solid dodgerblue",
          overwrite: "auto",
        });
        gsap.to(circle, 0.3, {
          scale: 1.7,
        });
      });
      contact.addEventListener("mouseleave", (e) => {
        gsap.to(circle, 0.1, {
          border: "3px solid #b4b4b4",
        });
        gsap.to(circle, 0.3, {
          scale: 1,
        });
      });
    });
  }
  if (process) {
    process.addEventListener("mouseenter", (e) => {
      gsap.to(circle, 0.1, {
        border: "3px solid #ffff",
      });
    });
    process.addEventListener("mouseleave", (e) => {
      gsap.to(circle, 0.1, {
        border: "3px solid #b4b4b4",
      });
    });
  }
  menuBtn.addEventListener("click", () => {
    document.body.classList.add("overflow-hidden");
    gsap.to(".testing", 0.5, {
      height: "100vh",
      ease: Circ.easeInOut,
    });
    gsap.to(".testing ul", 0.3, {
      delay: 1,
      autoAlpha: 1,
    });
    gsap.to(".testing img", 0.3, {
      delay: 1,
      autoAlpha: 1,
    });
    if (closeNav) {
      closeNav.addEventListener("click", () => {
        document.body.classList.remove("overflow-hidden");
        gsap.to(".testing", 0.5, {
          height: 0,
          ease: Circ.easeInOut,
        });
        gsap.to(".testing ul", 0.3, {
          autoAlpha: 0,
        });
        gsap.to(".testing img", 0.3, {
          autoAlpha: 0,
        });
      });
    }
  });

  let innerMarquee = document.querySelector(".marquee__inner");
  if (innerMarquee) {
    innerMarquee.addEventListener("mouseenter", (e) => {
      gsap.to(circle, 0.1, {
        border: "3px solid dodgerblue",
      });
      gsap.to(circle, 0.3, {
        scale: 1.7,
      });
    });
    innerMarquee.addEventListener("mouseleave", (e) => {
      gsap.to(circle, 0.1, {
        border: "3px solid #b4b4b4",
      });
      gsap.to(circle, 0.3, {
        scale: 1,
      });
    });
  }

  /*gsap.to(circle, {
    scrollTrigger: {
      scroller: ".smooth-scroll",
      trigger: ".parallax",
      start: "top center",
      end: "+=200px",
      scrub: 2,
    },
    border: "3px solid #ffff",
    immediateRender: false,
    overwrite: true,
  });

  gsap.to(circle, {
    scrollTrigger: {
      scroller: ".smooth-scroll",
      trigger: ".contact-2",
      start: "top bottom",
      end: "top top",
      scrub: 2,
      markers: true,
    },
    border: "3px solid #b4b4b4",
    immediateRender: false,
  });
*/
  /*gsap.from(".contact-2", {
    translateY: "-80%",
    scrollTrigger: {
      scroller: ".smooth-scroll",
      trigger: ".contact-2",
      end: "bottom 10%+=100px",
      // end: "bottom top",
      scrub: true,
    },
  });
  */
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
    "React",
  ];

  if (myStack) {
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
      size: 50,
      weight: 400,
      fill: "black",
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

      let size = 60;

      /*if (two.width < 480) {
      size = two.width * 0.12;
    } else if (two.width > 1080 && two.width < 1600) {
      size = two.width * 0.07;
    } else if (two.width > 1600) {
      size = two.width * 0.06;
    } else {
      size = two.width * 0.08;
    } */

      let leading = 100;

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

        let rectangle = new Two.RoundedRectangle(
          0,
          0,
          rect.width,
          rect.height,
          50
        );
        // rectangle.fill = 'rgb(255, 50, 50)';
        rectangle.fill =
          "rgba(" +
          255 +
          "," +
          Math.floor(Math.random() * 255) +
          "," +
          Math.floor(Math.random() * 255) +
          "," +
          0.5 +
          ")";
        rectangle.noStroke();
        // rectangle.opacity = 0.75;
        rectangle.visible = true;

        let entity = Matter.Bodies.rectangle(ox, oy, 1, 1);
        Matter.Body.scale(entity, rect.width, rect.height);

        entity.scale = new Two.Vector(rect.width, rect.height);
        entity.object = group;
        entities.push(entity);

        x +=
          rect.width + defaultStyles.margin.left + defaultStyles.margin.right;

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
    ScrollTrigger.create({
      trigger: ".my-stack",
      scroller: ".smooth-scroll",
      onEnter: () => {
        addSlogan();
        resize();
      },
      onLeaveBack: (self) => self.disable(),
      scrub: false,
    });
  }
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
};

//SCROLL TRIGGER----------

testFunc();
