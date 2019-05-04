import { HeosConnection } from 'heos-api/dist/types/connection/heosConnection'
import { HeosCommandAttribute, HeosResponse, HeosEvent } from 'heos-api'

function isHeosResponse(
	response: HeosResponse | HeosEvent
): response is HeosResponse {
	return response.heos.hasOwnProperty('result')
}

export default function(
	connection: HeosConnection,
	commandGroup: 'system' | 'player' | 'group' | 'browse',
	command: string,
	attributes?: HeosCommandAttribute
): Promise<HeosResponse> {
	return new Promise((resolve, reject) => {
		connection
			.write(commandGroup, command)
			.once(
				{ commandGroup, command },
				(message: HeosResponse | HeosEvent) => {
					if (isHeosResponse(message)) {
						resolve(message)
					} else {
						reject('Trying to return invalid response')
					}
				}
			)
	})
}
