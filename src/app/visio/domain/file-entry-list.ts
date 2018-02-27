
import { FileEntryInfo } from './file-entry-info'

/**
 * 
 * 
 * @typedef {Object} FileEntryList
 * @property {boolean} [exists] - 
 * @property {string} [folder] - 
 * @property {Array<FileEntryInfo>} [entries] - 
 * @property {string} [owner] - 
 * 
 */
export interface FileEntryList {
	/**
	 * 
	 *
	 */
	exists?: boolean
	/**
	 * 
	 *
	 */
	folder?: string
	/**
	 * 
	 *
	 */
	entries?: Array<FileEntryInfo>
	/**
	 * 
	 *
	 */
	owner?: string
}
