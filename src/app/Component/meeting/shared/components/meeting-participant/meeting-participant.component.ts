import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { IMediaTrack, IRemoteAudioTrack, IRemoteVideoTrack } from 'ngx-agora-sdk-ng';
import * as firebase from 'firebase';
import { IMeetingUser } from '../../../pages/meeting-page/meeting-page.component';
import { IAgoraVideoPlayerTrackOption } from '../../directives/agora-video-player.directive';

@Component({
  selector: 'app-meeting-participant',
  templateUrl: './meeting-participant.component.html',
  styleUrls: ['./meeting-participant.component.css']
})
export class MeetingParticipantComponent implements OnInit {
  
//  @Input() name; 
  @Output() pinned = new EventEmitter<IMeetingUser>();
  micMuteIcon = faMicrophoneSlash;
  myUser: any;
  trackoptions?: IAgoraVideoPlayerTrackOption;
  audioStream?: MediaStream;
  controlsVisible = false;
  micStatus = false;
  camStatus = false;

  @Input() set user(value: IMeetingUser) {
    this.myUser = value;
    if (value.type === 'remote') {
      this.trackoptions = {
        videoTrack: value.user?.videoTrack,
        audioTrack: value.user?.audioTrack
      };
      this.micStatus = !!value.user?.hasAudio;
      this.camStatus = !!value.user?.hasVideo;
      if (value.user && value.user.audioTrack && value.user.hasAudio) {
        this.audioStream = value.user?.audioTrack?.getMediaStream();
        
      }
     
    }
    else {
      this.trackoptions = {
        mediaTrack: value.mediaTrack
        
      };
      this.micStatus = false;
      this.camStatus = false;
      
    }
  }

  constructor() { }
// userdata;
// userid;
// username=[];

  ngOnInit(): void {
//   this.userdata= JSON.parse(localStorage.getItem('userData'));
//  this.userid=this.userdata.id;
//   firebase.database().ref('users/'+this.userid)
//     .on('value',(snapshot)=>{
//     let userN=snapshot.val();
//     this.username.push(userN.Name);
//     firebase.database().ref('u/').set(this.username);
//     })
//     firebase.database().ref('u/').on('value',(snapshot)=>{
//      this.username=snapshot.val()
//      console.log("dds",this.username)
//     })
  }


  showControls(value: boolean): void {
      this.controlsVisible = value;
  }

  isRemote(): boolean {
    return this.myUser?.type === 'remote';
  }

  onCamOff(): void {
    if (!this.trackoptions?.mediaTrack) {
      return;
    }
    this.camStatus = !this.camStatus;
    this.camStatus ? this.trackoptions.mediaTrack?.cameraOn() : this.trackoptions.mediaTrack?.cameraOff();
  }

  onMicMute(): void {
    if (!this.trackoptions?.mediaTrack) {
      return;
    }
    this.micStatus = !this.micStatus;
    this.micStatus ? this.trackoptions.mediaTrack?.microphoneUnMute() : this.trackoptions.mediaTrack?.microphoneMute();
  }

  onPin(): void {
    this.pinned.emit(this.myUser);
  }

}
