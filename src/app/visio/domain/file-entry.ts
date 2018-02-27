
import { FileEntryInfo } from './file-entry-info'

/**
 * 
 * 
 * @typedef {Object} FileEntry
 * @property {boolean} [exists] - 
 * @property {FileEntryInfo} [entry] - 
 * 
 */
export interface FileEntry {
	/**
	 * 
	 *
	 */
	exists?: boolean
	/**
	 * 
	 *
	 */
	entry?: FileEntryInfo
}
