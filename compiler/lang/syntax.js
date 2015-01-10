/**
* Author: Sinuhe Jaime Valencia <sierisimo@gmail.com>
*
* Date:       8 - Jan - 2015
* LastUpdate: 9 - Jan - 2015
* Version:    0.0.2
* Status:     alpha
*
* Name: syntax.js
*
* Description:
*   The main syntax checker for a file. Basically all the language
*
* Exports:
*   check()
*/
const debug = require('debug')('lang-syntax');

function syntaxCheck(filesArr){
  var filesNames = filesArr.files,
  for(var i = filesNames.length, l = i;l--;){
    //Do stuff with the files
  }
}

module.exports = {
  check: syntaxCheck
}
