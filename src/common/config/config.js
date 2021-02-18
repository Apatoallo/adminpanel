const urls = {
  LOCAL: {
    socket: 'http://dev.bitexen.com',
    api: 'http://localhost:8000',
    chart: 'https://dev.bitexen.com/data/chart/v1'
  },
  DEV: {
    socket: 'wss://dev.bitexen.com',
    api: 'https://dev.bitexen.com',
    chart: 'https://dev.bitexen.com/data/chart/v1'
  },
  TEST: {
    socket: 'wss://test.bitexen.com',
    api: 'https://test.bitexen.com',
    chart: 'https://test.bitexen.com/data/chart/v1'
  },
  PROD: {
    socket: 'wss://www.bitexen.com',
    api: 'https://www.bitexen.com',
    chart: 'https://www.bitexen.com/data/chart/v1'
  }
};

const keys = {
  LOCAL: {
    GAKey: 'UA-119312763-2',
    recaptchaKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
  },
  DEV: {
    GAKey: 'UA-119312763-2',
    recaptchaKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
  },
  TEST: {
    GAKey: 'UA-119312763-3',
    recaptchaKey: '6LfGs1EUAAAAAMmItIvFUMxTkXzfXucTOw-pSEUv'
  },
  PROD: {
    GAKey: 'UA-119312763-1',
    recaptchaKey: '6LfGs1EUAAAAAMmItIvFUMxTkXzfXucTOw-pSEUv'
  }
};

export const endpoints = {
  socket: urls[process.env.REACT_APP_ENV_NAME].socket,
  api: urls[process.env.REACT_APP_ENV_NAME].api,
  chart: urls[process.env.REACT_APP_ENV_NAME].chart
};

export const configKeys = {
  GAKey: keys[process.env.REACT_APP_ENV_NAME].GAKey,
  recaptchaKey: keys[process.env.REACT_APP_ENV_NAME].recaptchaKey
};

export default endpoints;
