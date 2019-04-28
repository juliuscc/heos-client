const heosApi = require('heos-api')

heosApi
	.discoverOneDevice()
	.then(x => {
		console.log(x)
		return x
	})
	.then(address => heosApi.connect(address))
	.then(connection =>
		connection.on(
			{ commandGroup: 'event', command: 'player_now_playing_progress' },
			console.log
		)
	)
	.then(connection => connection.write('system', 'register_for_change_events', { enable: 'on' }))
