

/**
 * 
 * 
 * @typedef {Object} Storable
 * @property {string} [id] -  Id 
 * @property {number} [revision] -  Revision 
 * @property {number} [update] -  Update 
 * 
 */
export interface Storable {
	/**
	 *  Id 
	 *
	 */
	id?: string
	/**
	 *  Revision 
	 *
	 */
	revision?: number
	/**
	 *  Update 
	 *
	 */
	update?: number
}
