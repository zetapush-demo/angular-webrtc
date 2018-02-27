
import { FileType } from './file-type'
import { UploadedFile } from './uploaded-file'

/**
 *  ListingEntryInfo 
 * 
 * @typedef {Object} ListingEntryInfo
 * @property {Array<string>} [tags] -  File tags 
 * @property {FileType} [type] -  File type 
 * @property {string} [name] -  File name 
 * @property {Object} [metadata] -  File metadata 
 * @property {string} [requestId] -  User field for traceability of requests. Synchronous SDK APIs use this field for you. 
 * @property {number} [creation] -  File creation timestamp 
 * @property {UploadedFile} [url] -  Original upload information 
 * @property {string} [owner] -  Optional User key. When calling the API, defaults to the current (calling) user's primary key. For impersonation purposes, the caller may use the key of another user, provided that the proper authorizations have been given by the impersonated user 
 * 
 */
export interface ListingEntryInfo {
	/**
	 *  File tags 
	 *
	 */
	tags?: Array<string>
	/**
	 *  File type 
	 *
	 */
	type?: FileType
	/**
	 *  File name 
	 *
	 */
	name?: string
	/**
	 *  File metadata 
	 *
	 */
	metadata?: Object
	/**
	 *  User field for traceability of requests. Synchronous SDK APIs use this field for you. 
	 *
	 */
	requestId?: string
	/**
	 *  File creation timestamp 
	 *
	 */
	creation?: number
	/**
	 *  Original upload information 
	 *
	 */
	url?: UploadedFile
	/**
	 *  Optional User key. When calling the API, defaults to the current (calling) user's primary key. For impersonation purposes, the caller may use the key of another user, provided that the proper authorizations have been given by the impersonated user 
	 *
	 */
	owner?: string
}
