/**
* Author: Sinuhe Jaime Valencia <sierisimo@gmail.com>
*
* Date:       7 - Jan - 2015
* LastUpdate: 8 - Jan - 2015
* Version:    0.0.3
* Status:     alpha
*
* Name:       uglyCompiler.js
*
* Description:
*   File holding the main behavior of the compiler. Also in charge of check the options passed.
*
*/

//External modules
const debug = require('debug')('ugly-compiler'),
  program = require('commander'),
  //Local tools
  reader = require('../tools/io/reader'),
  //Components of the compiler
  syntax = require('../compiler/lang/syntax');

program.version('0.0.3')
  .usage("[option] <file ...>");

program
  .command('compile <file> [sourceFiles...]').description('Generate the object files')
    .option('-c, --compile <file> [sourceFiles...]','Generate the object files')
    .action(function(file, sourceFiles){
      //Call only the compiler (the compiler also calls the syntax) but not create the program

      var filesArr = reader.read([file].concat(sourceFiles));
    });

program
  .command('check <file> [uglyFiles...]').description('Check if file have errors, but no compile it')
    .action(function(file,uglyFiles){
      //Call syntax
      debug("Check Syntax");

      var filesArr = reader.read([file].concat(uglyFiles));
      
      syntax.check(filesArr);
    });

program
  .option('-o, --output <name>','Name for the final program')
  .option('-v, --verbose','Enable verbose mode');

program.parse(process.argv);

//TODO: Enable verbose mode
if(program.verbose){
  //Do stuff about showing message to the user
}

if(program.output){
  //Do something about the final name
}
