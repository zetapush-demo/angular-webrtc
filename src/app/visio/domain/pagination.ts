

/**
 * 
 * 
 * @typedef {Object} Pagination
 * @property {number} [pageSize] -  page size 
 * @property {number} [pageNumber] -  page number 
 * @property {string} [direction] -  page direction
 * 
 */
export interface Pagination {
	/**
	 *  page size 
	 *
	 * Validation constraints:
	 * - @Min(min=TODO):  minimum value for an integer 
	 * - @Max(max=TODO):  maximum value for an integer 
	 *
	 */
	pageSize?: number
	/**
	 *  page number 
	 *
	 * Validation constraints:
	 * - @Min(min=TODO):  minimum value for an integer 
	 *
	 */
	pageNumber?: number
	/**
	 *  page direction
	 *
	 */
	direction?: string
}
