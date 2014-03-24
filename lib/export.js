var childProcess	= require('child_process'),
	util			= require('util'),
	path			= require('path')
	;

function png(viewName, callback){
	var staging = path.join(process.cwd(), 'temp', 'export');
	var cmd = util.format('tabcmd export %s --png -f %s', viewName, staging);

	childProcess.exec(cmd, callback);
}

module.exports = {
	png : png
};