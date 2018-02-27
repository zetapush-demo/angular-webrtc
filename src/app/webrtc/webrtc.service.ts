import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ZetaPushClient } from 'zetapush-angular';
import { WebrtcApi, Message, Metadata, WebrtcRoom, RoomApi, UserApi, User } from './webrtc-api';
import { VisioApi } from '../visio/visio-api.service';
import { Room } from '../visio/domain/room';



interface IceCandidateObject {
  candidate: string;
  sdpMid: string;
  sdpMLineIndex: number;
}

@Injectable()
export class WebrtcService {

    // =================================
    //         VARIABLES
    // =================================
    localStream;                                                                                    // Local video stream
    remoteVideo: HTMLVideoElement;                                                                  // HTMLVideoElement for the remote video
    localVideo: HTMLVideoElement;                                                                   // HTMLVideoElement for the local video
    pc;                                                                                             // PeerConnection object
    conf: RTCConfiguration = { iceServers: [                                                        // Peer Configuration
        { 
            urls: 'stun:turn.zpush.io:443',
            credential: 'lesateliers',
            username: 'c4878XzgQ54NhjsSNX'
        },
        {
            urls: 'turn:turn.zpush.io:443?transport=udp',
            credential: 'lesateliers',
            username: 'c4878XzgQ54NhjsSNX'
        },
        {
            urls: 'turn:turn.zpush.io:443?transport=tcp',
            credential: 'lesateliers',
            username: 'c4878XzgQ54NhjsSNX'
        }
    ]};          
    room: Room; 
    currentRoomName: string = "";
    roomId: string = "";                                                          // Private room for webrtc
    target: string;                                                                                 // Userkey of the destinataire
    myUserKey: string;                                                                              // My userkey
    constraints = {                                                                                 // WebRTC Constraints
        mandatory: [{ OfferToReceiveAudio: true }, { OfferToReceiveVideo: true }],
        optional: [{ DtlsSrtpKeyAgreement: true }]
    };
    caller = false;                                                                                 // Specify that we are the caller

    iceCandidatePool= []; // Use to store incoming iceCandidate before a SDP offer is proposed

