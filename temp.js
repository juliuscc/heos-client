const heos = require('.')

heos.discoverAndConnect().then(async client => {
	const prettyJsonResponse = await client.commands.system.prettifyJsonResponse(
		'on'
	)
	console.log(JSON.stringify(prettyJsonResponse))
	client.commands.system.heartBeat().then(response => {
		const print = JSON.stringify(response)
		console.log({ print })
	})
})
