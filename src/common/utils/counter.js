export const convertToMinAndSec = timeInSeconds => ({
  minutes: Math.floor(timeInSeconds / 60),
  seconds: timeInSeconds % 60
});

export const prependZero = key => time => ({
  ...time,
  [key]: time[key] < 10 ? '0' + time[key] : '' + time[key]
});

export const doubleDigits = t =>
  compose(prependZero('minutes'), prependZero('seconds'))(t);

export const format = t => t.minutes + ':' + t.seconds;

export const compose = (...fns) => arg =>
  fns.reduce((composed, f) => f(composed), arg);

export const getTimer = timeInSeconds =>
  compose(convertToMinAndSec, doubleDigits, format)(timeInSeconds);