    // =================================
    //         CONSTRUCTOR
    // =================================
    constructor(
        private webrtcApi: WebrtcApi,
        private client: ZetaPushClient,
        private userApi: UserApi,
        private visioApi: VisioApi
    ) {

        /**
         * OnCreateRoomMemberInvitation
         * We've been invited to join a room
         * let join it
         */
        this.visioApi.onCreateRoomMemberInvitation.subscribe(message => {
            console.log("WebrtcService::onCreateRoomMemberInvitation", message);

            // Get room name
            this.room = message['room'];

            const invitationId = message['invitation']['id'];
            // Get room owner
            this.target = message['room']['owner'];
            console.log("WebrtcService::onCreateRoomMemberInvitation room, roomOwner", this.room, this.room.owner);

            // Join this room
            if (!this.caller) {
                this.visioApi.acceptRoomInvitation({invitationId: invitationId, roomId: this.room.id, owner: this.target});
            }
            
        });

        /**
         * onCreateOrJoinPublicRoom
         * A member has joined a room we've created or joined before
         * Let's start the Webrtc dance :)
         */
        this.visioApi.onCreateOrJoinPublicRoom.subscribe(message => {
            console.log("WebrtcService::onCreateOrJoinPublicRoom", message);
            this.roomId = message.room.id;
            this.room = message.room;
            // Check if it's the correct room
             if ( message.member != this.myUserKey){
            //if ( message.member != this.myUserKey){
                this.target = message.member;
                this.createOffer();
            }
        })

        this.visioApi.onLeavePublicRoom.subscribe(message => {
            console.log("WebrtcService::onLeavePublicRoom", message);
            this.terminateCommunication();
            this.room = null;
            this.roomId = "";
            this.target = "";
        })
        /**
         * OnAddRoomMember
         * A new member has joined the room we've created
         * Let's start the Webrtc dance :)
         */
        this.visioApi.onAddRoomMember.subscribe(message => {
            console.log("WebrtcService::onAddRoomMember", message);
            // every member of the room receives the message
            if (message['member'] != this.myUserKey){
                this.target = message["member"];
                this.roomId = message["id"];

                this.createOffer();
                
            }
            
        })

        this.visioApi.onRemoveRoomMember.subscribe(message => {
            console.log("WebrtcService::onRemoveRoomMember", message);

        })

        /**
         *  OnCloseRoom
         */
        this.webrtcApi.onCloseRoom.subscribe(message => {
            console.log("WebrtcService::onCloseRoom");
            this.resetPeerConnection();
        });

        /**
         *  OnLeaveRoom
         */
        this.webrtcApi.onLeaveRoom.subscribe(message => {
            console.log("WebrtcService::onLeaveRoom");
            this.resetPeerConnection();
        });

        /**
         *  OnJoinRoom
         */

         /*
        this.webrtcApi.onJoinRoom.subscribe(message => {
            console.log("WebrtcService::onJoinRoom");

            const userKey = message['member'];

            if (userKey !== this.myUserKey) {
                this.target = userKey;

                // Create an offer
                this.pc.createOffer(offer => {
    
                    this.pc.setLocalDescription(new RTCSessionDescription(offer)).then(() => {

                        // Change the codec to improve performance
                        //offer.sdp = offer.sdp.replace('VP8', 'H264');
                        
                        // Create and send the offer
                        const offerMessage: Message = {
                            description: offer.sdp,
                            type: offer.type,
                        };

                        const metadata: Metadata = {
                            type: offer.type,
                        };

                        //this.webrtcApi.sendMessage(this.room, this.target, offerMessage, metadata);
                        this.visioApi.sendRoomMessageToMember({room: this.room, member: this.target, type: "data", value: offerMessage, metadata: metadata});
                    });
                }, err => {
                    console.error('WebrtcService::onJoinRoomError', err);
                }, this.constraints)
            };
        });
        */
        /**
         *  onSendRoomMessageToMember
         */
        this.webrtcApi.onSendRoomMessageToMember.subscribe(message => {
            console.log("<== WebrtcService::onSendRoomMessageToMember", message);
            
            // Get the data
            const type = message['message']['metadata']['type'];
            const data = message['message']['value'];
            this.target = message['message']['author'];

            // Handle each type of message
            switch(type) {

                // Receive offer => We send answer
                case 'offer':

                    console.log("WebrtcService::OFFER DATA ", data);

                    let offerSessionDescription: RTCSessionDescriptionInit = {
                        sdp: data['description'],
                        type: data['type']
                    };

                    const sessionDescriptionOffer = new RTCSessionDescription(offerSessionDescription);

                    
                    
                    // Change the codec to improve performance
                    //sessionDescriptionOffer.sdp = sessionDescriptionOffer.sdp.replace('VP8', 'H264');

                    // Configure RTCPeerConnection and send answer
                    this.pc.setRemoteDescription(new RTCSessionDescription(sessionDescriptionOffer), () => {
                        
                        this.pc.createAnswer(answer => {
                            
                            this.pc.setLocalDescription(new RTCSessionDescription(answer)).then(() => {
                                const answerMessage: Message = {
                                    description: answer.sdp,
                                    type: answer.type
                                };
        
                                const metadata: Metadata = {
                                    type: answer.type
                                };
        
                                this.visioApi.sendRoomMessageToMember({room: this.room, member: this.target, type: "data", value: answerMessage, metadata: metadata});
                                //this.webrtcApi.sendMessage(this.room, this.target, answerMessage, metadata);

                                // Check if there's a waiting ice candidate in the pool
                                this.iceCandidatePool.forEach(ice => {
                                    this.pc.addIceCandidate(new RTCIceCandidate(ice)).then(_=>{
                                        console.log("WebrtcService::Ice Candidate received and validated from iceCandidatePool");
                                    }).catch(e=>{
                                        console.error("WebrtcService::Error: Failure during addIceCandidate() from iceCandidatePool", e);
                                    });
                                });
                                this.iceCandidatePool = [];
                            });
                            
                        }, error => {
                            console.error("ERROR ANSWER => ", error);
                        });
                    }, error => {
                        console.error("ERROR SET REMOTE DESCRIPTION => ", error);
                    });
                    break;
                
                // Receive answer => We update RTCPeerConnection
                case 'answer':
                    // TODO: Remote answer field

                    console.log("WebrtcService::ANSwER DATA ", data);

                    let dataSessionDescription: RTCSessionDescriptionInit = {
                        // data['answer']['description'];
                        // data['answer']['type'].toLowerCase();
                        sdp: data['description'],
                        type: data['type'].toLowerCase()
                    };

                    // const sessionDescription = new RTCSessionDescription(dataSessionDescription);
                    this.pc.setRemoteDescription(new RTCSessionDescription(dataSessionDescription));
                    break;

                // Handle Ice candidate
                case 'icecandidate':
                    // Change candidate to icecandidate
                        // TODO: data['icecandidate']['sdp']
                    console.log("WebrtcService::ICECANDIDATE DATA ", data);
                    //let candidate = data['icecandidate'] || data['sdp']
                    //console.log("WebrtcService::FUCKING CANDIDATE ", candidate)
                    const ice: RTCIceCandidateInit = {
                        candidate: data["candidate"],
                        sdpMid: data['sdpMid'],
                        sdpMLineIndex: data['sdpMLineIndex'],
                    };

                    console.log("WebrtcService::--candidate-received", ice);

                    if (!this.pc || !this.pc.remoteDescription.type){
                        console.log("WebrtcService:: no remote description, add ice to the waiting pool");
                        this.iceCandidatePool.push(ice);
                    } else {

                        this.pc.addIceCandidate(new RTCIceCandidate(ice)).then(_=>{
                            console.log("WebrtcService::Ice Candidate received and validated")
                        }).catch(e=>{
                            console.error("WebrtcService::Error: Failure during addIceCandidate()", e);
                        });
                    }

                    break;                                   
            };   
        });
    }


