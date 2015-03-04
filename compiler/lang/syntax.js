/**
 * Author: Sinuhe Jaime Valencia <sierisimo@gmail.com>
 *
 * Date:       8 - Jan - 2015
 * LastUpdate: 30 - Jan - 2015
 * Version:    0.0.2
 * Status:     alpha
 *
 * Name: syntax.js
 *
 * Description:
 *   The main syntax checker for a file. Basically all the language
 *
 */
const debug = require('debug')('lang-syntax');

//Avalible headers on a Uglyfile.
var headOptions = require('./head'),
  symbols = require('./symbols'),
  dataObjs = {}; //The full objects that contains the data extracted from every file

//Main function called on require
function syntaxCheck(filesObj) {
  var filesNames = filesObj.files,
    allContent = filesObj.contents,
    fileContent, textLines;

  //TODO: Optimize this
  for (var i = filesNames.length, l = i; l--;) {
    debug("Check Syntax on:", filesNames);
    fileContent = allContent[filesNames[l]];

    textLines = fileContent.split('\n');

    dataObjs[filesNames[l]] = checkData(textLines);
  }

  debug(dataObjs);
}

function checkData(lines) {
  var headCounter = 0,
    line, word, fileObj = {};

  for (var i = 0; i < lines.length; i++) {
    line = lines[i].trim();

    for (var j = 0; j < line.length; j++) {
      //Header checker
      switch (line[0]) {
        case '#':
          headerCheck(
            line.substring(1, line.indexOf(":")).trim(),
            line.substring(line.indexOf(":") + 1).trim());
          break;
        case '$':
          //Just a comment... keep checking...
          if (line[1] === '$') {
            continue;
          } else { //TODO: Anotations (Future implementtions)
          }
        default:
          checkLine(line);
      }
    }
  }

  function headerCheck(header, value) {
    if (header in headOptions) {
      headCounter++;
      //Get the value of the header
      fileObj[header] = value;
    } else {
      var e = new Error("Header: " + header + " at line: " + (i + 1) + " not valid");
      //Throw error or something for invalid header.
      e.code = 120;
      throw e;
    }
  }

  function checkLine(line) {
    var symbolQueu = [];

  }

  return fileObj;
}

module.exports = {
  check: syntaxCheck,
  symbols: symbols
}