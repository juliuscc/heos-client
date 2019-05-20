import { HeosConnection } from 'heos-api/dist/types/connection/heosConnection'
import { HeosResponse } from 'heos-api'
import sendCommand from './sendCommand'

export default class HeosSystemCommands {
	constructor(connection: HeosConnection) {
		this.connection = connection
	}

	connection: HeosConnection

	/**
	 * By default HEOS devices do not send `change events`. By sending this
	 * command with enable=on the HEOS devices will broadcast all
	 * `change events` to the client connection.
	 * @param enable Decides if HEOS devices sends `change events` or not
	 * @example ```heos://system/register_for_change_events?enable=on```
	 * @response
	 * ```
	 * Response: {
	 *   "heos": {
	 *     "command": "system/register_for_change_events",
	 *     "result": "success",
	 *     "message": "enable='on_or_off'"
	 *   }
	 * }
	 * ```
	 */
	registerForChangeEvents = (enable: 'on' | 'off'): Promise<HeosResponse> =>
		sendCommand(this.connection, 'system', 'register_for_change_events', {
			enable
		})

	/**
	 * Returns current user name in its `message` field if the user is currently
	 * singed in.
	 * @example ```heos://system/check_account```
	 * @response
	 * ```
	 * Response: {
	 *   "heos": {
	 *     "command": "system/check_account",
	 *     "result": "success",
	 *     "message": "signed_out" or "signed_in&un=<current user name>"
	 * }}
	 * ```
	 */
	checkAccount = (): Promise<HeosResponse> =>
		sendCommand(this.connection, 'system', 'check_account')

	/**
	 * Sign in to HEOS device
	 * @param username username for account
	 * @param password password for account
	 * @example ```heos://system/sign_in?un=heos_username&pw=heos_password```
	 * @response
	 * ```
	 * Response: {
	 *   "heos": {
	 *     "command": "system/sign_in",
	 *     "result": "success",
	 *     "message": "signed_in&un=<current user name>"
	 *   }
	 * }
	 * ```
	 */
	signIn = (username: string, password: string): Promise<HeosResponse> =>
		sendCommand(this.connection, 'system', 'sign_in', {
			un: username,
			pw: password
		})

	/**
	 * Sign out off HEOS device
	 * @example ```heos://system/sign_out```
	 * @response
	 * ```
	 * Response: {
	 *   "heos": {
	 *     "command": "system/sign_out",
	 *     "result": "success",
	 *     "message": "signed_out"
	 *   }
	 * }
	 * ```
	 */
	signOut = (): Promise<HeosResponse> =>
		sendCommand(this.connection, 'system', 'sign_out')

	/**
	 * Sends heart beat to HEOS device. Mostly for debug purposes.
	 * @example ```heos://system/heart_beat```
	 * @response
	 * ```
	 * Response: {
	 *   "heos": {
	 *     "command": "system/heart_beat",
	 *     "result": "success",
	 *     "message": ""
	 *   }
	 * }
	 * ```
	 */
	heartBeat = (): Promise<HeosResponse> =>
		sendCommand(this.connection, 'system', 'heart_beat')

	/**
	 * Reboots HEOS device. This command can only be used to reboot the HEOS
	 * device to which the controller is connected to. This will end your
	 * connection.
	 * @example ```heos://system/reboot```
	 * @response
	 * ```
	 * Response: {
	 *   "heos": {
	 *     "command": "system/reboot",
	 *     "result": "success",
	 *     "message": ""
	 *   }
	 * }
	 * ```
	 */
	reboot = (): void => {
		this.connection.write('system', 'reboot')
	}

	/**
	 * Helper command to prettify JSON response. As `heos-client` parses every
	 * message as a JavaScript object this does not affect users of this library.
	 * @example ```heos://system/prettify_json_response?enable=on```
	 * @response
	 * ```
	 * Response: {
	 *   "heos": {
	 *     "command": "system/prettify_json_response",
	 *     "result": "success",
	 *     "message": "enable='on_or_off'"
	 *   }
	 * }
	 * ```
	 */
	prettifyJsonResponse = (enable: 'on' | 'off'): Promise<HeosResponse> =>
		sendCommand(this.connection, 'system', 'prettify_json_response', {
			enable
		})
}
