
import { FileUrl } from './file-url'

/**
 * 
 * 
 * @typedef {Object} FileEntryInfo
 * @property {string} [name] - 
 * @property {string} [type] - 
 * @property {FileUrl} [file] - 
 * @property {number} [creation] - 
 * @property {Object} [metadata] - 
 * @property {Array<string>} [tags] - 
 * @property {string} [owner] - 
 * 
 */
export interface FileEntryInfo {
	/**
	 * 
	 *
	 */
	name?: string
	/**
	 * 
	 *
	 */
	type?: string
	/**
	 * 
	 *
	 */
	file?: FileUrl
	/**
	 * 
	 *
	 */
	creation?: number
	/**
	 * 
	 *
	 */
	metadata?: Object
	/**
	 * 
	 *
	 */
	tags?: Array<string>
	/**
	 * 
	 *
	 */
	owner?: string
}
