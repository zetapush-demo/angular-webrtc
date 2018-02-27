

/**
 *  Contains informations to upload a file on Zetapush platform
 *  
 * 
 * @typedef {Object} FileUploadRequest
 * @property {string} [contentType] - 
 * @property {string} [httpMethod] - 
 * @property {string} [guid] - 
 * @property {string} [url] - 
 * @property {string} [owner] - 
 * 
 */
export interface FileUploadRequest {
	/**
	 * 
	 *
	 */
	contentType?: string
	/**
	 * 
	 *
	 */
	httpMethod?: string
	/**
	 * 
	 *
	 */
	guid?: string
	/**
	 * 
	 *
	 */
	url?: string
	/**
	 * 
	 *
	 */
	owner?: string
}
