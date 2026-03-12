const blowUp = {
  init: function () {
    console.log("Hello world, I'm blowUp.js");

    // the elements we want to blow up on the 'click' event
    blowUp.emojis = [
      "🎃",
      "👻",
      "💀",
      "🔮",
      "🐍",
      "🕷️",
      "🕸️",
      "🪓",
      "🔪",
      "⚰️",
      "🍫",
      "🍬",
      "🍭",
    ];

    // get the DOM elements
    blowUp.slot = document.querySelector(".slot");
    blowUp.button = document.querySelector(".slot__button");

    if (blowUp.button) {
      // add a listener and a handler on the 'click' event
      blowUp.button.addEventListener("click", blowUp.party);
    }
  },
  /**
   * Triggers a 'party' animation by generating and displaying a number of emoji elements.
   * Prevents execution if a tweening animation is already in progress.
   * Creates 100 emoji elements with random content from `blowUp.emojis`.
   * Appends each emoji element to the target container (`blowUp.slot`).
   * Initiates the animation using `blowUp.animateEmojis()`.
   * @return {void}
   */
  party: function () {
    console.log("blowUp.party()");

    if (blowUp.isTweening()) {
      return;
    }

    // update the slot's position to match the button
    blowUp.updateSlotPosition();

    // sart a counter at 0 and increment it until the loop reach 100
    for (let index = 0; index < 100; index++) {
      // create an HTML element
      blowUp.divForEmojis = document.createElement("div");
      // create random content to our HTML element starding for `blowUp.emojis`
      blowUp.divForEmojis.innerText =
        blowUp.emojis[Math.floor(Math.random() * blowUp.emojis.length)];
      // add the `blowUp.divForEmojis` to the `blowUp.bloxSlot`
      blowUp.slot.appendChild(blowUp.divForEmojis);

      // set CSS properties to position each emoji at the center of the slot
      blowUp.divForEmojis.style.position = "absolute";
      blowUp.divForEmojis.style.top = "0";
      blowUp.divForEmojis.style.left = "0";
      blowUp.divForEmojis.style.transform = "translate(0, 0)";
    }

    blowUp.animateEmojis();
  },
  /**
   * Updates the position of the '.slot' container to always be centered on the '.slot__button', regardless of the button's size or screen position.
   * This ensures that any animations originating from the slot (e.g., emojis) will start from the button's center.
   * @return {void}
   */
  updateSlotPosition: function () {
    console.log("blowUp.updateSlotPosition()");

    // get the button's size and position relative to the viewport
    const rect = blowUp.button.getBoundingClientRect();

    // set the slot's top and left to the center of the button
    blowUp.slot.style.top = rect.top + rect.height / 2 + "px";
    blowUp.slot.style.left = rect.left + rect.width / 2 + "px";
  },
  /**
   * Animates emoji elements within the '.slot' container using GSAP.
   * Initializes a GSAP timeline and stores it in `blowUp.timeline`.
   * Applies random transformations to each `<div>` inside '.slot', including position shifts, rotation, and depth.
   * Fades out the elements after the animation.
   * Calls `blowUp.cleanDOM()` at the end to clean up the DOM.
   * @return {void}
   */
  animateEmojis: function () {
    console.log("blowUp.animateEmojis()");

    // set the timeline
    blowUp.timeline = gsap.timeline();

    // set the layout
    blowUp.timeline
      .to(".slot div", {
        // move vertically between -100px and 100px
        y: "random(-100, 100)",
        // move horizontally between -100px and 100px
        x: "random(-100, 100)",
        // move in 3D space up to 1000px
        z: "random(0, 1000)",
        // rotate randomly between -90° and 90°
        rotation: "random(-90, 90)",
        // animation duration in seconds
        duration: 1.5,
      })
      .to(
        ".slot div",
        {
          // fade out the divs
          autoAlpha: 0,
          // duration of fade out
          duration: 0.3,
        },
        // start fade out slightly before first animation ends
        "-=0.2"
      )
      // clean the DOM after animation
      .add(blowUp.cleanDOM);
  },
  /**
   * Cleans up the '.slot' container by removing all of its child elements.
   * Clears the inner HTML content of `blowUp.slot`.
   * Effectively removes all previously appended emoji <div> elements.
   * @return {boolean}
   */
  cleanDOM: function () {
    console.log("blowUp.cleanDOM()");

    // remove all the child elements of 'blowUp.BoxSlot' become empty
    blowUp.slot.innerHTML = "";
  },
  /**
   * Checks whether any tween animation is currently active on elements inside '.slot'.
   * Uses GSAP's `blowUp.isTweening()` to determine if any animations are in progress for the <div> elements within the '.slot' container.
   * @return {void}
   */
  isTweening: function () {
    console.log("blowUp.isTweening()");

    // return true is the animation is playing or false if not
    return gsap.isTweening(".slot div");
  },
};
