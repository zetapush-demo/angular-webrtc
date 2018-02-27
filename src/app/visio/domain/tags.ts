
import { Storable } from './storable'

/**
 * 
 * 
 * @typedef {Object} Tags
 * @property {Array<string>} [value] -  Value 
 * 
 */
export interface Tags extends Storable {
	/**
	 *  Value 
	 *
	 */
	value?: Array<string>
}
