/* eslint-disable no-use-before-define */

const LocalStorage = {
  setItem,
  getItem,
  removeItem,
  clear
};

/* eslint-enable no-use-before-define */

function setItem(key, value) {
  window.localStorage.setItem(key, value);
}

function getItem(key) {
  return window.localStorage.getItem(key);
}

function removeItem(key) {
  if (getItem(key)) {
    window.localStorage.removeItem(key);
  }
}

function clear() {
  window.localStorage.clear();
}

export default LocalStorage;
