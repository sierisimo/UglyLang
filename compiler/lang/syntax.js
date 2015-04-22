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
const debugPackage = require('debug'),
  debug = debugPackage('lang-syntax');

//Avalible headers on a Uglyfile.
var headOptions = require('./spec/head'),
  symbols = require('./spec/symbols'),
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
    line, word, fileObj = {},
    e,
    checkDebug = debugPackage('checkLine');

  var symbolQueue = [];

  for (var i = 0; i < lines.length; i++) {
    line = lines[i].trim();

    if (line.length > 0) {
      //Header checker
      switch (line[0]) {
        case '#':
          headerCheck(
            line.substring(1, line.indexOf(":")).trim(),
            line.substring(line.indexOf(":") + 1).trim()
          );
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
      e = new Error("Header: " + header + " at line: " + (i + 1) + " not valid");
      //Throw error or something for invalid header.
      e.code = 100;
      throw e;
    }
  }

  function checkLine(line) {
    var functDecl, functName, subLine, endLine, tmpPosition;

    for (var _i = 0; _i < line.length; _i++) {
      switch (line[_i]) {
        case '-':
          //TODO: Future implementation: automatic values for arguments, like python
          if (_i != 0 && symbolQueue.length == 0) {
            e = new Error("Syntax: " + line + " at line: " + (i + 1));
            e.code = 200;
            throw e;
          }



          //TODO: Check fileObj for functs
          //TODO: Add some bytecode about the function
          symbolQueue.push(line[_i]);

          subLine = line.substring(_i + 1, line.length);

          tmpPosition = subLine.indexOf("-");
          if (tmpPosition <= 0) {
            e = new Error("Function: " + line + " at line: " + (i + 1));
            e.code = 401;
            throw e;
          }

          endLine = subLine.substring(tmpPosition, subLine.length);
          subLine = subLine.substring(0, tmpPosition);
          tmpPosition = subLine.indexOf(':');

          checkDebug("EndLine: " + endLine);
          checkDebug("SubLine: " + subLine);

          functName = subLine.substring(0, tmpPosition);
          // functArgs = subLine.substring(tmpPosition, subLine.length);
          break;
        case '{':
          //TODO: at the same time, add functions to the virtual machine
          symbolQueue.push(line[_i]);
          break;
      }
    }

    checkDebug("Line" + line);
  }

  return fileObj;
}

module.exports = {
  check: syntaxCheck,
  symbols: symbols
}
