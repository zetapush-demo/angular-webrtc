
import { Storable } from './storable'

/**
 * 
 * 
 * @typedef {Object} Metadata
 * @property {Object} [value] -  Value 
 * 
 */
export interface Metadata extends Storable {
	/**
	 *  Value 
	 *
	 */
	value?: Object
}
