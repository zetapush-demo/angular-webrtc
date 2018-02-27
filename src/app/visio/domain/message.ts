

/**
 * 
 * 
 * @typedef {Object} Message
 * @property {string} id -  Message uniq id 
 * @property {string} [author] -  Message author 
 * @property {string} type -  Message type
 * @property {Object} [value] -  Message value 
 * @property {number} [createdAt] -  Message created date 
 * @property {Object} [metadata] -  Message metadata 
 * @property {Array<string>} [readers] -  Message readers 
 * @property {Array<string>} [targets] -  Message targets 
 * 
 */
export interface Message {
	/**
	 *  Message uniq id 
	 *
	 * Validation constraints:
	 * - @ValidRoomMessageId(): 
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 * - @Size(min=TODO, max=TODO):  size of a string 
	 *
	 */
	id: string
	/**
	 *  Message author 
	 *
	 */
	author?: string
	/**
	 *  Message type
	 *
	 * Validation constraints:
	 * - @ValidMessageType():  Validate message type
    *  
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 * - @Enum(list=TODO):  value must be part of the list 
	 *
	 */
	type: string
	/**
	 *  Message value 
	 *
	 */
	value?: Object
	/**
	 *  Message created date 
	 *
	 */
	createdAt?: number
	/**
	 *  Message metadata 
	 *
	 */
	metadata?: Object
	/**
	 *  Message readers 
	 *
	 */
	readers?: Array<string>
	/**
	 *  Message targets 
	 *
	 */
	targets?: Array<string>
}
