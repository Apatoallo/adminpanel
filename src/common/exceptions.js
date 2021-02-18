const exceptions = {
  TokenException
};

function TokenException(message) {
  return { type: 'TokenException', message };
}

export default exceptions;
