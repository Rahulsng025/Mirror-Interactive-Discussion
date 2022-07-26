import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { IMediaTrack, IRemoteUser, NgxAgoraSdkNgService } from 'ngx-agora-sdk-ng';
import * as firebase from 'firebase';
import { MediaService } from '../../shared/services/media.service';
import { TokenService } from '../../shared/services/token.service';
import { faCog, fas } from '@fortawesome/free-solid-svg-icons';
import { FileUploadService } from 'src/app/component/meeting/shared/services/file-upload.service';
import Peer from 'peerjs'
import { HostListener } from '@angular/core';



export interface IMeetingUser {
  type: 'local' | 'remote';
  user?: IRemoteUser;
  mediaTrack?: IMediaTrack;
  name?:'';

}

interface Chats{
  name:string,
  message:string
}

@Component({
  selector: 'app-meeting-page',
  templateUrl: './meeting-page.component.html',
  styleUrls: ['./meeting-page.component.css'],
})
export class MeetingPageComponent implements OnInit, OnDestroy {
//   @HostListener('window:beforeunload', ['$event'])
// public beforeunloadHandler($event) {
//   firebase.database().ref('usernames/').remove();
//   firebase.database().ref('chats/').remove();
// }
  @ViewChild('localVideo', { static: true }) localVideo?: ElementRef;
  shortLink: string = "";
    loading: boolean = false; 
    file: File = null;
    
  link = '';
  channel = '';
  subscriptions: Subscription[] = [];
  userList: IMeetingUser[] = [];
  audioInId = '';
  videoInId = '';
  audioOutId = '';
  token = '';
  mediaTrack?: IMediaTrack;
  pinnedUser?: IMeetingUser | null;
  private lazyStream: any;
  currentPeer: any;
  private peer: Peer;
  ab=faCog;
  constructor(
    private fileUploadService: FileUploadService,
    private activatedRoute: ActivatedRoute,
    private agoraService: NgxAgoraSdkNgService,
    private mediaService: MediaService,
    private tokenService: TokenService,
    private router: Router
    
  ) { 
   
  }
 

 usernames=[]
 date=Date.now();
 chats: Chats[] = [];
currentuser;
uid;
  ngOnInit(): void {
    
    this.uid=JSON.parse(localStorage.getItem('userData')).id;
    
    firebase.database().ref('users/'+this.uid).on('value',(snapshot)=>{
      if(snapshot.val())
          this.currentuser=snapshot.val();
           })

    firebase.database().ref('usernames/').on('value',(snapshot)=>{
      if(snapshot.val())
           this.usernames=snapshot.val()
          
          })
          

    firebase.database().ref('chats/').on('value',(snapshot)=>{
      if(snapshot.val())
           this.chat=snapshot.val()
          
          })
   
     
    forkJoin([
      this.activatedRoute.queryParams.pipe(take(1)),
      this.mediaService.selectedAudioInputId.pipe(take(1)),
      this.mediaService.selectedAudioOutputId.pipe(take(1)),
      this.mediaService.selectedVideoInputId.pipe(take(1)),
    ])
      .pipe(
        take(1),
      ).subscribe(([params, aInId, aOutId, vInId]) => {
        this.link = params.link;
        this.channel = params.channel;
        
        if (this.link) {
          const result = this.tokenService.getChannel(this.link);
          if (result.error) {
            alert(result.error);
            this.router.navigate(['welcome']);
            return;
          }
          this.channel = result.channel as string;
        }
 
        this.tokenService.getToken(this.channel);
        this.audioInId = aInId;
        this.videoInId = vInId;
        this.audioOutId = aOutId;
      });

    const tokenSub = this.tokenService.token.pipe(take(1)).subscribe(token => {
      this.token = token;
      this.joinVideo();
    });
    
    this.subscriptions.push(tokenSub);

    const remoteUserLeaveSubs = this.agoraService.onRemoteUserLeft().subscribe(leftuser => {
      this.userList = this.userList.filter(user => user.user?.uid !== leftuser.user.uid);
    
  
      if (this.pinnedUser && this.pinnedUser.user?.uid && this.pinnedUser.user.uid === leftuser.user.uid) {
        this.pinnedUser = null;
      }
    });
    this.subscriptions.push(remoteUserLeaveSubs);
    
    const remoteUserChangeSubs = this.agoraService.onRemoteUsersStatusChange().subscribe(status => {
      const currentUserIndex = this.userList.findIndex(user => user.user?.uid === status.user.uid);
       
      if (currentUserIndex >= 0) {
      

        this.userList[currentUserIndex] = { type: 'remote', user: status.user,name:this.usernames[currentUserIndex]};
        console.log('dssds',currentUserIndex)
        if (this.pinnedUser && this.pinnedUser.user?.uid && this.pinnedUser.user.uid === status.user.uid) {
          this.pinnedUser = { type: 'remote', user: status.user};
        }
      }
 
      switch (status.connectionState) {
        
        case 'CONNECTED':
          if (!this.userList.find(user => user.user?.uid === status.user.uid)) {
          let  i=1;
            this.userList.push({ type: 'remote', user: status.user });
             
 
              
          }
          break;
        case 'DISCONNECTED':
        case 'DISCONNECTING':
        case 'RECONNECTING':
          

      }
    });
    this.subscriptions.push(remoteUserChangeSubs);

    const localUserJoinedSubs = this.agoraService.onLocalUserJoined().subscribe(track => {
      this.userList.push({ type: 'local', mediaTrack: track.track,name:this.usernames[0] });
    });
    this.subscriptions.push(localUserJoinedSubs);
    

  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
    
  }

