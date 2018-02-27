
import { Invitation } from './invitation'
import { Room } from './room'

/**
 * 
 * 
 * @typedef {Object} RoomInvitation
 * @property {Room} [room] - 
 * @property {Invitation} [invitation] - 
 * 
 */
export interface RoomInvitation {
	/**
	 * 
	 *
	 */
	room?: Room
	/**
	 * 
	 *
	 */
	invitation?: Invitation
}
