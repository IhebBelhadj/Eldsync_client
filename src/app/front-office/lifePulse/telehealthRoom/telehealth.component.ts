import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {TelehealthDataService} from "../../services/telehealth-data.service";
import {VideoMessage} from "../../api/video-message";

const mediaConstraints = {
    video: {
        width:{min:640, ideal:1920, max:1920},
        height:{min:480, ideal:1080, max:1080}, },
    audio:true
};
const offerOptions = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true
};

@Component({
  selector: 'app-telehealthRoom',
  standalone: true,
    imports: [
        FormsModule,
        NgClass
    ],
  templateUrl: './telehealth.component.html',
  styleUrl: './telehealth.component.scss'
})
export class TelehealthRoomComponent implements AfterViewInit {
  client: any;
  isCameraOn: boolean = false;
  private localStream: MediaStream;
  @ViewChild('local_video') localVideo: ElementRef;
  @ViewChild('remote_video') remoteVideo: ElementRef;
  isMicOn: boolean = false;

  private peerConnection: RTCPeerConnection;//RTCPeerConnection interface represents a WebRTC connection between the local computer and a remote peer.
  constructor(private telehealthDataService : TelehealthDataService) {

  }

   ngAfterViewInit() {

      this.addIncommingMessageHandler();
      this.requestMediaDevices();



   }

    /*getVideoRoomByInviteCode() {
        this.telehealthDataService.getVideoRoomByInviteCode(this.telehealthDataService.inviteCode).subscribe(
            (response: any) => {
                // Check if the video room exists
                if (response) {
                    // Video room exists, call the method
                    this.call();
                } else {
                    // Video room does not exist
                    console.log("Video room does not exist for the provided invite code.");
                }
            },
            (error: any) => {
                console.error("Error occurred while fetching video room by invite code:", error);
            }
        );
    }*/
  // Request access to the local media devices
  private async requestMediaDevices() :Promise<void> {
    this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    //attach the local stream to the local video element
    this.pauseVideo();
  }
  //i want the video to be paused

