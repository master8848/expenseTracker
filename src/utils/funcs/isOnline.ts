/**
 * A simple function that returns true if the user is online, false otherwise.
 *
 * This is just a wrapper around the navigator.onLine property, which is a
 * boolean that indicates whether the browser is online.
 *
 * @returns {boolean} true if the user is online, false otherwise
 */
function isOnline() {
  return navigator.onLine;
}
