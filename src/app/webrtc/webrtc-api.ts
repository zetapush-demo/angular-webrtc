import { NgZone } from '@angular/core';
import { Api, ZetaPushClient, createApi } from 'zetapush-angular';
import { Observable } from 'rxjs/Observable';

export interface Message {
	type: string;
	description?: string;
	icecandidate?: string;
}

export interface Metadata {
  	type: string;
}

export interface WebrtcRoom {
  roomName: string;
}

export interface Call {
  id: string;
  state: string;
}

export interface Invitation {
  id: string;
  owner: string;
  guest: string;
  expiry: number;
  createdAt: number;
  context: any;
  message: string;
}

export interface Room {
  room: Group;
  messages: Array<Message>;
}

export interface Group {
  id: string;
  deploymentId: string;
  name: string;
  owner: string;
  resource: string;
  members: Array<User>;
  metadata: Metadata;
  tags: Tags;
}

export interface User {
  userKey: string;
  login: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  mobilenumber: string;
  avatar: string;
  createdAt: number;
}

export type Tags = Array<string>;


/**
 *  CALL API
 */
export class CallApi extends Api {
	onCallGroup: Observable<Call>;
	onTimeoutCall: Observable<string>;
	onAddToMissedCall: Observable<Call>;

	callGroup(id: string): Promise<Call> {
		return this.$publish('callGroup', { id });
	}

	timeoutCall(id: string, group: string): Promise<string> {
		return this.$publish('timeoutCall', { id, group });
	}

	addToMissedCall(groupId: string, callId: string): Promise<Call> {
		return this.$publish('addToMissedCall', { groupId, callId });
	}

}

/**
 * 	ROOM API
 */
export class RoomApi extends Api {
	onCreateRoomMemberInvitation: Observable<any>;

	createRoomMemberInvitation( id: string, guest: string, context: any, message: string, owner: string): Promise<{ room: Room; invitation: Invitation }> {
		return this.$publish('createRoomMemberInvitation', {id, guest, context, message, owner});
	}
}

/**
 * 	USER API
 */
export class UserApi extends Api {

	getUserByLogin(login: string): Promise<User> {
		return this.$publish('getUserByLogin', { login });
	}

}

/**
 *  WEBRTC API
 */
export class WebrtcApi extends Api {
	onJoinRoom: Observable<any>;
	onLeaveRoom: Observable<any>;
	onCloseRoom: Observable<any>;
	onSendRoomMessageToMember: Observable<any>;
	

	sendMessage(webrtcRoom: WebrtcRoom, member: string, value: Message, metadata: Metadata): Promise<any> {
		console.log("==> sendMessage", value)
		return this.$publish('sendMessage', { webrtcRoom, member, value, metadata });
	}
	
	createPrivateRoom(): Promise<any> {
		return this.$publish('createPrivateRoom', {});
	}

	terminateWebRtcCall(userKey: string): Promise<any> {
		return this.$publish('terminateWebRtcCall', { userKey });
	}

	changeCameraOrientation(userKey: string): Promise<any> {
		return this.$publish('changeCameraOrientation', { userKey });
	}

	toggleVideo(userKey: string): Promise<any> {
		return this.$publish('toggleVideo', { userKey });
	}

	toggleAudio(userKey: string): Promise<any> {
		return this.$publish('toggleAudio', { userKey });
	}

	replyToCall(id: string, destinataire: string): Promise<WebrtcRoom> {
		return this.$publish('replyToCall', { id, destinataire });
	}

	closeRoom(webrtcRoom: WebrtcRoom): Promise<any> {
		return this.$publish('closeRoom', { webrtcRoom });
	}

	joinRoom(webrtcRoom: WebrtcRoom): Promise<any> {
		return this.$publish('joinRoom', { webrtcRoom });
	}

  	leaveRoom(webrtcRoom: WebrtcRoom): Promise<any> {
		return this.$publish('leaveRoom', { webrtcRoom });
	}

	sendRoomMessageToMember(room: string, member: string, type: string, value: Message, metadata: Metadata): Promise<any> {
    	return this.$publish('sendRoomMessageToMember', {room, member, type, value, metadata });
	  }
	
	refuseCall(id: string, destinataire: string): Promise<string> {
		return this.$publish('refuseCall', { id, destinataire });
	}

}

/**
 *  CREATE CALL API
 */
export function CallApiFactory(client: ZetaPushClient, zone: NgZone): CallApi {
  	return createApi(client, zone, CallApi) as CallApi;
}

export const CallApiProvider = { provide: CallApi, useFactory: CallApiFactory, deps: [ZetaPushClient, NgZone] };

/**
 *  CREATE WEBRTC API
 */
export function WebrtcApiFactory(client: ZetaPushClient, zone: NgZone): WebrtcApi {
  	return createApi(client, zone, WebrtcApi) as WebrtcApi;
}

export const WebrtcApiProvider = { provide: WebrtcApi, useFactory: WebrtcApiFactory, deps: [ZetaPushClient, NgZone] };

/**
 * 	CREATE ROOM API
 */
export function RoomApiFactory(client: ZetaPushClient, zone: NgZone): RoomApi {
  	return createApi(client, zone, RoomApi) as RoomApi;
}

export const RoomApiProvider = { provide: RoomApi, useFactory: RoomApiFactory, deps: [ZetaPushClient, NgZone] };

/**
 * 	CREATE USER API
 */
export function UserApiFactory(client: ZetaPushClient, zone: NgZone): UserApi {
  	return createApi(client, zone, UserApi) as UserApi;
}

export const UserApiProvider = { provide: UserApi, useFactory: UserApiFactory, deps: [ZetaPushClient, NgZone] };