  pauseVideo() {
        this.localStream.getTracks().forEach(track => {
            track.enabled=false;
        });
        this.localVideo.nativeElement.srcObject = undefined;

  }
  startLocalVideo() {

      this.localStream.getTracks().forEach(track => {
             track.enabled=true;
    });
    this.localVideo.nativeElement.srcObject = this.localStream;

  }
    toggleCamera(): void {
        let videoTrack = this.localStream.getTracks().find(track => track.kind === 'video')

        if(videoTrack.enabled){
            this.isCameraOn = true;
            videoTrack.enabled = false;
            document.getElementById('camera-btn').style.backgroundColor = 'rgb(255, 80, 80)'
            this.localVideo.nativeElement.srcObject = undefined;
        }else{
            this.isCameraOn = false;
            videoTrack.enabled = true;
            document.getElementById('camera-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)'
            this.localVideo.nativeElement.srcObject = this.localStream;
        }


    }

  async toggleMic() {

      const audioTrack = this.localStream.getTracks().find(track => track.kind === 'audio')

      if(audioTrack.enabled){
            audioTrack.enabled = false;
          this.isMicOn = true;
          document.getElementById('mic-btn').style.backgroundColor = 'rgb(255, 80, 80)'
      }else{
          this.isMicOn = false;
            audioTrack.enabled = true;
          document.getElementById('mic-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)'
      }

  }

  //handle the outgoing video call
    async call():Promise<void>{
        if (!this.peerConnection) {
            this.createPeerConnection();
        }
        if (this.localStream && this.peerConnection) {
            this.localStream.getTracks().forEach(track => {
                this.peerConnection!.addTrack(track, this.localStream!);
            });
            try {
                const offer: RTCSessionDescriptionInit = await this.peerConnection.createOffer(offerOptions);
                await this.peerConnection.setLocalDescription(offer);

                if (this.telehealthDataService) {
                    this.telehealthDataService.sendMessage({ type: 'offer', data: offer });
                }
            } catch (err) {
                console.error(err);
                this.handleGetUserMediaError(err);
            }
        }
    }
    private createPeerConnection(): void {
        document.getElementById('user-2').style.display = 'block';
        document.getElementById('user-1').classList.add('smallFrame')
      this.peerConnection = new RTCPeerConnection({
      iceServers: [
            {
                urls: 'stun:stun.l.google.com:19302'
            }
        ]

    });
        this.peerConnection.onicecandidate = this.handleICECandidateEvent;
        this.peerConnection.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent;
        this.peerConnection.onsignalingstatechange = this.handleSignalingStateChangeEvent;
        this.peerConnection.ontrack = this.handleTrackEvent;
  }

  private closeVideoCall(): void {
    if (this.peerConnection){
        console.log('--> Closing the peer connection');
        this.peerConnection.onicecandidate = null;
        this.peerConnection.onicegatheringstatechange = null;
        this.peerConnection.onsignalingstatechange = null;
        this.peerConnection.ontrack = null;
    }
    this.peerConnection.getTransceivers().forEach(transceiver => {
        transceiver.stop();
    });
    this.peerConnection.close();
    this.peerConnection = null;
}

    private handleGetUserMediaError(e: Error): void {
        switch (e.name) {
            case 'NotFoundError':
                alert('Unable to open your call because no camera and/or microphone were found');
                break;
            case 'SecurityError':
            case 'PermissionDeniedError':
                // Do nothing; this is the same as the user canceling the call.
                break;
            default:
                console.error(e);
                alert('Error opening your camera and/or microphone: ' + e.message);
                break;
        }
        this.closeVideoCall();

    }
//event coming from the remote peer when it sends an ice candidate to the local peer to establish a connection
    private handleICECandidateEvent = (event: RTCPeerConnectionIceEvent) =>{
      console.log(event);
      if (event.candidate) {
            this.telehealthDataService.sendMessage({
                type: 'ice-candidate',
                data: event.candidate
            });
        }

    }

    private handleICEConnectionStateChangeEvent = (event: Event) =>{
        console.log(event);
        switch (this.peerConnection.iceConnectionState) {
            case 'closed':
            case 'failed':
            case 'disconnected':
                this.closeVideoCall();
                break;

        }

    }

    private handleSignalingStateChangeEvent = (event: Event) =>{
        console.log(event);
        switch (this.peerConnection.signalingState) {
            case 'closed':
                this.closeVideoCall();
                console.log('Signalling state is closed');
                break;
        }
    }


    private handleTrackEvent =(event: RTCTrackEvent) =>{
        console.log(event);
        console.log('Received remote track will be able to see remote video soon');
        this.remoteVideo.nativeElement.srcObject = event.streams[0];

    }

    //handle the incoming video call  from the remote peer
    private addIncommingMessageHandler():void   {
      this.telehealthDataService.connect();
        this.telehealthDataService.messages$.subscribe(
            msg => {
                // console.log('Received message: ' + msg.type);
                switch (msg.type) {
                    case 'offer':
                        this.handleOfferMessage(msg.data);
                        break;
                    case 'answer':
                        this.handleAnswerMessage(msg.data);
                        break;
                    case 'hangup':
                        this.handleHangupMessage(msg);
                        break;
                    case 'ice-candidate':
                        this.handleICECandidateMessage(msg.data);
                        break;
                    default:
                        console.log('unknown message of type ' + msg.type);
                }
            },
            error => console.log(error)
        );
    }


    handleAnswerMessage(data) : void {
        this.peerConnection.setRemoteDescription(data);
    }

    handleICECandidateMessage(data) {
        this.peerConnection.addIceCandidate(data).catch(this.reportError);
     }
    reportError(e: Error) {
        console.log("error"+e.name)
    }

    private handleOfferMessage(msg: RTCSessionDescriptionInit) {
      if(!this.peerConnection){
          this.createPeerConnection();
      }
      if (!this.localStream){
          this.startLocalVideo();
      }
      this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg))
          .then(() => {
              this.localVideo.nativeElement.srcObject = this.localStream;
              this.localStream.getTracks().forEach(track => {
                  this.peerConnection.addTrack(track, this.localStream);
              });
          }).then(() => {
                return this.peerConnection.createAnswer();
            }).then((answer)=> {
                return this.peerConnection.setLocalDescription(answer);
            }
        ).then(() => {
            this.telehealthDataService.sendMessage({type: 'answer', data: this.peerConnection.localDescription});
      }).catch(this.handleGetUserMediaError);

    }

    private handleHangupMessage(msg: VideoMessage): void{
        document.getElementById('user-2').style.display = 'none'
        document.getElementById('user-1').classList.remove('smallFrame')
        this.closeVideoCall();
    }
    hungup(): void {
        this.telehealthDataService.deleteVideoRoomByInviteCode(this.telehealthDataService.inviteCode);
        document.getElementById('user-2').style.display = 'none'
        document.getElementById('user-1').classList.remove('smallFrame')
        this.telehealthDataService.sendMessage({type: 'hangup', data: null});
        this.closeVideoCall();
    }
}
