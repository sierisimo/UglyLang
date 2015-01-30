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
var headOptions = {
  name: true,
  author: false,
  depends: false,
  functs: true,
  globals: false
}, symbols = {};

function syntaxCheck(filesObj){
  var filesNames = filesObj.files,
    allContent = filesObj.contents,
    fileContent, textLines;
  //TODO: Optimize this
  for(var i = filesNames.length, l = i;l--;){
    fileContent = allContent[filesNames[l]];
    textLines = fileContent.split('\n');
    checkData(textLines);
  }
}

//TODO: Kill this function and do the thing in the right way
function checkData(lines){
  var headCounter = 0, line, word;
  for(var i = 0; i < lines.length; i++){
    line = lines[i].trim();
    for(var j = 0; j < line.length; j++){
      //Do some work with the asignation
      if(line[j] === ''){
        continue;
      } else { //Not a space
        word = line;

        //Header checker
        if(word[0] === '#'){
          header = word.substring(1,word.indexOf(":"));

          if(header in headOptions){
            headCounter++;
          }else{
            var e = new Error("Header: "+header+" at line: "+ (i+1) + " not valid");
            //Throw error or something for invalid header.
            e.code = 120;
            throw e;
          }
        }
      }
    }
  }
}

module.exports = {
  check: syntaxCheck,
  symbols: symbols
}
