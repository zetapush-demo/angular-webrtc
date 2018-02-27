
import { NgZone } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Api, ZetaPushClient, createApi } from 'zetapush-angular'

import { Call } from './domain/call'
import { FileEntry } from './domain/file-entry'
import { FileEntryInfo } from './domain/file-entry-info'
import { FileEntryList } from './domain/file-entry-list'
import { FileType } from './domain/file-type'
import { FileUploadRequest } from './domain/file-upload-request'
import { FileUrl } from './domain/file-url'
import { GrantListItem } from './domain/grant-list-item'
import { Group } from './domain/group'
import { GroupMember } from './domain/group-member'
import { GroupMembership } from './domain/group-membership'
import { Invitation } from './domain/invitation'
import { ListingEntryInfo } from './domain/listing-entry-info'
import { Message } from './domain/message'
import { Metadata } from './domain/metadata'
import { Pagination } from './domain/pagination'
import { ResponsePagination } from './domain/response-pagination'
import { Room } from './domain/room'
import { RoomInvitation } from './domain/room-invitation'
import { Storable } from './domain/storable'
import { Tags } from './domain/tags'
import { Targets } from './domain/targets'
import { UploadedFile } from './domain/uploaded-file'
import { User } from './domain/user'


/**
 * 
 *
 * @name visio
 * @version 1.0.0
 */
export class VisioApi extends Api {


	/**
	 *  Get metadata
	 *  
	 * 
	 * @event Metadata triggered on channel getMetadata
	 */
	public onGetMetadata: Observable<Metadata>

	/**
	 *  Remove metadata
	 *  
	 * 
	 * @event {id?: string} triggered on channel removeMetadata
	 */
	public onRemoveMetadata: Observable<{id?: string}>

	/**
	 *  Set metadata
	 *  
	 * 
	 * @event Metadata triggered on channel setMetadata
	 */
	public onSetMetadata: Observable<Metadata>

	/**
	 * 
	 *  
	 * 
	 * @event Tags triggered on channel getTags
	 */
	public onGetTags: Observable<Tags>

	/**
	 *  Remove tags
	 *  
	 * 
	 * @event {id?: string} triggered on channel removeTags
	 */
	public onRemoveTags: Observable<{id?: string}>

	/**
	 * 
	 *  
	 * 
	 * @event Tags triggered on channel setTags
	 */
	public onSetTags: Observable<Tags>

	/**
	 *  Get targets associated to a specific id
	 *  * Targets represent a list of string (group id or user key) 
	 *  
	 * 
	 * @event Targets triggered on channel getTargets
	 */
	public onGetTargets: Observable<Targets>

	/**
	 *  Remove targets associated to a specific id
	 *  * Targets represent a list of string (group id or user key)
	 *  
	 * 
	 * @event {id?: string} triggered on channel removeTargets
	 */
	public onRemoveTargets: Observable<{id?: string}>

	/**
	 *  Define targets associated to a specific id
	 *  * Targets represent a list of string (group id or user key)
	 *  
	 * 
	 * @event Targets triggered on channel setTargets
	 */
	public onSetTargets: Observable<Targets>

	/**
	 *  Create a group
	 *  
	 * 
	 * @event {group?: Group} triggered on channel createGroup
	 */
	public onCreateGroup: Observable<{group?: Group}>

	/**
	 *  Delete a group
	 *  
	 * 
	 * @event {id?: string} triggered on channel deleteGroup
	 */
	public onDeleteGroup: Observable<{id?: string}>

	/**
	 *  Get a group
	 *  
	 * 
	 * @event {group?: Group} triggered on channel getGroup
	 */
	public onGetGroup: Observable<{group?: Group}>

	/**
	 *  Get all user groups
	 *  
	 * 
	 * @event {list?: Array<Group>} triggered on channel getGroupList
	 */
	public onGetGroupList: Observable<{list?: Array<Group>}>

	/**
	 *  Get all the groups user is part of
	 *  
	 * 
	 * @event {list?: Array<Group>} triggered on channel getUserGroupList
	 */
	public onGetUserGroupList: Observable<{list?: Array<Group>}>

	/**
	 *  Add user in a group
	 *  
	 * 
	 * @event GroupMember triggered on channel addGroupMember
	 */
	public onAddGroupMember: Observable<GroupMember>

	/**
	 *  Test membership for current user for a group id and owner
	 *  
	 * 
	 * @event GroupMembership triggered on channel isMemberOf
	 */
	public onIsMemberOf: Observable<GroupMembership>

	/**
	 *  Remove user from a group
	 *  
	 * 
	 * @event GroupMember triggered on channel removeGroupMember
	 */
	public onRemoveGroupMember: Observable<GroupMember>

	/**
	 * 	Macroscript that used to send the call object as a missed call.
	 *  *	The client need to listen this macroscript to handle missed calls
	 *  
	 * 
	 * @event {callObject?: Call} triggered on channel addToMissedCall
	 */
	public onAddToMissedCall: Observable<{callObject?: Call}>

	/**
	 * 	Macrosript used to send a call to a group
	 *  
	 * 
	 * @event {callObject?: Call, source?: null} triggered on channel callGroup
	 */
	public onCallGroup: Observable<{callObject?: Call, source?: null}>

