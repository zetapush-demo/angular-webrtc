

/**
 *  UploadedFile 
 * 
 * @typedef {Object} UploadedFile
 * @property {string} [contentType] -  File mime type 
 * @property {Object} [meta] -  Metadata, as originally uploaded 
 * @property {string} [guid] -  File GUID 
 * @property {string} [path] -  File path 
 * @property {string} [hash] -  File hash 
 * @property {number} [size] -  File size 
 * @property {string} [url] -  HTTP url 
 * 
 */
export interface UploadedFile {
	/**
	 *  File mime type 
	 *
	 */
	contentType?: string
	/**
	 *  Metadata, as originally uploaded 
	 *
	 */
	meta?: Object
	/**
	 *  File GUID 
	 *
	 */
	guid?: string
	/**
	 *  File path 
	 *
	 */
	path?: string
	/**
	 *  File hash 
	 *
	 */
	hash?: string
	/**
	 *  File size 
	 *
	 */
	size?: number
	/**
	 *  HTTP url 
	 *
	 */
	url?: string
}
