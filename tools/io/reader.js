/**
* Author: Sinuhe Jaime Valencia <sierisimo@gmail.com>
*
* Date: 7 - Jan - 2015
* LastUpdate: 7 - Jan - 2015
* Version: 0.0.1
*
* Name: reader.js
*
* Description:
*		Set of functions for reading files. It also accepts certain formats and checking
*
* Exports:
*
*/

const fs = require('fs');

/*
 * function: read
 *
 * params:
 *   fi: 			file(s) to read
 *   opts: 		JSON holding the options for the opening of the files
 *
 * returns: object holding a string with content based on options
 */
function read(fi, opts, callback){
	var readObj = {
		opts:{},
		files:"",
		contents:[]
	};

	if(arguments.length === 3) {
		if(!!opts && Object.is(opts))	readObjs.opts = opts;
		if(typeof callback === 'function') readObj.callback = callback;
	} else if(arguments.length === 2) {
		if(typeof opts === 'function') readObj.callback = callback;
	} else if(arguments.length === 1){
		if(typeof fi === 'string' && arguments.length === 1){
			//Open file directly
			readSingle(fi);
		} else if (Array.isArray(fi)){
			//Open multiple files
			for(var l = fi.length, i = l; i--;) readSingle(fi[l]);
		}
	}else{
		return undefined;
	}

	function readSingle(fileName){
		readObj.contents.push(fs.readFileSync(fileName,'utf-8'));
	}

	fs.readFile(fi,'utf-8',function(error,data){
		if(error){
			return callback.call(this, error, undefined);
		}

		callback.call(this,false,data.toString());
	});
}