	/**
	 * 	Macroscript called when the call is accepted.
	 *  *	We change the state of the call in the database
	 *  
	 * 
	 * @event {callObject?: Call} triggered on channel setCallAccepted
	 */
	public onSetCallAccepted: Observable<{callObject?: Call}>

	/**
	 * 	Macroscript called when the call is refused.
	 *  *	We change the state of the call in the database
	 *  
	 * 
	 * @event {callObject?: Call} triggered on channel setCallRefused
	 */
	public onSetCallRefused: Observable<{callObject?: Call}>

	/**
	 * 	Macroscript called when the call is terminated.
	 *  *	We change the state of the call in the database
	 *  
	 * 
	 * @event {callObject?: Call} triggered on channel setCallTerminated
	 */
	public onSetCallTerminated: Observable<{callObject?: Call}>

	/**
	 * 	Macroscript called after the timeout.
	 *  *	This timeout is used to simulate a call that is ringing on the device
	 *  
	 * 
	 * @event {id?: string} triggered on channel timeoutCall
	 */
	public onTimeoutCall: Observable<{id?: string}>

	/**
	 * 	Get the list of in progress call by user
	 *  
	 * 
	 * @event {listMissedCalls?: Array<any>} triggered on channel getCurrentCallByUser
	 */
	public onGetCurrentCallByUser: Observable<{listMissedCalls?: Array<any>}>

	/**
	 * 	Get the list of missed call by user
	 *  
	 * 
	 * @event {listMissedCalls?: Array<any>} triggered on channel getMissedCallByUser
	 */
	public onGetMissedCallByUser: Observable<{listMissedCalls?: Array<any>}>

	/**
	 * 
	 *  
	 * 
	 * @event FileEntryInfo triggered on channel confirmFileUpload
	 */
	public onConfirmFileUpload: Observable<FileEntryInfo>

	/**
	 * 
	 *  
	 * 
	 * @event {path?: string, owner?: string} triggered on channel deleteFileEntry
	 */
	public onDeleteFileEntry: Observable<{path?: string, owner?: string}>

	/**
	 * 
	 *  
	 * 
	 * @event FileEntry triggered on channel getFileEntry
	 */
	public onGetFileEntry: Observable<FileEntry>

	/**
	 * 
	 *  
	 * 
	 * @event FileEntryList triggered on channel getFileEntryList
	 */
	public onGetFileEntryList: Observable<FileEntryList>

	/**
	 * 
	 *  
	 * 
	 * @event FileUploadRequest triggered on channel requestFileUpload
	 */
	public onRequestFileUpload: Observable<FileUploadRequest>

	/**
	 *  Set avatar in user profile
	 *  
	 * 
	 * @event {avatar?: ListingEntryInfo} triggered on channel updateUserAvatar
	 */
	public onUpdateUserAvatar: Observable<{avatar?: ListingEntryInfo}>

	/**
	 *  Confirm the new user password.
	 *  * Token and password are required, token can be retreived via a call on resetUserPassword macro
	 *  
	 * 
	 * @event {password?: string, token?: string} triggered on channel confirmUserPassword
	 */
	public onConfirmUserPassword: Observable<{password?: string, token?: string}>

	/**
	 * 
	 * 
	 * @event {user?: User} triggered on channel resetUserPassword
	 */
	public onResetUserPassword: Observable<{user?: User}>

	/**
	 * 
	 * 
	 * @event {user?: User} triggered on channel resetUserPasswordByLogin
	 */
	public onResetUserPasswordByLogin: Observable<{user?: User}>

	/**
	 *  Create a new ZetaPush with a credentials based authentication
	 *  * User profile can be customized with the followings config variables:
	 *  * <ul>
	 *  *	<li><strong>@config.authentication.simple.mandatory_fields</strong> Add mandatory fields to user profile (default is email)</li>
	 *  *	<li><strong>@config.authentication.simple.public_fields</strong> Add public fields to user profile (defaults are email,firstname,lastname,mobilenumber,phonenumber,birthday,avatar,biography)</li>
	 *  * </ul>
	 *  
	 * 
	 * @event {user?: User} triggered on channel createUser
	 */
	public onCreateUser: Observable<{user?: User}>

	/**
	 *  Get user profile according to the given user key
	 *  * <strong>UserKey is not the login used to connect the user</strong>
	 *  * To get a user profile based on the login value, you have to call <a href="./getUserbyLogin.html">getUserbyLogin()</a>
	 *  * User Key is the uniq key associted to each ZetaPush user. You can acces to this value with special keyword <strong>__userKey</strong>
	 *  
	 * 
	 * @event {user?: User} triggered on channel getUser
	 */
	public onGetUser: Observable<{user?: User}>

	/**
	 *  Get user profile according to the login use to connect the user
	 *  * <strong>Login is not the user key of the user</strong>
	 *  
	 * 
	 * @event {user?: User} triggered on channel getUserByLogin
	 */
	public onGetUserByLogin: Observable<{user?: User}>

	/**
	 *  Get list of users according to user keys list
	 *  * Returned list wrap user profile in a ad hoc data structure
	 *  * <pre><code>
	 *  * class UserWrapper {
	 *  *   boolean found;
	 *  *   User user;
	 *  * }
	 *  * </code></pre>
	 *  
	 * 
	 * @event {list?: Array<any>} triggered on channel getUserList
	 */
	public onGetUserList: Observable<{list?: Array<any>}>

