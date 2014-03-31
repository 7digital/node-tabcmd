var childProcess	= require('child_process'),
	util			= require('util')
	;

function connect(callback){
	var cmd = util.format('tabcmd login -s %s -u %s -p %s', this.settings.server.host, this.settings.auth.user, this.settings.auth.password);

	childProcess.exec(cmd, callback);
}

function disconnect(callback){
	childProcess.exec('tabcmd logout', callback);
}

module.exports = {
	login : connect,
	logout : disconnect
};
