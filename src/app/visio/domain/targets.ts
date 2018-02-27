
import { Storable } from './storable'

/**
 * 
 * 
 * @typedef {Object} Targets
 * @property {Array<string>} [value] -  Value 
 * 
 */
export interface Targets extends Storable {
	/**
	 *  Value 
	 *
	 */
	value?: Array<string>
}