    // =================================
    //         FUNCTIONS
    // =================================

    /**
     * Init the WebRTC communication
     * @param videoLocal HTMLElement of the local video
     * @param videoRemote HTMLElement of the remote video
     */
    init(videoLocal: HTMLVideoElement, videoRemote: HTMLVideoElement): void {
        this.startLocalVideo(videoLocal);
        this.remoteVideo = videoRemote;
        this.localVideo = videoLocal;
        this.myUserKey = this.client.getUserId();
    }

    /**
     * Set the target to get his userKey
     * @param targetName Name of the target
     */
    setTargetName(targetName: string): void {
        this.userApi.getUserByLogin(targetName).then(result => {
            this.target = result['user']['userKey'];
        });
    }

    joinPublicRoomName(publicRoomName: string): void {
        this.visioApi.createOrJoinPublicRoom({ name: publicRoomName}).then(result => {
            console.log("createOrJoinPublicRoom roomName", result);
            this.currentRoomName = result.room.name;
            this.room = result.room;
        })
    }

    leavePublicRoomName(): void {
        this.visioApi.leavePublicRoom({name: this.room.name}).then(result => {
            console.log("leavePublicRoomName", result);
            this.currentRoomName = "";
            this.room = null;
        })
    }
    /**
     * Set the target userKey
     * @param target userKey of the target
     */
    setTargetUserKey(target: string): void {
        this.target = target;
    }

