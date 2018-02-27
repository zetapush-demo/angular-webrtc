

/**
 * 	Define a call
 *  *	A Call state can be (calling / missed / refused / accepted / terminated)
 *  
 * 
 * @typedef {Object} Call
 * @property {string} [id] -  ID of the call 
 * @property {string} [state] -  State of the call 
 * @property {string} [caller] -  userKey of the user that create this call 
 * @property {string} [called] -  ID of the group that receive this call 
 * @property {Object} [context] -  Generic call context 
 * 
 */
export interface Call {
	/**
	 *  ID of the call 
	 *
	 */
	id?: string
	/**
	 *  State of the call 
	 *
	 */
	state?: string
	/**
	 *  userKey of the user that create this call 
	 *
	 */
	caller?: string
	/**
	 *  ID of the group that receive this call 
	 *
	 */
	called?: string
	/**
	 *  Generic call context 
	 *
	 */
	context?: Object
}
