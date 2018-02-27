

/**
 * 
 * 
 * @typedef {Object} GroupMember
 * @property {string} id -  Group id 
 * @property {string} member -  User key 
 * @property {string} resource -  Group resource
 * 
 */
export interface GroupMember {
	/**
	 *  Group id 
	 *
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 */
	id: string
	/**
	 *  User key 
	 *
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 */
	member: string
	/**
	 *  Group resource
	 *
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 */
	resource: string
}
