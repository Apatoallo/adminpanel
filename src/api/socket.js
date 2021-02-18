import io from 'socket.io-client';
import { endpoints } from '../common/config/config';

/* eslint-disable no-use-before-define */

const Socket = {
  connect,
  emit,
  on,
  off,
  removeListener,
  listeners,
  hasListeners,
  socket: null
};

/* eslint-enable no-use-before-define */

function connect() {
  Socket.socket = io(endpoints.socket, {
    reconnection: true
  });
}

function on(eventName, callback) {
  if (Socket.socket) {
    Socket.socket.on(eventName, callback);
  }
}

function off(eventName, callback) {
  if (Socket.socket) {
    Socket.socket.off(eventName, callback);
  }
}

function emit(eventName, ...data) {
  if (Socket.socket) {
    Socket.socket.emit(eventName, ...data);
  }
}

function listeners(eventName) {
  if (Socket.socket) {
    return Socket.socket.listeners(eventName);
  } else {
    return [];
  }
}

function hasListeners(eventName) {
  if (Socket.socket) {
    return Socket.socket.hasListeners(eventName);
  } else {
    return false;
  }
}

function removeListener(eventName) {
  if (Socket.socket) {
    Socket.socket.removeListener(eventName);
  }
}

export default Socket;