	/**
	 *  Update user profile
	 *  * User profile can be customized with the followings config variables:
	 *  * <ul>
	 *  *	<li><strong>@config.authentication.simple.mandatory_fields</strong> Add mandatory fields to user profile (default is email)</li>
	 *  *	<li><strong>@config.authentication.simple.public_fields</strong> Add public fields to user profile (defaults are email,firstname,lastname,mobilenumber,phonenumber,birthday,avatar,biography)</li>
	 *  * </ul>
	 *  
	 * 
	 * @event {user?: User} triggered on channel updateUser
	 */
	public onUpdateUser: Observable<{user?: User}>

	/**
	 *  Accept Room Invitation
	 *  
	 * 
	 * @event {room?: Room} triggered on channel acceptRoomInvitation
	 */
	public onAcceptRoomInvitation: Observable<{room?: Room}>

	/**
	 * 
	 *  
	 * 
	 * @event RoomInvitation triggered on channel createRoomInvitation
	 */
	public onCreateRoomInvitation: Observable<RoomInvitation>

	/**
	 * 
	 *  
	 * 
	 * @event RoomInvitation triggered on channel createRoomMemberInvitation
	 */
	public onCreateRoomMemberInvitation: Observable<RoomInvitation>

	/**
	 * 
	 *  
	 * 
	 * @event GroupMember triggered on channel addRoomMember
	 */
	public onAddRoomMember: Observable<GroupMember>

	/**
	 * 
	 *  
	 * 
	 * @event GroupMember triggered on channel removeRoomMember
	 */
	public onRemoveRoomMember: Observable<GroupMember>

	/**
	 * 
	 *  
	 * 
	 * @event {container?: string, room?: Room, message?: Message} triggered on channel addRoomMessage
	 */
	public onAddRoomMessage: Observable<{container?: string, room?: Room, message?: Message}>

	/**
	 * 
	 *  
	 * 
	 * @event {container?: string, room?: Room, message?: Message} triggered on channel getRoomMessage
	 */
	public onGetRoomMessage: Observable<{container?: string, room?: Room, message?: Message}>

	/**
	 * 
	 *  
	 * 
	 * @event {container?: string, room?: Room, list?: Array<Message>, page?: ResponsePagination} triggered on channel getRoomMessageList
	 */
	public onGetRoomMessageList: Observable<{container?: string, room?: Room, list?: Array<Message>, page?: ResponsePagination}>

	/**
	 * 
	 *  
	 * 
	 * @event {container?: string, room?: Room, list?: Array<Object>} triggered on channel purgeRoomMessageList
	 */
	public onPurgeRoomMessageList: Observable<{container?: string, room?: Room, list?: Array<Object>}>

	/**
	 * 
	 *  
	 * 
	 * @event {container?: string, room?: Room, message?: Message} triggered on channel sendRoomMessageToMember
	 */
	public onSendRoomMessageToMember: Observable<{container?: string, room?: Room, message?: Message}>

	/**
	 * 
	 *  
	 * 
	 * @event {container?: string, room?: Room, message?: Message} triggered on channel updateRoomMessageByService
	 */
	public onUpdateRoomMessageByService: Observable<{container?: string, room?: Room, message?: Message}>

	/**
	 * 
	 *  
	 * 
	 * @event {room?: Room} triggered on channel createOneToOneRoom
	 */
	public onCreateOneToOneRoom: Observable<{room?: Room}>

	/**
	 *  Create a room with the global owner user
	 *  
	 * 
	 * @event {room?: Room, member?: null} triggered on channel createOrJoinPublicRoom
	 */
	public onCreateOrJoinPublicRoom: Observable<{room?: Room, member?: null}>

	/**
	 *  Create a room with the global owner user
	 *  
	 * 
	 * @event {room?: Room} triggered on channel createPublicRoom
	 */
	public onCreatePublicRoom: Observable<{room?: Room}>

	/**
	 * 
	 *  
	 * 
	 * @event {room?: Room} triggered on channel createRoom
	 */
	public onCreateRoom: Observable<{room?: Room}>

	/**
	 * 
	 *  
	 * 
	 * @event {room?: Room, messages?: Array<Object>, page?: Pagination} triggered on channel getRoom
	 */
	public onGetRoom: Observable<{room?: Room, messages?: Array<Object>, page?: Pagination}>

	/**
	 * 
	 *  
	 * 
	 * @event {list?: Array<Object>} triggered on channel getUserRoomList
	 */
	public onGetUserRoomList: Observable<{list?: Array<Object>}>

	/**
	 *  join a public room
	 *  
	 * 
	 * @event {room?: Room, member?: null} triggered on channel joinPublicRoom
	 */
	public onJoinPublicRoom: Observable<{room?: Room, member?: null}>

	/**
	 *  leave a public room
	 *  
	 * 
	 * @event {room?: Room, member?: null} triggered on channel leavePublicRoom
	 */
	public onLeavePublicRoom: Observable<{room?: Room, member?: null}>
	
		
	/**
	 *  Get metadata
	 *  
	 * 
	 * @param {string} id -  Metadata id 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires Metadata on channel getMetadata 
	 * @returns a promise
	 */
	getMetadata({ id }: { id: string }): Promise<Metadata> {
		return this.$publish('getMetadata', { id })
	}
		
