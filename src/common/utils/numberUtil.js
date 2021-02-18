/* eslint-disable no-cond-assign */
export const formatMoney = (amount, decimals) => {
  const c = isNaN((decimals = Math.abs(decimals))) ? 2 : decimals;
  const d = '.';
  const t = ',';
  const s = amount < 0 ? '-' : '';
  const i = String(
    parseInt((amount = Math.abs(Number(amount) || 0).toFixed(c)), 10)
  );
  let j = 0;
  j = (j = i.length) > 3 ? j % 3 : 0;
  return (
    s +
    (j ? i.substr(0, j) + t : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
    (c
      ? d +
        Math.abs(amount - i)
          .toFixed(c)
          .slice(2)
      : '')
  );
};

export const formatBytes = bytes => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

export const roundDown = (number, precision) => {
  //return Number(Math.floor(number+'e'+precision)+'e-'+precision);
  return roundMethod('floor', number, precision);
};

export const roundUp = (number, precision) => {
  //return Number(Math.floor(number+'e'+precision)+'e-'+precision);
  return roundMethod('ceiling', number, precision);
};

export const round = (number, precision) => {
  //return Number(Math.floor(number+'e'+precision)+'e-'+precision);
  return roundMethod('round', number, precision);
};

export const roundToFixedDigits = (numberInput, digits) => {
  let number = numberInput;
  if (typeof number === 'number') {
    number = numberInput.toString();
  }
  const numberArr = number.split('');
  let newNumber = '',
    index = 0,
    precision = digits;
  let nonZeroDigitFound = false;

  for (index = 0; index < numberArr.length; index++) {
    if (
      !nonZeroDigitFound &&
      (numberArr[index] === '0' || numberArr[index] === '.')
    ) {
      newNumber += numberArr[index];
      precision++;
    } else {
      nonZeroDigitFound = true;
      if (index === precision - 1) {
        const digit = parseInt(numberArr[index], 10);
        const nextDigit = numberArr[index + 1]
          ? parseInt(numberArr[index + 1], 10)
          : 0;
        if (numberArr[index] === '.') {
          newNumber += numberArr[index];
          precision++;
          continue;
        } else if (
          !isNaN(nextDigit) &&
          (nextDigit > 5 || (nextDigit === 5 && digit % 2 === 0))
        ) {
          newNumber += (digit + 1).toString();
        } else {
          newNumber += digit.toString();
        }
        break;
      } else {
        newNumber += numberArr[index];
      }
    }
  }

  if (!isNaN(numberInput) && !isNaN(newNumber)) {
    const inputDigits = Math.floor(Math.log10(numberInput));
    while (inputDigits > 0 && inputDigits > Math.floor(Math.log10(newNumber))) {
      newNumber += '0';
    }
  }

  return newNumber;
};

function roundMethod(method, numberInput, precision) {
  let number = numberInput;
  if (typeof number !== 'number') {
    number = parseFloat(numberInput);
  }

  if (!Number.isInteger(precision)) {
    throw new TypeError('Expected precision to be an integer');
  }

  const isRoundingAndNegative = method === 'round' && number < 0;
  if (isRoundingAndNegative) {
    number = Math.abs(number);
  }

  let exponent;
  [number, exponent] = `${number}e`.split('e');
  let result = Math[method](`${number}e${Number(exponent) + precision}`);

  [number, exponent] = `${result}e`.split('e');
  result = Number(`${number}e${Number(exponent) - precision}`);

  if (isRoundingAndNegative) {
    result = -result;
  }

  return result;
}

/* eslint-enable no-cond-assign */
