import {
	connect as apiConnect,
	discoverAndConnect as apiDiscoverAndConnect
} from 'heos-api'
import { HeosConnection } from 'heos-api/dist/types/connection/heosConnection'
import HeosPlayerCommands from './commands/player'
import HeosSystemCommands from './commands/system'

export async function connect(address: string): Promise<HeosClient> {
	const connection: HeosConnection = await apiConnect(address)
	const client = new HeosClient(connection)
	return client
}

export async function discoverAndConnect(
	timeout?: number
): Promise<HeosClient> {
	const connection: HeosConnection = await apiDiscoverAndConnect(timeout)
	const client = new HeosClient(connection)
	return client
}

export default class HeosClient {
	constructor(connection: HeosConnection) {
		this.connection = connection

		this.system = new HeosSystemCommands(this.connection)
		this.player = new HeosPlayerCommands(this.connection)
	}

	private connection: HeosConnection

	system: HeosSystemCommands
	player: HeosPlayerCommands
}
