
import { GrantListItem } from './grant-list-item'
import { Group } from './group'

/**
 * 
 * 
 * @typedef {Object} Room
 * @property {Array<GrantListItem>} [grants] - 
 * 
 */
export interface Room extends Group {
	/**
	 * 
	 *
	 */
	grants?: Array<GrantListItem>
}
