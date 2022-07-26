import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenService } from '../../shared/services/token.service';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuid } from 'uuid';



@Component({
  selector: 'app-meeting-preview',
  templateUrl: './meeting-preview.component.html',
  styleUrls: ['./meeting-preview.component.css']
})
export class MeetingPreviewComponent implements OnInit, OnDestroy {
  showSettings = false;
  joinLoading = false;
  newLoading = false;
  connectionInfoForm?: FormGroup;
  subscriptions: Subscription[] = [];

  myArray: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tokeService: TokenService,
    private route: ActivatedRoute,
 
  ) { 
    // firebase.initializeApp(config);


  }
channelname='';

  ngOnInit(): void {
   
    firebase.database().ref('usernames/').on('value',(snapshot)=>{
      if(snapshot.val())
           this.u=snapshot.val();
          
          })
    this.connectionInfoForm = this.formBuilder.group({
      channel: '',
      link: '',
      Name: new FormControl(null,Validators.required)
    });
   
    const channelChangeSubs = this.connectionInfoForm.get('channel')?.valueChanges.subscribe(value => {
      if (value === '') {
        this.connectionInfoForm?.get('link')?.enable({ emitEvent: false });
      }
      else {
        this.connectionInfoForm?.get('link')?.disable({ emitEvent: false });
      }
    });

    this.subscriptions.push(channelChangeSubs as Subscription);

    const linkChangeSubs = this.connectionInfoForm.get('link')?.valueChanges.subscribe(value => {
      if (value === '') {
        this.connectionInfoForm?.get('channel')?.enable({ emitEvent: false });
      }
      else {
        this.connectionInfoForm?.get('channel')?.disable({ emitEvent: false });
      }
    });
    this.subscriptions.push(linkChangeSubs as Subscription);
    let l='';
     this.route.queryParamMap.subscribe((params: any) =>l=params.params.link );
     this.route.queryParamMap.subscribe((params: any) =>this.channelname=params.params.channel );

    if(l)
   { 
     this.connectionInfoForm.controls.link.setValue(l);
    this.connectionInfoForm.controls.channel.disable();}
  }

  ngOnDestroy(): void {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  onShowSettings(): void {
    this.showSettings = true;
  }

  onCloseSettings(): void {
    this.showSettings = false;
  }
joinLink='';
u=[];
  onJoinMeeting(): void {
    
    let userData={
      Name:this.connectionInfoForm.controls.Name.value,
      userType:'',
      id:uuid(),
      channel:''
    }
  
   if(this.connectionInfoForm.controls.link.value)
  { userData.userType="Others"
   userData.channel=this.channelname;}

   else
 {  userData.userType="Host";
   userData.channel=this.connectionInfoForm.controls.channel.value}

localStorage.setItem('userData',JSON.stringify(userData ));


// if(JSON.parse(localStorage.getItem('userNames')))
// {this.u=JSON.parse(localStorage.getItem('userNames'))
// this.u.push(this.connectionInfoForm.controls.Name.value);}
// else
// this.u.push(this.connectionInfoForm.controls.Name.value);

// localStorage.setItem('userNames',JSON.stringify(this.u ));
firebase.database().ref('users/'+userData.id).set(userData);

this.u.push(this.connectionInfoForm.controls.Name.value);  
firebase.database().ref('usernames/').set(this.u)


    let { channel, link } = this.connectionInfoForm?.value;
    
      if (channel) {
        this.joinLink = this.tokeService.getLink(channel);
       
        //let meetinglink = location.origin+"/#/meeting?link="+ this.joinLink;
        let meetinglink = location.origin+"/#/preview?link="+ this.joinLink+"&channel="+channel;
       link=this.joinLink;
        setTimeout(function(){
          alert(`Link copied, You can Invite other people using the link: ${meetinglink}`);
       }, 1000)
       navigator.clipboard.writeText(meetinglink).then().catch(e => console.error(e));
  
      }
      this.router.navigate(['/meeting'], { queryParams: { channel, link} });
   
  }
}