    /**
     * Launch the local video
     * @param videoLocal HTMLElement of the local video
     */
    startLocalVideo(videoLocal: HTMLVideoElement): void {

        // Get the media device and launch video
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            this.localStream = stream;
            videoLocal.srcObject = this.localStream;

            // Init the peer connection between devices
            this.initPeerConnection(stream);
        }).catch((error) => {
            console.error("startLocalVideo::Error", error);
        });
    }

    /**
     *  Init the peer connection
     */
    initPeerConnection(stream: any): void {
        // Create and init the peer connection object
        this.pc = new RTCPeerConnection(this.conf);
        stream.getTracks().forEach(track => this.pc.addTrack(track, stream));

        // Handle ICE Candidates
        this.pc.onicecandidate = event => {

            const metadata: Metadata = {
                type: event.type
            };

            console.log("WebrtcService::--candidate-detected", event.candidate);

            if (event.candidate != null) {
                this.visioApi.sendRoomMessageToMember({room: this.room, member: this.target, type: "data", value: event.candidate, metadata: metadata});
                //this.webrtcApi.sendMessage(this.room, this.target, iceMessage, metadata);
            }
        };

        this.pc.oniceconnectionstatechange = event => {
            console.log("WebrtcService::oniceconnectionstatechange", event.target);

            if (event.target.iceConnectionState == "closed" && event.target.iceGatheringState == "complete"){
                this.terminateCommunication();
            }

        }

        // Handle new stream added
        this.pc.ontrack = event => {
            // Add the stream to the remote video
            console.log("WebrtcService:: - - - - - - - - - - - - - Pc.OnTRACK")
            console.log('OnTrackEvent', event)
            const video = this.remoteVideo;
            video.srcObject = event.streams[0];
            video.play()
        };

        this.pc.onaddstream = event => {
            console.log("WebrtcService::- - - - - - - - - - - - Pc.OnAddStream")
        }
    }

    /**
     * Create an offer
     */
    createOffer(): void {
        // Create an offer
        this.pc.createOffer(offer => {
            
            this.pc.setLocalDescription(new RTCSessionDescription(offer)).then(() => {

                // Change the codec to improve performance
                //offer.sdp = offer.sdp.replace('VP8', 'H264');
            
                // Create and send the offer
                const offerMessage: Message = {
                    description: offer.sdp,
                    type: offer.type,
                };

                const metadata: Metadata = {
                    type: offer.type,
                };
                
                this.visioApi.sendRoomMessageToMember({room: this.room, member: this.target, type: "data", value: offerMessage, metadata: metadata});
            
                //this.webrtcApi.sendMessage(this.room, this.target, offerMessage, metadata);
            });
        }, err => {
            console.error('WebrtcService::onJoinRoomError', err);
        }, this.constraints)
    }
    

    /**
     *  Create a private room for the webRTC
     */
    createPrivateRoom(): void {

        this.visioApi.createRoom({name:"webRoom", members:[]}).then(message => {
            this.caller = true;
            this.room = message['room'];
            this.setRoomName(message['room']['name']);
            this.visioApi.createRoomMemberInvitation({id:message.room.id, guest: this.target, owner: message.room.resource.split(':')[1]});
        }).catch(error => {
            console.error("WebRTCService::createPrivateRoom::Error", error);
        });
        
    };

    /**
     * Set the name of the private room
     * @param room Name of the room
     */
    setRoomName(room: string): void {
        //this.room.roomName = room;
    };

    /**
     * Stop the communication between peers
     * @param userkey Destinataire of the call
     */
    terminateCommunication(): void {
        //this.webrtcApi.terminateWebRtcCall(this.target);
        //this.webrtcApi.closeRoom(this.room);
        this.resetPeerConnection();
    };

    /**
     * Change the camera orientation on the destinataire's device
     * @param userkey Destinataire of the call
     */
    changeCameraOrientation(): void {
        this.webrtcApi.changeCameraOrientation(this.target);
    };

    /**
     * Set on/off the video about his state
     * @param userkey Destinataire of the call
     */
    toggleVideo(): void {
        this.localVideo.srcObject.getTracks().forEach(t => {
            if(t.kind == "video") {
                t.enabled = !t.enabled;
            }
        }
        );
    };

    /**
     * Set on/off the audio about his state
     * @param userkey Destinataire of the call
     */
    toggleAudio(): void {
        this.localVideo.srcObject.getTracks().forEach(t => {
            if(t.kind == "audio") {
                t.enabled = !t.enabled;
            }
        }
        );
    };

    /**
     * Reply to an incoming call
     * @param idCall ID of the call
     * @param source userKey of the source
     */
    replyToCall(idCall: string, source: string): void {
        this.webrtcApi.replyToCall(idCall, source);
    }

    /**
     *  Reset the peer connection and clear video tags
     */
    resetPeerConnection(): void {
        // Clear the video tag
        if (this.remoteVideo.srcObject != null) {
            this.remoteVideo.srcObject.getTracks().forEach(t => t.stop());
            this.remoteVideo.srcObject = null;
            this.remoteVideo.load();

        }

        // Clear the peer communication
        this.pc.removeStream(this.localStream);
        this.pc.close();
        this.pc = null;

        // Recreate a peer connection object
        this.initPeerConnection(this.localStream);
    }

    /**
     * Refuse an incoming call
     * @param id ID of the call
     */
    refuseCall(id: string): void {
        this.webrtcApi.refuseCall(id, this.target);
    }

}