  async joinVideo(): Promise<void> {
    this.mediaTrack = await this.agoraService.join(this.channel, this.token)
      .WithCameraAndMicrophone(this.audioInId, this.videoInId)
      .Apply();
  }

  onLocalMic(value: boolean): void {
    !value ? this.mediaTrack?.microphoneUnMute() : this.mediaTrack?.microphoneMute();
  }

  onLocalCamera(value: boolean): void {
    !value ? this.mediaTrack?.cameraOn() : this.mediaTrack?.cameraOff();
  }

  onLocalPinned(value: boolean): void {
    const localuser = this.userList.find(user => user.type === 'local');
    if (localuser) {
      this.onPin(localuser);
    }
  }

  onLocalLeave(): void {
    this.agoraService.leave();
    this.mediaTrack?.stop();
    this.router.navigate(['welcome']);
  }
  show=false;
  col12="col-12";
col9="col-9";

  onChat(){
    this.show=!this.show;
  }
  closebtn(){
    this.show=false;
  }



  onPin(user: IMeetingUser): void {
    if (user.type === 'local') {
      if (this.pinnedUser && this.pinnedUser?.type === 'local') {
        this.pinnedUser = null;
        return;
      }
      this.pinnedUser = user;
      return;
    }
    if (this.pinnedUser?.type === 'local') {
      this.pinnedUser = user;
      return;
    }
    if (this.pinnedUser?.user?.uid === user.user?.uid) {
      this.pinnedUser = null;
    } else {
      this.pinnedUser = user;
    }
  }

  getUnpinnedUsers(): IMeetingUser[] {
    if (this.pinnedUser?.type === 'local') {
      return this.userList.filter(user => user.type !== 'local');
    }
    return this.userList.filter(user => user.user?.uid !== this.pinnedUser?.user?.uid);
  }
  
  chat=[];


  send(chat){
if(chat=='')
{
  this.loading = !this.loading;
  console.log(this.file);
  this.fileUploadService.upload(this.file).subscribe(
      (event: any) => {
          if (typeof (event) === 'object') {

              // Short link via api response
              this.shortLink = event.link;

              this.loading = false; // Flag variable 
          }
      }
  );
}
else
   {  let name=this.currentuser.Name;
    let msg=chat;
    var chats:Chats={
    name:name,
    message:msg
    }
    
    this.chats.push(chats);
 
       
     
   firebase.database().ref('chats/').set(this.chats)

   

  }

  }


  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
        (event: any) => {
            if (typeof (event) === 'object') {

                // Short link via api response
                this.shortLink = event.link;

                this.loading = false; // Flag variable 
            }
        }
    );
}

onChange(event) {
  this.file = event.target.files[0];
}

screenShare(): void {
  this.shareScreen();
}

private shareScreen(): void {
  // @ts-ignore
  navigator.mediaDevices.getDisplayMedia({
    video: {
      
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: true
    }
  }).then(stream => {
    const videoTrack = stream.getVideoTracks()[0];
    videoTrack.onended = () => {
      this.stopScreenShare();
    };

    const sender = this.currentPeer.getSenders().find(s => s.track.kind === videoTrack.kind);
    sender.replaceTrack(videoTrack);
  }).catch(err => {
    console.log('Unable to get display media ' + err);
  });
}

private stopScreenShare(): void {
  const videoTrack = this.lazyStream.getVideoTracks()[0];
  const sender = this.currentPeer.getSenders().find(s => s.track.kind === videoTrack.kind);
  sender.replaceTrack(videoTrack);
}

}

