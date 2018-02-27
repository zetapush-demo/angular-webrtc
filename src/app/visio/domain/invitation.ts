

/**
 * 
 * 
 * @typedef {Object} Invitation
 * @property {string} id -  Invitation id 
 * @property {string} owner -  Invitation id 
 * @property {string} [guest] -  Guest user key 
 * @property {number} [expiry] -  Invitation exipry 
 * @property {number} [createdAt] -  Invitation createdAt 
 * @property {Object} [context] -  Invitation context 
 * @property {string} [message] -  Invitation message 
 * 
 */
export interface Invitation {
	/**
	 *  Invitation id 
	 *
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 */
	id: string
	/**
	 *  Invitation id 
	 *
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 */
	owner: string
	/**
	 *  Guest user key 
	 *
	 */
	guest?: string
	/**
	 *  Invitation exipry 
	 *
	 */
	expiry?: number
	/**
	 *  Invitation createdAt 
	 *
	 */
	createdAt?: number
	/**
	 *  Invitation context 
	 *
	 */
	context?: Object
	/**
	 *  Invitation message 
	 *
	 */
	message?: string
}
