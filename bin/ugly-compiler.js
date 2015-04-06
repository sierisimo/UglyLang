/**
* Author: Sinuhe Jaime Valencia <sierisimo@gmail.com>
*
* Date:       7 - Jan - 2015
* LastUpdate: 8 - Jan - 2015
* Version:    0.0.4
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

//Avalible options for everyone
global.compileOpts = {};

program.version('0.0.4')
  .usage("[option] <file ...>");

program
  .command('compile <file> [sourceFiles...]').description('Generate the object files')
    .option('-d, --directory <directory>','Compile to especific folder') //Flag for sending objects to another output
    .action(function(file, sourceFiles, options){
      //options.directory is the new dest

      //Call only the compiler (the compiler also calls the syntax) but not create the program
      //var filesArr = reader.read([file].concat(sourceFiles));

    });

program
  .command('check <file> [uglyFiles...]').description('Check if file have errors, but no compile it')
    .action(function(file,uglyFiles){
      //Call syntax but not compile or link
      debug("Check Syntax");

      var filesArr = reader.read([file].concat(uglyFiles));

      try{
        syntax.check(filesArr);
      }catch(e){
        console.log(e);
      }

    });

program
  .command('help <command>').description("Shows full command options")
  .action(function(command){
    switch(command){
      case "compile":
        console.log("Usage:\tugly-compiler compile [options] <file> [files...]\n");
        console.log("Description:\n\tSend to compile every file passed as argument but doesn't generate final program,");
        console.log("\tthis is helpfull when you want to use a previous compiled object on another location\n");
        console.log("Options:\n\t-d, --directory <path>\tCompiles and sends only the objects to <path>");
        break;
      case "check":
        console.log("Usage:\tugly-compiler check <file> [files...]\n");
        console.log("Description:\n\tChecks the syntax of files passed and shows possible errors or warnings");
        break;
      case "help":
        console.log("Usage:\tugly-compiler help <command>\n");
        console.log("Description:\n\tShows the help for <command>");
        break;
      default:
        program.help();
        break;
    }
  });

program
  .option('-o, --output <name>','Name for the final program')
  .option('-v, --verbose','Enable verbose mode');

program.parse(process.argv);

if(!program.args.length){
  program.help();
  process.exit(1);
}

if(program.verbose){
  //Do stuff about showing message to the user
  compileOpts.verbose = true;
}

if(program.output){
  //Do something about the final name
  compileOpts.outFile = program.output;
}
