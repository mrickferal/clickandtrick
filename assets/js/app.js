const app = {
  init: function () {
    console.log("Hello world, I'm app.js 👑");

    // load the modules used in the app
    blowUp.init();
  },
};

document.addEventListener("DOMContentLoaded", app.init);
