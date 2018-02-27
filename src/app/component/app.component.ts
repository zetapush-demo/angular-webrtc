import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ZetaPushConnection } from 'zetapush-angular';
import { WebrtcService } from '../webrtc/webrtc.service';
import { Call, CallApi, WebrtcApi } from '../webrtc/webrtc-api';

interface Credentials {
	login: string;
	password: string;
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	// Variables
	title = 'WebRTC Testing';
	credentials: Credentials;
	localVideo: HTMLVideoElement;												// HTMLVideoElement of the local video
	remoteVideo: HTMLVideoElement;												// HTMLVideoElement of the remote video
	call: Call;																	// The call object
	source;																		// The source of the call (userKey)
	callIsIncoming = false;														// Specify that we receive a call
	targetName = "";															// Name of our target
	publicRoomName = "room"; 													// Name of the public room name
	targetInformation = "";														// Informations about the name target
	showTargetInfo = false;														// Show or not the target information

	loginName = "web";
	password = "password";

	// Constructor
	constructor(
		private connection: ZetaPushConnection,
		private webrtcService: WebrtcService,
		private callApi: CallApi,
		private webrtcApi: WebrtcApi
	) {
		/**
		 * 	Handle incoming call
		 */
		this.callApi.onCallGroup.subscribe(message => {
			console.log("AppComponent::onCallGroup");
			this.call = message['callObject'];
			this.source = message['source'];
			this.webrtcService.setTargetUserKey(this.source);
			this.callIsIncoming = true;
		});

		/**
		 * 	Handle timeout call
		 */
		this.callApi.onTimeoutCall.subscribe(message => {
			console.log("AppComponent::onTimeoutCall");
			this.callIsIncoming = false;
		})

		/**
		 * 	Handle leave room
		 */
		this.webrtcApi.onLeaveRoom.subscribe(message => {
			console.log("AppComponent::onLeaveRoom");
			this.setCallButtonDisabled(true);
		})
	 }

	connexion(): void {

		this.credentials = { login: this.loginName, password: this.password };			// Credentials for the ZetaPush connectio

		this.connection.connect(this.credentials).then(() => {
			console.log("Connection success");

			// Init the webrtc communication
			this.localVideo = <HTMLVideoElement>document.getElementById('localVideo');
			this.remoteVideo = <HTMLVideoElement>document.getElementById('remoteVideo');
			this.webrtcService.init(this.localVideo, this.remoteVideo);

			// Default : Android
			this.targetName = "android";
			this.webrtcService.setTargetName(this.targetName);

		}).catch(() => {
			console.error("Connection error");
		})
	}

	// ===========================
	//          FUNCTIONS
	// ===========================

	/**
	 *  Launch a call on a private room
	 */
	launchCall(): void {
		console.log("AppComponent::launchCall");

		if (this.targetName.length > 0) {
			this.webrtcService.setTargetName(this.targetName);
			this.webrtcService.createPrivateRoom();
			this.setCallButtonDisabled(false);
		} else {
			this.setNameInformationMessage("Put a real target name (size > 0)");
			this.showTargetInfo = true;
		}
		
	}

	/**
	 * Join a public room
	 */
	joinPublicRoom(): void{
		console.log("AppComponent::launchPublicRoom");
		if (this.publicRoomName.length > 0) {
			this.webrtcService.joinPublicRoomName(this.publicRoomName);
		} else {
			this.setNameInformationMessage("Put a real room name (size > 0)");
			this.showTargetInfo = true;
		}
	}
	
	leavePublicRoom(): void {
		this.webrtcService.leavePublicRoomName();
	}
	/**
	 *  Reply to an incoming call
	 */
	replyToCall(): void {
		console.log("AppComponent::replyToCall");

		if (this.call != null && this.source != undefined) {
			this.webrtcService.replyToCall(this.call.id, this.source);
			this.callIsIncoming = false;

			// Launch the WebRTC communication
			this.webrtcService.createPrivateRoom();
		}

		this.setCallButtonDisabled(false);
	}

	/**
	 * 	Refuse an incoming call
	 */
	refuseCall(): void {
		console.log("AppComponent::refuseCall");

		if (this.call != null) {
			this.webrtcService.refuseCall(this.call.id);
			this.callIsIncoming = false;
		}
	}

	/**
	 *  Toggle the sound of the video
	 */
	toggleAudio(): void {
		console.log("AppComponent::toggleAudio");
		this.webrtcService.toggleAudio();
	}

	/**
	 *  Toggle the image of the video
	 */
	toggleVideo(): void {
		console.log("AppComponent::toggleVideo");
		this.webrtcService.toggleVideo();
	}


	/**
	 *  Switch the camera direction on the destinataire
	 */
	switchCamera(): void {
		console.log("AppComponent::switchCamera");
		this.webrtcService.changeCameraOrientation()
	}


	/**
	 *  Stop the call
	 */
	stopCall(): void {
		console.log("AppComponent::stopCall");
		this.webrtcService.terminateCommunication();
		
		this.setCallButtonDisabled(true);
	}

	/**
	 * Set enabled or disabled the call buttons
	 * @param state true for disabled, else enabled 
	 */
	setCallButtonDisabled(state: boolean): void {
		
		let toggleAudio = <HTMLButtonElement>document.getElementById('toggleAudio');
		let toggleVideo = <HTMLButtonElement>document.getElementById('toggleVideo');
		let switchCamera = <HTMLButtonElement>document.getElementById('switchCamera');
		let stopCall = <HTMLButtonElement>document.getElementById('stopCall');

		toggleAudio.disabled = state;
		toggleVideo.disabled = state;
		switchCamera.disabled = state;
		stopCall.disabled = state;
	}

	/**
	 * Set a tempo message about the target name
	 * @param message Tempo message
	 */
	setNameInformationMessage(message: string): void {
		this.targetInformation = message;
	}

	/**
	 * Delete the target information
	 */
	deleteNotification(): void {
		this.showTargetInfo = false;
	}
}
