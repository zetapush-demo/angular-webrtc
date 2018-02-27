
import { Pagination } from './pagination'

/**
 * 
 * 
 * @typedef {Object} ResponsePagination
 * @property {boolean} [hasNext] -  true to indicate if there is one more page available, false otherwise 
 * 
 */
export interface ResponsePagination extends Pagination {
	/**
	 *  true to indicate if there is one more page available, false otherwise 
	 *
	 */
	hasNext?: boolean
}