	/**
	 *  Remove metadata
	 *  
	 * 
	 * @param {string} id -  Metadata id 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {id?: string} on channel removeMetadata (broadcast)
	 * @returns a promise
	 */
	removeMetadata({ id }: { id: string }): Promise<{id?: string}> {
		return this.$publish('removeMetadata', { id })
	}
		
	/**
	 *  Set metadata
	 *  
	 * 
	 * @param {string} id -  Metadata id 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {Object} metadata -  Metadata value 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires Metadata on channel setMetadata 
	 * @returns a promise
	 */
	setMetadata({ id, metadata }: { id: string, metadata: Object }): Promise<Metadata> {
		return this.$publish('setMetadata', { id, metadata })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {string} id -  Tags id 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires Tags on channel getTags 
	 * @returns a promise
	 */
	getTags({ id }: { id: string }): Promise<Tags> {
		return this.$publish('getTags', { id })
	}
		
	/**
	 *  Remove tags
	 *  
	 * 
	 * @param {string} id -  Tags id 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {id?: string} on channel removeTags (broadcast)
	 * @returns a promise
	 */
	removeTags({ id }: { id: string }): Promise<{id?: string}> {
		return this.$publish('removeTags', { id })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {string} id -  Tags id 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {string} tags -  tags value
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires Tags on channel setTags (broadcast)
	 * @returns a promise
	 */
	setTags({ id, tags }: { id: string, tags: string }): Promise<Tags> {
		return this.$publish('setTags', { id, tags })
	}
		
	/**
	 *  Get targets associated to a specific id
	 *  * Targets represent a list of string (group id or user key) 
	 *  
	 * 
	 * @param {string} id -  Targets id 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires Targets on channel getTargets 
	 * @returns a promise
	 */
	getTargets({ id }: { id: string }): Promise<Targets> {
		return this.$publish('getTargets', { id })
	}
		
	/**
	 *  Remove targets associated to a specific id
	 *  * Targets represent a list of string (group id or user key)
	 *  
	 * 
	 * @param {string} id -  Targets id 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {id?: string} on channel removeTargets (broadcast)
	 * @returns a promise
	 */
	removeTargets({ id }: { id: string }): Promise<{id?: string}> {
		return this.$publish('removeTargets', { id })
	}
		
	/**
	 *  Define targets associated to a specific id
	 *  * Targets represent a list of string (group id or user key)
	 *  
	 * 
	 * @param {string} id -  Targets id 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {string} targets -  Targets value
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires Targets on channel setTargets (broadcast)
	 * @returns a promise
	 */
	setTargets({ id, targets }: { id: string, targets: string }): Promise<Targets> {
		return this.$publish('setTargets', { id, targets })
	}
		
	/**
	 *  Create a group
	 *  
	 * 
	 * @param {string} [id] -  Optionnal group id 
	 *
	 * @param {string} name -  Mandatory group name 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {Array<any>} [members] -  Optionnal group members 
	 *
	 * @param {Object} [metadata] -  Optionnal group metadata 
	 *
	 * @param {Array<any>} [tags] -  Optionnal group tags 
	 *
	 *
	 * @fires {group?: Group} on channel createGroup (broadcast)
	 * @returns a promise
	 */
	createGroup({ id, name, members, metadata, tags }: { id?: string, name: string, members?: Array<any>, metadata?: Object, tags?: Array<any> }): Promise<{group?: Group}> {
		return this.$publish('createGroup', { id, name, members, metadata, tags })
	}
		
	/**
	 *  Delete a group
	 *  
	 * 
	 * @param {string} id -  Group id 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {id?: string} on channel deleteGroup (broadcast)
	 * @returns a promise
	 */
	deleteGroup({ id }: { id: string }): Promise<{id?: string}> {
		return this.$publish('deleteGroup', { id })
	}
		
	/**
	 *  Get a group
	 *  
	 * 
	 * @param {string} id -  Group id 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {group?: Group} on channel getGroup 
	 * @returns a promise
	 */
	getGroup({ id }: { id: string }): Promise<{group?: Group}> {
		return this.$publish('getGroup', { id })
	}
		
	/**
	 *  Get all user groups
	 *  
	 * 
	 *
	 * @fires {list?: Array<Group>} on channel getGroupList 
	 * @returns a promise
	 */
	getGroupList(): Promise<{list?: Array<Group>}> {
		return this.$publish('getGroupList', {  })
	}
		
	/**
	 *  Get all the groups user is part of
	 *  
	 * 
	 *
	 * @fires {list?: Array<Group>} on channel getUserGroupList 
	 * @returns a promise
	 */
	getUserGroupList(): Promise<{list?: Array<Group>}> {
		return this.$publish('getUserGroupList', {  })
	}
		
	/**
	 *  Add user in a group
	 *  
	 * 
	 * @param {string} id -  Group id 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {string} member -  User key 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires GroupMember on channel addGroupMember (broadcast)
	 * @returns a promise
	 */
	addGroupMember({ id, member }: { id: string, member: string }): Promise<GroupMember> {
		return this.$publish('addGroupMember', { id, member })
	}
		
	/**
	 *  Test membership for current user for a group id and owner
	 *  
	 * 
	 * @param {string} id -  Group id 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {string} owner -  Group owner 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {boolean} isHardFail -  Is hard fail mode 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires GroupMembership on channel isMemberOf 
	 * @returns a promise
	 */
	isMemberOf({ id, owner, isHardFail }: { id: string, owner: string, isHardFail: boolean }): Promise<GroupMembership> {
		return this.$publish('isMemberOf', { id, owner, isHardFail })
	}
		
	/**
	 *  Remove user from a group
	 *  
	 * 
	 * @param {string} id -  Group id 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {string} member -  User key 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires GroupMember on channel removeGroupMember (broadcast)
	 * @returns a promise
	 */
	removeGroupMember({ id, member }: { id: string, member: string }): Promise<GroupMember> {
		return this.$publish('removeGroupMember', { id, member })
	}
		
	/**
	 * 	Macroscript that used to send the call object as a missed call.
	 *  *	The client need to listen this macroscript to handle missed calls
	 *  
	 * 
	 * @param {Call} callObject -  Call object 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {callObject?: Call} on channel addToMissedCall (broadcast)
	 * @returns a promise
	 */
	addToMissedCall({ callObject }: { callObject: Call }): Promise<{callObject?: Call}> {
		return this.$publish('addToMissedCall', { callObject })
	}
		
	/**
	 * 	Macrosript used to send a call to a group
	 *  
	 * 
	 * @param {string} id -  ID of the group we want to call 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {Object} [context] -  Generic call context 
	 *
	 *
	 * @fires {callObject?: Call, source?: null} on channel callGroup (broadcast)
	 * @returns a promise
	 */
	callGroup({ id, context }: { id: string, context?: Object }): Promise<{callObject?: Call, source?: null}> {
		return this.$publish('callGroup', { id, context })
	}
		
	/**
	 * 	Macroscript called when the call is accepted.
	 *  *	We change the state of the call in the database
	 *  
	 * 
	 * @param {string} id -  ID of the call 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {callObject?: Call} on channel setCallAccepted 
	 * @returns a promise
	 */
	setCallAccepted({ id }: { id: string }): Promise<{callObject?: Call}> {
		return this.$publish('setCallAccepted', { id })
	}
		
	/**
	 * 	Macroscript called when the call is refused.
	 *  *	We change the state of the call in the database
	 *  
	 * 
	 * @param {string} id -  ID of the call 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {callObject?: Call} on channel setCallRefused 
	 * @returns a promise
	 */
	setCallRefused({ id }: { id: string }): Promise<{callObject?: Call}> {
		return this.$publish('setCallRefused', { id })
	}
		
	/**
	 * 	Macroscript called when the call is terminated.
	 *  *	We change the state of the call in the database
	 *  
	 * 
	 * @param {string} id -  ID of the call 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {callObject?: Call} on channel setCallTerminated 
	 * @returns a promise
	 */
	setCallTerminated({ id }: { id: string }): Promise<{callObject?: Call}> {
		return this.$publish('setCallTerminated', { id })
	}
		
	/**
	 * 	Macroscript called after the timeout.
	 *  *	This timeout is used to simulate a call that is ringing on the device
	 *  
	 * 
	 * @param {string} id -  ID of the call 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {id?: string} on channel timeoutCall (broadcast)
	 * @returns a promise
	 */
	timeoutCall({ id }: { id: string }): Promise<{id?: string}> {
		return this.$publish('timeoutCall', { id })
	}
		
	/**
	 * 	Get the list of in progress call by user
	 *  
	 * 
	 * @param {string} userKey -  UserKey of the user 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {Pagination} [page] -  Pagination object 
	 *
	 *
	 * @fires {listMissedCalls?: Array<any>} on channel getCurrentCallByUser 
	 * @returns a promise
	 */
	getCurrentCallByUser({ userKey, page }: { userKey: string, page?: Pagination }): Promise<{listMissedCalls?: Array<any>}> {
		return this.$publish('getCurrentCallByUser', { userKey, page })
	}
		
	/**
	 * 	Get the list of missed call by user
	 *  
	 * 
	 * @param {string} userKey -  UserKey of the user 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {Pagination} [page] -  Pagination object 
	 *
	 *
	 * @fires {listMissedCalls?: Array<any>} on channel getMissedCallByUser 
	 * @returns a promise
	 */
	getMissedCallByUser({ userKey, page }: { userKey: string, page?: Pagination }): Promise<{listMissedCalls?: Array<any>}> {
		return this.$publish('getMissedCallByUser', { userKey, page })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {string} guid - 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {string} [owner] - 
	 *
	 * @param {Object} [actions] - 
	 *
	 * @param {Object} [metadata] - 
	 *
	 * @param {Array<any>} [tags] - 
	 *
	 *
	 * @fires FileEntryInfo on channel confirmFileUpload (broadcast)
	 * @returns a promise
	 */
	confirmFileUpload({ guid, owner, actions, metadata, tags }: { guid: string, owner?: string, actions?: Object, metadata?: Object, tags?: Array<any> }): Promise<FileEntryInfo> {
		return this.$publish('confirmFileUpload', { guid, owner, actions, metadata, tags })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {string} path -  
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {string} [owner] -  
	 *
	 *
	 * @fires {path?: string, owner?: string} on channel deleteFileEntry (broadcast)
	 * @returns a promise
	 */
	deleteFileEntry({ path, owner }: { path: string, owner?: string }): Promise<{path?: string, owner?: string}> {
		return this.$publish('deleteFileEntry', { path, owner })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {string} path -  
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {string} [owner] -  
	 *
	 *
	 * @fires FileEntry on channel getFileEntry 
	 * @returns a promise
	 */
	getFileEntry({ path, owner }: { path: string, owner?: string }): Promise<FileEntry> {
		return this.$publish('getFileEntry', { path, owner })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {string} folder -  
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {string} [owner] -  
	 *
	 *
	 * @fires FileEntryList on channel getFileEntryList 
	 * @returns a promise
	 */
	getFileEntryList({ folder, owner }: { folder: string, owner?: string }): Promise<FileEntryList> {
		return this.$publish('getFileEntryList', { folder, owner })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {string} contentType - 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {string} folder - 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {string} [owner] - 
	 *
	 *
	 * @fires FileUploadRequest on channel requestFileUpload (broadcast)
	 * @returns a promise
	 */
	requestFileUpload({ contentType, folder, owner }: { contentType: string, folder: string, owner?: string }): Promise<FileUploadRequest> {
		return this.$publish('requestFileUpload', { contentType, folder, owner })
	}
		
	/**
	 *  Set avatar in user profile
	 *  
	 * 
	 * @param {string} path -  File path 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {avatar?: ListingEntryInfo} on channel updateUserAvatar (broadcast)
	 * @returns a promise
	 */
	updateUserAvatar({ path }: { path: string }): Promise<{avatar?: ListingEntryInfo}> {
		return this.$publish('updateUserAvatar', { path })
	}
		
	/**
	 *  Confirm the new user password.
	 *  * Token and password are required, token can be retreived via a call on resetUserPassword macro
	 *  
	 * 
	 * @param {string} password - 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {string} token - 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {password?: string, token?: string} on channel confirmUserPassword (broadcast)
	 * @returns a promise
	 */
	confirmUserPassword({ password, token }: { password: string, token: string }): Promise<{password?: string, token?: string}> {
		return this.$publish('confirmUserPassword', { password, token })
	}
		
	/**
	 * 
	 * 
	 * @param {string} [userKey] - 
	 *
	 *
	 * @fires {user?: User} on channel resetUserPassword (broadcast)
	 * @returns a promise
	 */
	resetUserPassword({ userKey }: { userKey?: string }): Promise<{user?: User}> {
		return this.$publish('resetUserPassword', { userKey })
	}
		
	/**
	 * 
	 * 
	 * @param {string} login - 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {user?: User} on channel resetUserPasswordByLogin (broadcast)
	 * @returns a promise
	 */
	resetUserPasswordByLogin({ login }: { login: string }): Promise<{user?: User}> {
		return this.$publish('resetUserPasswordByLogin', { login })
	}
		
	/**
	 *  Create a new ZetaPush with a credentials based authentication
	 *  * User profile can be customized with the followings config variables:
	 *  * <ul>
	 *  *	<li><strong>@config.authentication.simple.mandatory_fields</strong> Add mandatory fields to user profile (default is email)</li>
	 *  *	<li><strong>@config.authentication.simple.public_fields</strong> Add public fields to user profile (defaults are email,firstname,lastname,mobilenumber,phonenumber,birthday,avatar,biography)</li>
	 *  * </ul>
	 *  
	 * 
	 * @param {string} login - 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {string} password - 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {Object} fields -  Extra mandatory fields for user profile 
	 * Validation constraints:
	 * - @AuthMandatoryFields(): 
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {user?: User} on channel createUser (broadcast)
	 * @returns a promise
	 */
	createUser({ login, password, fields }: { login: string, password: string, fields: Object }): Promise<{user?: User}> {
		return this.$publish('createUser', { login, password, fields })
	}
		
	/**
	 *  Get user profile according to the given user key
	 *  * <strong>UserKey is not the login used to connect the user</strong>
	 *  * To get a user profile based on the login value, you have to call <a href="./getUserbyLogin.html">getUserbyLogin()</a>
	 *  * User Key is the uniq key associted to each ZetaPush user. You can acces to this value with special keyword <strong>__userKey</strong>
	 *  
	 * 
	 * @param {string} [userKey] -  (Optional) ZetaPush user key 
	 *
	 *
	 * @fires {user?: User} on channel getUser 
	 * @returns a promise
	 */
	getUser({ userKey }: { userKey?: string }): Promise<{user?: User}> {
		return this.$publish('getUser', { userKey })
	}
		
	/**
	 *  Get user profile according to the login use to connect the user
	 *  * <strong>Login is not the user key of the user</strong>
	 *  
	 * 
	 * @param {string} login -  User login 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {user?: User} on channel getUserByLogin 
	 * @returns a promise
	 */
	getUserByLogin({ login }: { login: string }): Promise<{user?: User}> {
		return this.$publish('getUserByLogin', { login })
	}
		
	/**
	 *  Get list of users according to user keys list
	 *  * Returned list wrap user profile in a ad hoc data structure
	 *  * <pre><code>
	 *  * class UserWrapper {
	 *  *   boolean found;
	 *  *   User user;
	 *  * }
	 *  * </code></pre>
	 *  
	 * 
	 * @param {Array<any>} userKeys -  List of userKey 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {list?: Array<any>} on channel getUserList 
	 * @returns a promise
	 */
	getUserList({ userKeys }: { userKeys: Array<any> }): Promise<{list?: Array<any>}> {
		return this.$publish('getUserList', { userKeys })
	}
		
	/**
	 *  Update user profile
	 *  * User profile can be customized with the followings config variables:
	 *  * <ul>
	 *  *	<li><strong>@config.authentication.simple.mandatory_fields</strong> Add mandatory fields to user profile (default is email)</li>
	 *  *	<li><strong>@config.authentication.simple.public_fields</strong> Add public fields to user profile (defaults are email,firstname,lastname,mobilenumber,phonenumber,birthday,avatar,biography)</li>
	 *  * </ul>
	 *  
	 * 
	 * @param {string} login - 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {Object} fields - 
	 * Validation constraints:
	 * - @AuthMandatoryFields(): 
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {user?: User} on channel updateUser (broadcast)
	 * @returns a promise
	 */
	updateUser({ login, fields }: { login: string, fields: Object }): Promise<{user?: User}> {
		return this.$publish('updateUser', { login, fields })
	}
		
	/**
	 *  Accept Room Invitation
	 *  
	 * 
	 * @param {string} invitationId -  Invitation id 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {string} roomId -  Owner id 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {string} owner -  Invitation owner 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {room?: Room} on channel acceptRoomInvitation 
	 * @returns a promise
	 */
	acceptRoomInvitation({ invitationId, roomId, owner }: { invitationId: string, roomId: string, owner: string }): Promise<{room?: Room}> {
		return this.$publish('acceptRoomInvitation', { invitationId, roomId, owner })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {string} id -  Room id 
	 * Validation constraints:
	 * - @ValidRoomId(): 
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 * - @Size(min=TODO, max=TODO):  size of a string 
	 *
	 *
	 * @param {Object} context -  Invitation type 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {string} message -  Invitation message 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires RoomInvitation on channel createRoomInvitation (broadcast)
	 * @returns a promise
	 */
	createRoomInvitation({ id, context, message }: { id: string, context: Object, message: string }): Promise<RoomInvitation> {
		return this.$publish('createRoomInvitation', { id, context, message })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {string} id -  Room id 
	 * Validation constraints:
	 * - @ValidRoomId(): 
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 * - @Size(min=TODO, max=TODO):  size of a string 
	 *
	 *
	 * @param {string} guest -  User key 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {Object} [context] -  Invitation type 
	 *
	 * @param {string} [message] -  Invitation message 
	 *
	 * @param {string} [owner] -  Owner 
	 *
	 *
	 * @fires RoomInvitation on channel createRoomMemberInvitation (broadcast)
	 * @returns a promise
	 */
	createRoomMemberInvitation({ id, guest, context, message, owner }: { id: string, guest: string, context?: Object, message?: string, owner?: string }): Promise<RoomInvitation> {
		return this.$publish('createRoomMemberInvitation', { id, guest, context, message, owner })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {string} id -  Room id 
	 * Validation constraints:
	 * - @ValidRoomId(): 
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 * - @Size(min=TODO, max=TODO):  size of a string 
	 *
	 *
	 * @param {string} member -  User key 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires GroupMember on channel addRoomMember (broadcast)
	 * @returns a promise
	 */
	addRoomMember({ id, member }: { id: string, member: string }): Promise<GroupMember> {
		return this.$publish('addRoomMember', { id, member })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {string} id -  Room id 
	 * Validation constraints:
	 * - @ValidRoomId(): 
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 * - @Size(min=TODO, max=TODO):  size of a string 
	 *
	 *
	 * @param {string} member -  User key 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires GroupMember on channel removeRoomMember (broadcast)
	 * @returns a promise
	 */
	removeRoomMember({ id, member }: { id: string, member: string }): Promise<GroupMember> {
		return this.$publish('removeRoomMember', { id, member })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {Room} room -  Room room object 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {string} type -  Message type 
	 * Validation constraints:
	 * - @ValidMessageType():  Validate message type
    *  
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 * - @Enum(list=TODO):  value must be part of the list 
	 *
	 *
	 * @param {Object} value -  Message value
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {Object} metadata -  Message metadata 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {container?: string, room?: Room, message?: Message} on channel addRoomMessage (broadcast)
	 * @returns a promise
	 */
	addRoomMessage({ room, type, value, metadata }: { room: Room, type: string, value: Object, metadata: Object }): Promise<{container?: string, room?: Room, message?: Message}> {
		return this.$publish('addRoomMessage', { room, type, value, metadata })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {string} id -  Room message id 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {Room} room -  Room room object 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {container?: string, room?: Room, message?: Message} on channel getRoomMessage (broadcast)
	 * @returns a promise
	 */
	getRoomMessage({ id, room }: { id: string, room: Room }): Promise<{container?: string, room?: Room, message?: Message}> {
		return this.$publish('getRoomMessage', { id, room })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {Room} room -  Room room object 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {Pagination} [page] -  Pagination object 
	 *
	 *
	 * @fires {container?: string, room?: Room, list?: Array<Message>, page?: ResponsePagination} on channel getRoomMessageList 
	 * @returns a promise
	 */
	getRoomMessageList({ room, page }: { room: Room, page?: Pagination }): Promise<{container?: string, room?: Room, list?: Array<Message>, page?: ResponsePagination}> {
		return this.$publish('getRoomMessageList', { room, page })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {Room} room - 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {container?: string, room?: Room, list?: Array<Object>} on channel purgeRoomMessageList (broadcast)
	 * @returns a promise
	 */
	purgeRoomMessageList({ room }: { room: Room }): Promise<{container?: string, room?: Room, list?: Array<Object>}> {
		return this.$publish('purgeRoomMessageList', { room })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {Room} room -  Room room object 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {string} [member] -  Room member user key 
	 *
	 * @param {string} type -  Message type 
	 * Validation constraints:
	 * - @ValidMessageType():  Validate message type
    *  
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 * - @Enum(list=TODO):  value must be part of the list 
	 *
	 *
	 * @param {Object} value -  Message value
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {Object} metadata -  Message metadata 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {container?: string, room?: Room, message?: Message} on channel sendRoomMessageToMember (broadcast)
	 * @returns a promise
	 */
	sendRoomMessageToMember({ room, member, type, value, metadata }: { room: Room, member?: string, type: string, value: Object, metadata: Object }): Promise<{container?: string, room?: Room, message?: Message}> {
		return this.$publish('sendRoomMessageToMember', { room, member, type, value, metadata })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {string} id -  Room message id 
	 * Validation constraints:
	 * - @ValidRoomMessageId(): 
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 * - @Size(min=TODO, max=TODO):  size of a string 
	 *
	 *
	 * @param {Room} room -  Room room object 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {Object} value -  Message value
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {container?: string, room?: Room, message?: Message} on channel updateRoomMessageByService (broadcast)
	 * @returns a promise
	 */
	updateRoomMessageByService({ id, room, value }: { id: string, room: Room, value: Object }): Promise<{container?: string, room?: Room, message?: Message}> {
		return this.$publish('updateRoomMessageByService', { id, room, value })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {string} interlocutor -  Room interlocutor 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {room?: Room} on channel createOneToOneRoom (broadcast)
	 * @returns a promise
	 */
	createOneToOneRoom({ interlocutor }: { interlocutor: string }): Promise<{room?: Room}> {
		return this.$publish('createOneToOneRoom', { interlocutor })
	}
		
	/**
	 *  Create a room with the global owner user
	 *  
	 * 
	 * @param {string} name -  Room room name 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {room?: Room, member?: null} on channel createOrJoinPublicRoom (broadcast)
	 * @returns a promise
	 */
	createOrJoinPublicRoom({ name }: { name: string }): Promise<{room?: Room, member?: null}> {
		return this.$publish('createOrJoinPublicRoom', { name })
	}
		
	/**
	 *  Create a room with the global owner user
	 *  
	 * 
	 * @param {string} name -  Room room name 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {room?: Room} on channel createPublicRoom (broadcast)
	 * @returns a promise
	 */
	createPublicRoom({ name }: { name: string }): Promise<{room?: Room}> {
		return this.$publish('createPublicRoom', { name })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {string} name -  Room room name 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {Array<any>} members -  Room room members 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {room?: Room} on channel createRoom (broadcast)
	 * @returns a promise
	 */
	createRoom({ name, members }: { name: string, members: Array<any> }): Promise<{room?: Room}> {
		return this.$publish('createRoom', { name, members })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {string} id -  Room room id 
	 * Validation constraints:
	 * - @ValidRoomId(): 
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 * - @Size(min=TODO, max=TODO):  size of a string 
	 *
	 *
	 * @param {string} owner -  Room room owner 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 * @param {Pagination} [page] -  Room pagination 
	 *
	 *
	 * @fires {room?: Room, messages?: Array<Object>, page?: Pagination} on channel getRoom 
	 * @returns a promise
	 */
	getRoom({ id, owner, page }: { id: string, owner: string, page?: Pagination }): Promise<{room?: Room, messages?: Array<Object>, page?: Pagination}> {
		return this.$publish('getRoom', { id, owner, page })
	}
		
	/**
	 * 
	 *  
	 * 
	 * @param {Pagination} [page] -  Pagination object 
	 *
	 *
	 * @fires {list?: Array<Object>} on channel getUserRoomList (broadcast)
	 * @returns a promise
	 */
	getUserRoomList({ page }: { page?: Pagination }): Promise<{list?: Array<Object>}> {
		return this.$publish('getUserRoomList', { page })
	}
		
	/**
	 *  join a public room
	 *  
	 * 
	 * @param {string} name -  Room room name 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {room?: Room, member?: null} on channel joinPublicRoom (broadcast)
	 * @returns a promise
	 */
	joinPublicRoom({ name }: { name: string }): Promise<{room?: Room, member?: null}> {
		return this.$publish('joinPublicRoom', { name })
	}
		
	/**
	 *  leave a public room
	 *  
	 * 
	 * @param {string} name -  Room room name 
	 * Validation constraints:
	 * - @NotNull():  a NotNull parameter will cause an error when absent 
	 *
	 *
	 *
	 * @fires {room?: Room, member?: null} on channel leavePublicRoom 
	 * @returns a promise
	 */
	leavePublicRoom({ name }: { name: string }): Promise<{room?: Room, member?: null}> {
		return this.$publish('leavePublicRoom', { name })
	}
}



export function VisioApiFactory(client: ZetaPushClient, zone: NgZone): VisioApi {
    return createApi(client, zone, VisioApi) as VisioApi
}

export const VisioApiProvider = {
    provide: VisioApi,
    useFactory: VisioApiFactory,
    deps: [ZetaPushClient, NgZone]
}
