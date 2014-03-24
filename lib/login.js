var childProcess	= require('child_process'),
	util			= require('util'),

	settings		= require('./settings');
	;

function connect(callback){
	var cmd = util.format('tabcmd login -s %s -u %s -p %s', settings.settings.server.host, settings.settings.auth.user, settings.settings.auth.password);

	childProcess.exec(cmd, callback);
};

function disconnect(callback){
	childProcess.exec('tabcmd logout', callback);
}

module.exports = {
	login : connect,
	logout : disconnect
}
