/* eslint-disable no-cond-assign */

export const checkTCKN = tckn => {
  let i;
  if (tckn.substr(0, 1) === '0' || tckn.length !== 11) {
    return false;
  }

  let totalX = 0;
  for (i = 0; i < 10; i++) {
    totalX += Number(tckn.substr(i, 1));
  }
  const isRuleX = totalX % 10 === parseInt(tckn.substr(10, 1), 10);
  let totalY1 = 0;
  let totalY2 = 0;
  for (i = 0; i < 10; i += 2) {
    totalY1 += Number(tckn.substr(i, 1));
  }
  for (i = 1; i < 8; i += 2) {
    totalY2 += Number(tckn.substr(i, 1));
  }
  const isRuleY =
    ((totalY1 * 7 - totalY2) % 10 + 10) % 10 ===
    parseInt(tckn.substr(9, 1), 10);
  return isRuleX && isRuleY;
};

export const checkBirthDate = date => {
  const day = date.split('/')[0];
  const month = date.split('/')[1];
  const year = date.split('/')[2];

  const birthDate = new Date();
  birthDate.setFullYear(year, month - 1, day);

  const setDate = new Date();
  setDate.setFullYear(birthDate.getFullYear() + 18, month - 1, day);

  return new Date() - setDate > 0;
};

export const getOrdinalSuffix = i => {
  const j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + 'st';
  }
  if (j === 2 && k !== 12) {
    return i + 'nd';
  }
  if (j === 3 && k !== 13) {
    return i + 'rd';
  }
  return i + 'th';
};

const compareVersions = (myVersion, serverVersion) => {
  let i, cmp, len;
  myVersion = (myVersion + '').split('.');
  serverVersion = (serverVersion + '').split('.');
  len = Math.max(myVersion.length, serverVersion.length);
  for (i = 0; i < len; i++) {
    if (myVersion[i] === undefined) {
      myVersion[i] = '0';
    }
    if (serverVersion[i] === undefined) {
      serverVersion[i] = '0';
    }
    cmp = parseInt(myVersion[i], 10) - parseInt(serverVersion[i], 10);
    if (cmp !== 0) {
      return cmp < 0 ? -1 : 1;
    }
  }
  return 0;
};

export const isRefreshRequired = (myVersion, serverVersion) => {
  return compareVersions(myVersion, serverVersion) < 0;
};
/* eslint-enable no-cond-assign */
