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
    checkDebug = debugPackage('checkLine');

  var symbolQueue = [];

  for (var i = 0; i < lines.length; i++) {
    line = lines[i].trim();

    if(line.length > 0){
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
      var e = new Error("Header: " + header + " at line: " + (i + 1) + " not valid");
      //Throw error or something for invalid header.
      e.code = 100;
      throw e;
    }
  }

  function checkLine(line) {
    var character, functDecl, functName;

    for(var _i = 0; _i < line.length ; _i++){
      switch(line[_i]){
        case '-':
          if(_i != 0 && symbolQueue.pop() !== '-'){
            var e = new Error("Function: "+ line + " at line: " + (i + 1));
            e.code = 400;
            throw e;
          }
          //TODO: Check fileObj for functs
          //TODO: Add some bytecode about the function
          symbolQueue.push(line[_i]);
          if(line.charAt(line.length - 1) === '-'){
            functDecl = line.substring()
            //for(var _j = 0;){

            //}
          }

          break;
        case '{':
          //TODO: at the same time, add functions to the virtual machine
          symbolQueue.push(line[_i]);
          break;
      }
    }

    checkDebug("Line"+line);
  }

  return fileObj;
}

module.exports = {
  check: syntaxCheck,
  symbols: symbols
}
