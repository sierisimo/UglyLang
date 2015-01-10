/**
* Author: Sinuhe Jaime Valencia <sierisimo@gmail.com>
*
* Date:       7 - Jan - 2015
* LastUpdate: 8 - Jan - 2015
* Version:    0.0.3
*
* Name:       uglyCompiler.js
*
* Description:
*   File holding the main behavior of the compiler. Also in charge of check the options passed.
*
*/

const debug = require('debug')('ugly-compiler'),
  program = require('commander'),
  reader = require('../tools/io/reader');

program.version('0.0.3')
  .usage("[option] <file ...>")
  .option('-c, --compile [file1] <file2 ...>','Generate the object files')
  .option('-o, --output [file-name]','Name for the final program')
  .option('-s, --check-sintax', 'Check if file have errors, but no compile it')
  .option('-v, --verbose','Enable verbose mode');

program.parse(process.argv);

//TODO: Enable verbose mode
if(program.verbose){
  //Do stuff about showing message to the user
}

if(program.checkSintax){
  //Call syntax
}

if(program.compile){
  //Call only the compiler (the compiler also calls the syntax) but not create the program
}

if(program.output){
  //Do something about the final name
}
