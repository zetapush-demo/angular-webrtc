

/**
 * 
 * 
 * @typedef {Object} Group
 * @property {string} [id] -  Group id 
 * @property {string} [deploymentId] -  Group deployment id 
 * @property {string} [name] -  Group name 
 * @property {string} [owner] -  Group owner 
 * @property {string} [resource] -  Group resource 
 * @property {Array<any>} [members] -  Group members 
 * @property {Object} [metadata] -  Group metadata 
 * @property {Array<string>} [tags] -  Group tags 
 * 
 */
export interface Group {
	/**
	 *  Group id 
	 *
	 */
	id?: string
	/**
	 *  Group deployment id 
	 *
	 */
	deploymentId?: string
	/**
	 *  Group name 
	 *
	 */
	name?: string
	/**
	 *  Group owner 
	 *
	 */
	owner?: string
	/**
	 *  Group resource 
	 *
	 */
	resource?: string
	/**
	 *  Group members 
	 *
	 */
	members?: Array<any>
	/**
	 *  Group metadata 
	 *
	 */
	metadata?: Object
	/**
	 *  Group tags 
	 *
	 */
	tags?: Array<string>
}
