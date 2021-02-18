/* eslint-disable no-use-before-define */

const SessionStorage = {
  setItem,
  getItem,
  removeItem,
  clear
};

/* eslint-enable no-use-before-define */

function setItem(key, value) {
  window.sessionStorage.setItem(key, value);
}

function getItem(key) {
  return window.sessionStorage.getItem(key);
}

function removeItem(key) {
  if (getItem(key)) {
    window.sessionStorage.removeItem(key);
  }
}

function clear() {
  window.sessionStorage.clear();
}

export default SessionStorage;
