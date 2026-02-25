// Karma configuration for the Away-Game frontend.
// Uses ChromeHeadless with --no-sandbox so tests run inside WSL / CI
// without a display server.
//
// @angular/build:karma (Angular 17+) injects all frameworks, plugins, and
// reporters automatically.  This file only needs to declare the custom browser
// launcher so Karma can find Chromium with the right flags.

module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
      },
    },
    restartOnFileChange: true,
  });
};
