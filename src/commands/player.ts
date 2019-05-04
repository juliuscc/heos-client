import { HeosConnection } from 'heos-api/dist/types/connection/heosConnection'
import { HeosEventListener, HeosResponse, HeosEvent } from 'heos-api'
import sendCommand from './sendCommand'

export default class HeosPlayerCommands {
	constructor(connection: HeosConnection) {
		this.connection = connection
	}

	connection: HeosConnection

	getPlayers = (): Promise<HeosResponse> =>
		sendCommand(this.connection, 'player', 'get_players')
}
