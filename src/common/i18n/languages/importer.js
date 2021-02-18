/**
 * Simple Node.js script to turn a specific page on a Google Sheet
 * into a JSON object for the main purpose of HTML Templating.
 *
 * @author jonobr1 / http://jonobr1.com
 *
 */

var https = require('https');
var path = require('path');
var fs = require('fs');

var format = 'tsv'; // Format you'd like to parse. `tsv` or `csv`
var id = '1xMkIlgppTsHOxWv4tdW7mQ-frbCBydcjuN3XRexdbOA'; // The Google Sheet ID found in the URL of your Google Sheet.
var sheetId = 0; // The Page ID of the Sheet you'd like to export. Found as `gid` in the URL.

https.get(
  'https://docs.google.com/spreadsheets/d/' +
    id +
    '/export?format=' +
    format +
    '&id=' +
    id +
    '&gid=' +
    sheetId,
  function(resp) {
    var body = '';

    resp
      .on('data', function(data) {
        body += Utf8ArrayToStr(data);
      })
      .on('end', function() {
        var rows = body.split(/\r\n/i);

        var columns = rows[0].split(/\t/i);

        for (var i = 1; i < columns.length; i++) {
          var temp = {};
          var fileName = columns[i].toLowerCase() + '.js';

          for (var j = 1; j < rows.length; j++) {
            var columnValues = rows[j].split(/\t/i);
            temp[columnValues[0]] = columnValues[i];
          }
          fs.writeFileSync(
            path.resolve(__dirname, fileName),
            'export default ' +
              JSON.stringify(temp, null, 2)
                .replace(/\"([^(\")"]+)\":/g, '$1:')
                .replace(/\\n/g, '\n') +
              ';'
          );
          console.log('Generated ' + fileName);
        }
      });
  }
);

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function Utf8ArrayToStr(array) {
  var out, i, len, c;
  var char2, char3;

  out = '';
  len = array.length;
  i = 0;
  while (i < len) {
    c = array[i++];
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12:
      case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(
          ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
        );
        break;
    }
  }

  return out;
}
