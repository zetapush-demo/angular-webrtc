

/**
 *  GrantListItem 
 * 
 * @typedef {Object} GrantListItem
 * @property {string} [resource] -  Configured authorized resource 
 * @property {string} [action] -  Configured authorized action 
 * 
 */
export interface GrantListItem {
	/**
	 *  Configured authorized resource 
	 *
	 */
	resource?: string
	/**
	 *  Configured authorized action 
	 *
	 */
	action?: string
}
