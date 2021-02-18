import * as jsSHA from 'jssha';

export default (userName, timestamp, token, data) => {
  const message = userName + timestamp + JSON.stringify(data);
  const shaObj = new jsSHA('SHA-256', 'TEXT');
  shaObj.setHMACKey(token, 'TEXT');
  shaObj.update(message);

  return shaObj.getHMAC('HEX').toUpperCase();
};
