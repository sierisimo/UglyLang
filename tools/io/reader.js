/**
* Author: Sinuhe Jaime Valencia <sierisimo@gmail.com>
*
* Date: 7 - Jan - 2015
* LastUpdate: 7 - Jan - 2015
* Version: 0.0.4
* Status: alpha
*
* Name: reader.js
*
* Description:
*		Set of functions for reading files. It also accepts certain formats and checking
*
* Exports:
*		read(files, )
*/

const fs = require('fs')
	debug = require('debug')('file-read');

debug("File");
/*
 * function: read
 *
 * params:
 *   fi: 				file(s) to read, could be a string or an array of strings
 *   opts: 			JSON holding the options for the opening of the files
 *	 callback: 	a function(err, data) that holds data as an string with the conten if nothing went wrong
 *
 * returns: object holding a string with content based on options
 */
function read(fi, opts, callback){
	var readObj = {
		opts:false,
		callback:false,
		files:[],
		contents:[]
	};

	//TODO: Optimize this section, is ugly and repetitive
	if(arguments.length === 3) {
		if(!!opts && Object.is(opts))	readObjs.opts = opts;
		if(typeof callback === 'function') readObj.callback = callback;
	} else if(arguments.length === 2) {
		if(typeof opts === 'function') readObj.callback = callback;
		else if(Object.is(opts)) readObj.opts = opts;
	} else if(arguments.length === 1){
		if(typeof fi === 'string' && arguments.length === 1){
			//Open file directly
			readSingle(fi);

			return readObj;
		} else if (Array.isArray(fi)){
			//Open multiple files
			for(var l = fi.length, i = l; i--;) readSingle(fi[i]);

			return readObj;
		}
	}else{
		//Nothing in the API was respected so take this undefined
		return undefined;
	}

	//TODO: Pending implementation
	function validateOpts(){

	}

	//Read a single file.
	function readSingle(fileName){
		readObj.files.push(fileName);
		readObj.contents.push(fs.readFileSync(fileName,'utf-8'));
	}

	//
	function readWithCallback(filename){
		fs.readFile(fi,'utf-8',function(error,data){
			if(error){
				return readObj.callback.call(this, error, undefined);
			}
			readObj.callback.call(this,false,data.toString());
		});
	}
}

module.exports = {
	read: read
};
