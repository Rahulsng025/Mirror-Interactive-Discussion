import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { faPhoneAlt, faVideo, faVideoSlash, faMicrophoneAlt, faMicrophoneAltSlash, faThumbtack, faScrewdriverWrench, faStarAndCrescent, faMobileScreen, faArrowAltCircleUp, faShareFromSquare, faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-meeting-controls',
  templateUrl: './meeting-controls.component.html',
  styleUrls: ['./meeting-controls.component.css']
})
export class MeetingControlsComponent implements OnInit {
  hangUpIcon = faPhoneAlt;
  micIcon = faMicrophoneAlt;
  micOffIcon = faMicrophoneAltSlash;
  camIcon = faVideo;
  camOffIcon = faVideoSlash;
  pinIcon = faThumbtack;
  pinOffIcon="";
  screenIcon = faShareFromSquare;
  chatOffIcon="";
  chatIcon=faComment;
  @Output() micMuted = new EventEmitter<boolean>();
  @Output() cameraMuted = new EventEmitter<boolean>();
  @Output() hangedUp = new EventEmitter();
  @Output() pinned = new EventEmitter<boolean>();
  @Output() screenShare = new EventEmitter<boolean>();
  @Output() chat = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  onMicMute(value: boolean) {
    this.micMuted.emit(value);
  }

  onCameraMute(value: boolean) {
    this.cameraMuted.emit(value);
  }

  onHangUp() {
    this.hangedUp.emit();
  }

  onPin() {
    this.pinned.emit();
  }

  onScreenShare(value: boolean){
    this.screenShare.emit(value);
  }
  onChat() {
    this.chat.emit();
  }

}
